import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { CreateStudentDTO, StudentResponse, UpdateStudentDTO } from '@/api/v1/(routes)/students/types/student';
import prisma from '@/lib/prisma';

export class StudentService {
  static async createStudent(data: CreateStudentDTO): Promise<StudentResponse> {
    const { grade, classId, password, ...studentData } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.user.create({
      data: {
        ...studentData,
        hashedPassword,
        role: 'student',
        studentDetails: {
          create: {
            grade,
            class: {
              connect: {
                id: classId,
              },
            },
          },
        },
      },
      include: {
        studentDetails: {
          include: {
            class: true,
          },
        },
      },
    });

    return this.sanitizeStudent(student);
  }

  static async updateStudent(id: string, data: Partial<UpdateStudentDTO>): Promise<StudentResponse> {
    const { grade, classId, ...userData } = data;

    const student = await prisma.user.update({
      where: { id },
      data: {
        ...userData,
        updatedAt: new Date(),
        ...((grade || classId) && {
          studentDetails: {
            update: {
              ...(grade && { grade }),
              ...(classId && { classId }),
            },
          },
        }),
      },
      include: {
        studentDetails: {
          include: {
            class: true,
          },
        },
      },
    });

    return this.sanitizeStudent(student);
  }

  static async listStudents(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{ students: StudentResponse[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.UserWhereInput = {
      role: 'student',
      ...(search && {
        OR: [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }],
      }),
    };

    const [students, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          studentDetails: {
            include: {
              class: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      students: students.map(this.sanitizeStudent),
      total,
    };
  }

  static async getStudentById(id: string): Promise<StudentResponse | null> {
    const student = await prisma.user.findFirst({
      where: {
        id,
        role: 'student',
      },
      include: {
        studentDetails: {
          include: {
            class: true,
          },
        },
      },
    });

    return student ? this.sanitizeStudent(student) : null;
  }

  static async deleteStudent(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  private static sanitizeStudent(student: any): StudentResponse {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword: _, ...sanitizedStudent } = student;
    return sanitizedStudent;
  }
}
