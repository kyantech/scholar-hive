import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest } from 'next/server';

import { ExamService } from '@/api/v1/(routes)/exams/services/exam.service';
import { errorResponse, notFoundResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const exam = await ExamService.getExamById(id);

    if (!exam) {
      return notFoundResponse('Exam not found');
    }

    return successResponse({ exam });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const PATCH = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const data = await req.json();
    const exam = await ExamService.updateExam(id, data);

    return successResponse({ exam });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const DELETE = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    await ExamService.deleteExam(id);

    return successResponse({ message: 'Exam deleted successfully' });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
