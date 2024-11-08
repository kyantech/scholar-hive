import { Prisma, Student, Teacher } from '@prisma/client';

import { ClassResponse, CreateClassDTO, UpdateClassDTO } from '@/api/classes/types/class';
import prisma from '@/lib/prisma';

export class ClassService {
  static async createClass(data: CreateClassDTO): Promise<ClassResponse> {
    const { teacherIds, ...classData } = data;

    const classCreated = await prisma.class.create({
      data: {
        ...classData,
        teachers: {
          connect: teacherIds?.map((id) => ({ id })) || [],
        },
      },
      include: {
        supervisor: true,
        teachers: true,
        students: true,
      },
    });

    return classCreated;
  }

  static async updateClass(id: string, data: Partial<UpdateClassDTO>): Promise<ClassResponse> {
    const { teacherIds, ...updateData } = data;

    const updatedClass = await prisma.class.update({
      where: { id },
      data: {
        ...updateData,
        ...(teacherIds && {
          teachers: {
            set: [], // First, remove all existing connections
            connect: teacherIds.map((id) => ({ id })), // Then connect new ones
          },
        }),
      },
      include: {
        supervisor: true,
        teachers: true,
        students: true,
      },
    });

    return updatedClass;
  }

  static async listClasses(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{ classes: ClassResponse[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.ClassWhereInput = {
      ...(search && {
        OR: [{ name: { contains: search, mode: 'insensitive' } }],
      }),
    };

    const [classes, total] = await Promise.all([
      prisma.class.findMany({
        where,
        skip,
        take: limit,
        include: {
          supervisor: true,
          teachers: true,
          students: true,
        },
        orderBy: { name: 'asc' },
      }),
      prisma.class.count({ where }),
    ]);

    return {
      classes,
      total,
    };
  }

  static async getClassById(id: string): Promise<ClassResponse | null> {
    const classFound = await prisma.class.findUnique({
      where: { id },
      include: {
        supervisor: true,
        teachers: true,
        students: true,
      },
    });

    return classFound;
  }

  static async deleteClass(id: string): Promise<void> {
    await prisma.class.delete({
      where: { id },
    });
  }

  static async getClassStudents(id: string): Promise<Student[]> {
    const classFound = await prisma.class.findUnique({
      where: { id },
      include: {
        students: true,
      },
    });

    return classFound?.students || [];
  }

  static async getClassTeachers(id: string): Promise<Teacher[]> {
    const classFound = await prisma.class.findUnique({
      where: { id },
      include: {
        teachers: true,
      },
    });

    return classFound?.teachers || [];
  }
}
