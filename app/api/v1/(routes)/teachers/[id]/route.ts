import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest } from 'next/server';

import { TeacherService } from '@/api/v1/(routes)/teachers/services/teacher.service';
import { errorResponse, notFoundResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const teacher = await TeacherService.getTeacherById(id);

    if (!teacher) {
      return notFoundResponse('Teacher not found');
    }

    return successResponse({ teacher });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const PATCH = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const data = await req.json();
    const teacher = await TeacherService.updateTeacher(id, data);

    return successResponse({ teacher });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const DELETE = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    await TeacherService.deleteTeacher(id);

    return successResponse({ message: 'Teacher deleted successfully' });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
