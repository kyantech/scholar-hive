import { NextRequest } from 'next/server';

import { ExamService } from '@/api/v1/(routes)/exams/services/exam.service';
import { CreateExamDTO } from '@/api/v1/(routes)/exams/types/exam';
import { getParams } from '@/api/v1/lib/params';
import { createdResponse, errorResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';
import { examSchema } from './schemas/exam';

export const GET = auth(async (req: NextRequest) => {
  try {
    const { page, limit } = getParams(req);
    const { exams, total } = await ExamService.listExams(page, limit);

    return successResponse({ exams, total });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = examSchema.parse(data);
    const exam = await ExamService.createExam(validatedData as unknown as CreateExamDTO);

    return createdResponse({ exam });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
