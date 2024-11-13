import { Assignment as PrismaAssignment } from '@prisma/client';

import {
  AssignmentResponse,
  CreateAssignmentDTO,
  UpdateAssignmentDTO,
} from '@/api/v1/(routes)/assignments/types/assignment';
import prisma from '@/lib/prisma';

const ASSIGNMENT_INCLUDE = {
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

type AssignmentWithRelations = PrismaAssignment & {
  subject: { id: string; name: string };
  class: { id: string; name: string };
  teacher: { user: { id: string; name: string } };
};

export class AssignmentService {
  static async createAssignment(data: CreateAssignmentDTO): Promise<AssignmentResponse> {
    // First, get the teacher details ID
    const teacher = await prisma.user.findUnique({
      where: { id: data.teacherId },
      include: { teacherDetails: true },
    });

    if (!teacher || !teacher.teacherDetails) {
      throw new Error('Teacher not found');
    }

    const assignment = await prisma.assignment.create({
      data: {
        dueDate: data.dueDate,
        subject: { connect: { id: data.subjectId } },
        class: { connect: { id: data.classId } },
        teacher: { connect: { id: teacher.teacherDetails.id } },
      },
      include: ASSIGNMENT_INCLUDE,
    });

    return this.formatAssignmentResponse(assignment as AssignmentWithRelations);
  }

  static async updateAssignment(id: string, data: Partial<UpdateAssignmentDTO>): Promise<AssignmentResponse> {
    const updateData: any = {
      ...data,
      updatedAt: new Date(),
    };

    if (data.teacherId) {
      const teacher = await prisma.user.findUnique({
        where: { id: data.teacherId },
        include: { teacherDetails: true },
      });

      if (!teacher || !teacher.teacherDetails) {
        throw new Error('Teacher not found');
      }

      updateData.teacher = { connect: { id: teacher.teacherDetails.id } };
      delete updateData.teacherId;
    }

    const assignment = await prisma.assignment.update({
      where: { id },
      data: updateData,
      include: ASSIGNMENT_INCLUDE,
    });

    return this.formatAssignmentResponse(assignment as AssignmentWithRelations);
  }

  static async listAssignments(
    page: number = 1,
    limit: number = 10
  ): Promise<{ assignments: AssignmentResponse[]; total: number }> {
    const skip = (page - 1) * limit;

    const [assignments, total] = await Promise.all([
      prisma.assignment.findMany({
        skip,
        take: limit,
        include: ASSIGNMENT_INCLUDE,
        orderBy: { dueDate: 'desc' },
      }),
      prisma.assignment.count(),
    ]);

    return {
      assignments: (assignments as AssignmentWithRelations[]).map(this.formatAssignmentResponse),
      total,
    };
  }

  static async getAssignmentById(id: string): Promise<AssignmentResponse | null> {
    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: ASSIGNMENT_INCLUDE,
    });

    return assignment ? this.formatAssignmentResponse(assignment as AssignmentWithRelations) : null;
  }

  static async deleteAssignment(id: string): Promise<void> {
    await prisma.assignment.delete({
      where: { id },
    });
  }

  private static formatAssignmentResponse(assignment: AssignmentWithRelations): AssignmentResponse {
    return {
      id: assignment.id,
      dueDate: assignment.dueDate,
      subject: assignment.subject,
      class: assignment.class,
      teacher: {
        id: assignment.teacher.user.id,
        name: assignment.teacher.user.name,
      },
      createdAt: assignment.createdAt,
      updatedAt: assignment.updatedAt,
    };
  }
}
