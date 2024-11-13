import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest } from 'next/server';

import { StudentService } from '@/api/v1/(routes)/students/services/student.service';
import { errorResponse, notFoundResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const student = await StudentService.getStudentById(id);

    if (!student) {
      return notFoundResponse('Student not found');
    }

    return successResponse({ student });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const PATCH = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const data = await req.json();
    const student = await StudentService.updateStudent(id, data);

    return successResponse({ student });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const DELETE = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    await StudentService.deleteStudent(id);

    return successResponse({ message: 'Student deleted successfully' });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
