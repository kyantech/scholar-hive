import { NextRequest, NextResponse } from 'next/server';

import { SubjectService } from '@/api/subjects/services/subject.service';
import { CreateSubjectDTO } from '@/api/subjects/types/subject';
import { auth } from '@/auth';
import { subjectSchema } from './schemas/subject';

export const GET = auth(async (req: NextRequest) => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;

    const { subjects, total } = await SubjectService.listSubjects(page, limit, search);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { subjects, total },
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
    const validatedData = subjectSchema.parse(data);
    const subject = await SubjectService.createSubject(validatedData as unknown as CreateSubjectDTO);

    return NextResponse.json(
      {
        status: 201,
        success: true,
        data: { subject },
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
