import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { CreateTeacherDTO, TeacherResponse, UpdateTeacherDTO } from '@/api/v1/(routes)/teachers/types/teacher';
import prisma from '@/lib/prisma';

export class TeacherService {
  static async createTeacher(data: CreateTeacherDTO): Promise<TeacherResponse> {
    const { subjects, classes, password, ...teacherData } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await prisma.user.create({
      data: {
        ...teacherData,
        hashedPassword,
        role: 'teacher',
        teacherDetails: {
          create: {
            subjects: {
              connect: subjects.map((id) => ({ id })),
            },
            ...(classes && {
              classes: {
                connect: classes.map((id) => ({ id })),
              },
            }),
          },
        },
      },
      include: {
        teacherDetails: {
          include: {
            subjects: true,
            classes: true,
          },
        },
      },
    });

    return this.sanitizeTeacher(teacher);
  }

  static async updateTeacher(id: string, data: Partial<UpdateTeacherDTO>): Promise<TeacherResponse> {
    const teacher = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        teacherDetails: {
          include: {
            subjects: true,
            classes: true,
          },
        },
      },
    });

    return this.sanitizeTeacher(teacher);
  }

  static async listTeachers(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{ teachers: TeacherResponse[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.UserWhereInput = {
      role: 'teacher',
      ...(search && {
        OR: [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }],
      }),
    };

    const [teachers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          teacherDetails: {
            include: {
              subjects: true,
              classes: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      teachers: teachers.map(this.sanitizeTeacher),
      total,
    };
  }

  static async getTeacherById(id: string): Promise<TeacherResponse | null> {
    const teacher = await prisma.user.findFirst({
      where: {
        id,
        role: 'teacher',
      },
      include: {
        teacherDetails: {
          include: {
            subjects: true,
            classes: true,
          },
        },
      },
    });

    return teacher ? this.sanitizeTeacher(teacher) : null;
  }

  static async deleteTeacher(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  private static sanitizeTeacher(teacher: any): TeacherResponse {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword: _, ...sanitizedTeacher } = teacher;
    return sanitizedTeacher;
  }
}
