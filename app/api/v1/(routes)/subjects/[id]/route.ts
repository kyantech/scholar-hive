import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest } from 'next/server';

import { SubjectService } from '@/api/v1/(routes)/subjects/services/subject.service';
import { errorResponse, notFoundResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const subject = await SubjectService.getSubjectById(id);

    if (!subject) {
      return notFoundResponse('Subject not found');
    }

    return successResponse({ subject });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const PATCH = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const data = await req.json();
    const subject = await SubjectService.updateSubject(id, data);

    return successResponse({ subject });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const DELETE = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    await SubjectService.deleteSubject(id);

    return successResponse({ message: 'Subject deleted successfully' });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
