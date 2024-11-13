import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest } from 'next/server';

import { ClassService } from '@/api/v1/(routes)/classes/services/class.service';
import { errorResponse, notFoundResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const classFound = await ClassService.getClassById(id);

    if (!classFound) {
      return notFoundResponse('Class not found');
    }

    return successResponse({ class: classFound });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const PATCH = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const data = await req.json();
    const classUpdated = await ClassService.updateClass(id, data);

    return successResponse({ class: classUpdated });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const DELETE = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    await ClassService.deleteClass(id);

    return successResponse({ message: 'Class deleted successfully' });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
