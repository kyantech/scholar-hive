import { NextRequest } from 'next/server';

import { TeacherService } from '@/api/v1/(routes)/teachers/services/teacher.service';
import { CreateTeacherDTO } from '@/api/v1/(routes)/teachers/types/teacher';
import { getParams } from '@/api/v1/lib/params';
import { createdResponse, errorResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';
import { teacherSchema } from './schemas/teacher';

export const GET = auth(async (req: NextRequest) => {
  try {
    const { page, limit, search } = getParams(req);
    const { teachers, total } = await TeacherService.listTeachers(page, limit, search);

    return successResponse({ teachers, total });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = teacherSchema.parse(data);
    const teacher = await TeacherService.createTeacher(validatedData as unknown as CreateTeacherDTO);

    return createdResponse({ teacher });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
