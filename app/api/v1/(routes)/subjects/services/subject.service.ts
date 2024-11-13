import { Prisma, Subject as PrismaSubject, User } from '@prisma/client';

import { CreateSubjectDTO, SubjectResponse, UpdateSubjectDTO } from '@/api/v1/(routes)/subjects/types/subject';
import prisma from '@/lib/prisma';

const SUBJECT_INCLUDE = {
  teachers: {
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          photo: true,
          phone: true,
          address: true,
          role: true,
          bloodType: true,
          birthday: true,
          sex: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      subjects: {
        select: {
          id: true,
          name: true,
        },
      },
      classes: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
} as const;

type SubjectWithTeachers = PrismaSubject & {
  teachers: {
    user: Omit<User, 'hashedPassword'>;
    subjects: { id: string; name: string }[];
    classes: { id: string; name: string }[];
  }[];
};

type TeacherWithDetails = User & {
  teacherDetails: {
    id: string;
    userId: string;
    subjects: { id: string; name: string }[];
    classes: { id: string; name: string }[];
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

export class SubjectService {
  static async createSubject(data: CreateSubjectDTO): Promise<SubjectResponse> {
    const { teacherIds, ...subjectData } = data;

    if (teacherIds?.length) {
      const teachers = (await prisma.user.findMany({
        where: {
          id: { in: teacherIds },
          role: 'teacher',
          teacherDetails: {
            isNot: null,
          },
        },
        include: {
          teacherDetails: {
            include: {
              subjects: {
                select: {
                  id: true,
                  name: true,
                },
              },
              classes: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      })) as TeacherWithDetails[];

      if (teachers.length !== teacherIds.length) {
        throw new Error('One or more teachers not found');
      }

      const teacherDetailsIds = teachers.map((t) => t.teacherDetails?.id).filter(Boolean) as string[];

      const subject = await prisma.subject.create({
        data: {
          ...subjectData,
          teachers: {
            connect: teacherDetailsIds.map((id) => ({ id })),
          },
        },
        include: SUBJECT_INCLUDE,
      });

      return this.formatSubjectResponse(subject as SubjectWithTeachers);
    }

    const subject = await prisma.subject.create({
      data: subjectData,
      include: SUBJECT_INCLUDE,
    });

    return this.formatSubjectResponse(subject as SubjectWithTeachers);
  }

  static async updateSubject(id: string, data: Partial<UpdateSubjectDTO>): Promise<SubjectResponse> {
    const { teacherIds, ...updateData } = data;

    const subject = await prisma.subject.update({
      where: { id },
      data: {
        ...updateData,
        ...(teacherIds && {
          teachers: {
            set: [],
            connect: teacherIds.map((id) => ({ id })),
          },
        }),
      },
      include: SUBJECT_INCLUDE,
    });

    return this.formatSubjectResponse(subject as SubjectWithTeachers);
  }

  static async listSubjects(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{ subjects: SubjectResponse[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.SubjectWhereInput = {
      ...(search && {
        OR: [{ name: { contains: search, mode: 'insensitive' } }],
      }),
    };

    const [subjects, total] = await Promise.all([
      prisma.subject.findMany({
        where,
        skip,
        take: limit,
        include: SUBJECT_INCLUDE,
        orderBy: { name: 'asc' },
      }),
      prisma.subject.count({ where }),
    ]);

    return {
      subjects: (subjects as SubjectWithTeachers[]).map(this.formatSubjectResponse),
      total,
    };
  }

  static async getSubjectById(id: string): Promise<SubjectResponse | null> {
    const subject = await prisma.subject.findUnique({
      where: { id },
      include: SUBJECT_INCLUDE,
    });

    return subject ? this.formatSubjectResponse(subject as SubjectWithTeachers) : null;
  }

  static async deleteSubject(id: string): Promise<void> {
    await prisma.subject.delete({
      where: { id },
    });
  }

  private static formatSubjectResponse(subject: SubjectWithTeachers): SubjectResponse {
    return {
      id: subject.id,
      name: subject.name,
      teachers: subject.teachers.map((teacher) => ({
        id: teacher.user.id,
        name: teacher.user.name,
        email: teacher.user.email,
        teacherDetails: {
          subjects: teacher.subjects,
          classes: teacher.classes,
        },
      })),
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt,
    };
  }
}
