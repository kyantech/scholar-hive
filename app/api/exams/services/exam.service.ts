import { Exam as PrismaExam } from '@prisma/client';

import { CreateExamDTO, ExamResponse, UpdateExamDTO } from '@/api/exams/types/exam';
import prisma from '@/lib/prisma';

const EXAM_INCLUDE = {
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
} as const;

type ExamWithRelations = PrismaExam & {
  subject: { id: string; name: string };
  class: { id: string; name: string };
  teacher: { user: { id: string; name: string } };
};

export class ExamService {
  static async createExam(data: CreateExamDTO): Promise<ExamResponse> {
    const exam = await prisma.exam.create({
      data,
      include: EXAM_INCLUDE,
    });

    return this.formatExamResponse(exam as ExamWithRelations);
  }

  static async updateExam(id: string, data: Partial<UpdateExamDTO>): Promise<ExamResponse> {
    const exam = await prisma.exam.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: EXAM_INCLUDE,
    });

    return this.formatExamResponse(exam as ExamWithRelations);
  }

  static async listExams(page: number = 1, limit: number = 10): Promise<{ exams: ExamResponse[]; total: number }> {
    const skip = (page - 1) * limit;

    const [exams, total] = await Promise.all([
      prisma.exam.findMany({
        skip,
        take: limit,
        include: EXAM_INCLUDE,
        orderBy: { date: 'desc' },
      }),
      prisma.exam.count(),
    ]);

    return {
      exams: (exams as ExamWithRelations[]).map(this.formatExamResponse),
      total,
    };
  }

  static async getExamById(id: string): Promise<ExamResponse | null> {
    const exam = await prisma.exam.findUnique({
      where: { id },
      include: EXAM_INCLUDE,
    });

    return exam ? this.formatExamResponse(exam as ExamWithRelations) : null;
  }

  static async deleteExam(id: string): Promise<void> {
    await prisma.exam.delete({
      where: { id },
    });
  }

  private static formatExamResponse(exam: ExamWithRelations): ExamResponse {
    return {
      id: exam.id,
      date: exam.date,
      subject: exam.subject,
      class: exam.class,
      teacher: {
        id: exam.teacher.user.id,
        name: exam.teacher.user.name,
      },
      createdAt: exam.createdAt,
      updatedAt: exam.updatedAt,
    };
  }
}
