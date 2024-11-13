import { NextRequest } from 'next/server';

import { StudentService } from '@/api/v1/(routes)/students/services/student.service';
import { CreateStudentDTO } from '@/api/v1/(routes)/students/types/student';
import { getParams } from '@/api/v1/lib/params';
import { createdResponse, errorResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';
import { studentSchema } from './schemas/student';

export const GET = auth(async (req: NextRequest) => {
  try {
    const { page, limit, search } = getParams(req);
    const { students, total } = await StudentService.listStudents(page, limit, search);

    return successResponse({ students, total });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = studentSchema.parse(data);
    const student = await StudentService.createStudent(validatedData as unknown as CreateStudentDTO);

    return createdResponse({ student });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
