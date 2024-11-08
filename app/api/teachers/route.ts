import { NextRequest, NextResponse } from 'next/server';

import { TeacherService } from '@/api/teachers/services/teacher.service';
import { CreateTeacherDTO } from '@/api/teachers/types/teacher';
import { auth } from '@/auth';
import { teacherSchema } from './schemas/teacher';

export const GET = auth(async (req: NextRequest) => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;

    const { teachers, total } = await TeacherService.listTeachers(page, limit, search);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { teachers, total },
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
    const validatedData = teacherSchema.parse(data);
    const teacher = await TeacherService.createTeacher(validatedData as unknown as CreateTeacherDTO);

    return NextResponse.json(
      {
        status: 201,
        success: true,
        data: { teacher },
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
