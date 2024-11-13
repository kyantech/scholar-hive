import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { CreateParentDTO, ParentResponse, UpdateParentDTO } from '@/api/v1/(routes)/parents/types/parent';
import prisma from '@/lib/prisma';

export class ParentService {
  static async createParent(data: CreateParentDTO): Promise<ParentResponse> {
    const { studentIds, password, ...parentData } = data;

    // Verify if all students exist
    const students = await prisma.user.findMany({
      where: {
        id: { in: studentIds },
        role: 'student',
      },
    });

    if (students.length !== studentIds.length) {
      throw new Error('One or more students not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const parent = await prisma.user.create({
      data: {
        ...parentData,
        hashedPassword,
        role: 'parent',
        parentDetails: {
          create: {},
        },
      },
      include: {
        parentDetails: true,
      },
    });

    // Connect students after parent creation
    const updatedParent = await prisma.user.update({
      where: { id: parent.id },
      data: {
        parentDetails: {
          update: {
            students: {
              connect: studentIds.map((id) => ({ userId: id })),
            },
          },
        },
      },
      include: {
        parentDetails: {
          include: {
            students: {
              select: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    studentDetails: {
                      include: {
                        class: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return this.sanitizeParent(updatedParent);
  }

  static async listParents(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{ parents: ParentResponse[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.UserWhereInput = {
      role: 'parent',
      ...(search && {
        OR: [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }],
      }),
    };

    const [parents, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          parentDetails: {
            include: {
              students: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      studentDetails: {
                        include: {
                          class: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      parents: parents.map(this.sanitizeParent),
      total,
    };
  }

  static async getParentById(id: string): Promise<ParentResponse | null> {
    const parent = await prisma.user.findFirst({
      where: {
        id,
        role: 'parent',
      },
      include: {
        parentDetails: {
          include: {
            students: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    studentDetails: {
                      include: {
                        class: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return parent ? this.sanitizeParent(parent) : null;
  }

  static async updateParent(id: string, data: Partial<UpdateParentDTO>): Promise<ParentResponse> {
    const { studentIds, ...updateData } = data;

    const parent = await prisma.user.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
        ...(studentIds && {
          parentDetails: {
            update: {
              students: {
                set: [], // First, remove all existing connections
                connect: studentIds.map((id) => ({ userId: id })), // Then connect new ones
              },
            },
          },
        }),
      },
      include: {
        parentDetails: {
          include: {
            students: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    studentDetails: {
                      include: {
                        class: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return this.sanitizeParent(parent);
  }

  static async deleteParent(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  private static sanitizeParent(parent: any): ParentResponse {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword: _, ...sanitizedParent } = parent;
    return sanitizedParent;
  }
}
