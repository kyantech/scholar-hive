import { Prisma, Result as PrismaResult } from '@prisma/client';

import { CreateResultDTO, ResultResponse, UpdateResultDTO } from '@/api/results/types/result';
import prisma from '@/lib/prisma';

const RESULT_INCLUDE = {
  exam: {
    include: {
      subject: {
        select: {
          id: true,
          name: true,
        },
      },
      class: {
        select: {
          id: true,
          name: true,
        },
      },
      teacher: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  },
  student: {
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
} as const;

type ResultWithRelations = PrismaResult & {
  exam: {
    id: string;
    date: Date;
    subject: { id: string; name: string };
    class: { id: string; name: string };
    teacher: {
      user: {
        id: string;
        name: string;
      };
    };
  };
  student: {
    id: string;
    user: {
      id: string;
      name: string;
    };
  };
};

export class ResultService {
  static async createResult(data: CreateResultDTO): Promise<ResultResponse> {
    const exam = await prisma.exam.findUnique({
      where: { id: data.examId },
      include: {
        subject: true,
        teacher: true,
      },
    });

    if (!exam) {
      throw new Error('Exam not found');
    }

    const result = await prisma.result.create({
      data: {
        score: data.score,
        type: data.type,
        date: exam.date,
        examId: data.examId,
        studentId: data.studentId,
        teacherId: exam.teacherId,
        subjectId: exam.subjectId,
      },
      include: RESULT_INCLUDE,
    });

    return this.formatResultResponse(result as unknown as ResultWithRelations);
  }

  static async updateResult(id: string, data: Partial<UpdateResultDTO>): Promise<ResultResponse> {
    let updateData: Prisma.ResultUpdateInput = {
      ...data,
      updatedAt: new Date(),
    };

    if (data.examId) {
      const exam = await prisma.exam.findUnique({
        where: { id: data.examId },
        include: {
          subject: true,
          teacher: true,
        },
      });

      if (!exam) {
        throw new Error('Exam not found');
      }

      updateData = {
        ...updateData,
        date: exam.date,
        teacher: { connect: { id: exam.teacherId } },
        subject: { connect: { id: exam.subjectId } },
      };
    }

    const result = await prisma.result.update({
      where: { id },
      data: updateData,
      include: RESULT_INCLUDE,
    });

    return this.formatResultResponse(result as unknown as ResultWithRelations);
  }

  static async listResults(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{ results: ResultResponse[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.ResultWhereInput = {
      ...(search && {
        OR: [{ exam: { subject: { name: { contains: search, mode: 'insensitive' } } } }],
      }),
    };

    const [results, total] = await Promise.all([
      prisma.result.findMany({
        where,
        skip,
        take: limit,
        include: RESULT_INCLUDE,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.result.count({ where }),
    ]);

    return {
      results: (results as unknown as ResultWithRelations[]).map(this.formatResultResponse),
      total,
    };
  }

  static async getResultById(id: string): Promise<ResultResponse | null> {
    const result = await prisma.result.findUnique({
      where: { id },
      include: RESULT_INCLUDE,
    });

    return result ? this.formatResultResponse(result as unknown as ResultWithRelations) : null;
  }

  static async deleteResult(id: string): Promise<void> {
    await prisma.result.delete({
      where: { id },
    });
  }

  private static formatResultResponse(result: ResultWithRelations): ResultResponse {
    return {
      id: result.id,
      type: result.type,
      score: result.score,
      exam: {
        id: result.exam.id,
        date: result.exam.date,
        subject: result.exam.subject,
        class: result.exam.class,
        teacher: {
          id: result.exam.teacher.user.id,
          name: result.exam.teacher.user.name,
        },
        student: {
          id: result.student.id,
          name: result.student.user.name,
        },
      },
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }
}
