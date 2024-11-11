import { NextRequest, NextResponse } from 'next/server';

import { ExamService } from '@/api/exams/services/exam.service';
import { CreateExamDTO } from '@/api/exams/types/exam';
import { auth } from '@/auth';
import { examSchema } from './schemas/exam';

export const GET = auth(async (req: NextRequest) => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const { exams, total } = await ExamService.listExams(page, limit);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { exams, total },
      error: null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        success: false,
        error: { message: error.message },
      },
      { status: 500 }
    );
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = examSchema.parse(data);
    const exam = await ExamService.createExam(validatedData as unknown as CreateExamDTO);

    return NextResponse.json(
      {
        status: 201,
        success: true,
        data: { exam },
        error: null,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 400,
        success: false,
        error: { message: error.message },
      },
      { status: 400 }
    );
  }
});
