import { NextRequest, NextResponse } from 'next/server';

import { StudentService } from '@/api/students/services/student.service';
import { CreateStudentDTO } from '@/api/students/types/student';
import { auth } from '@/auth';
import { studentSchema } from './schemas/student';

export const GET = auth(async (req: NextRequest) => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;

    const { students, total } = await StudentService.listStudents(page, limit, search);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { students, total },
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
    const validatedData = studentSchema.parse(data);
    const student = await StudentService.createStudent(validatedData as unknown as CreateStudentDTO);

    return NextResponse.json(
      {
        status: 201,
        success: true,
        data: { student },
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
