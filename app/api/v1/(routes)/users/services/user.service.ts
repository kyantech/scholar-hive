import { Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';

export class UserService {
  static async listUsers(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{ users: any[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.UserWhereInput = {
      ...(search && {
        OR: [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }],
      }),
    };

    const [users, total] = await Promise.all([
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
          studentDetails: {
            include: {
              class: true,
            },
          },
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
      users: users.map(this.sanitizeUser),
      total,
    };
  }

  static async getUserById(id: string): Promise<any | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        teacherDetails: {
          include: {
            subjects: true,
            classes: true,
          },
        },
        studentDetails: {
          include: {
            class: true,
          },
        },
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

    return user ? this.sanitizeUser(user) : null;
  }

  private static sanitizeUser(user: any): any {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword: _, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}
