import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest } from 'next/server';

import { ParentService } from '@/api/v1/(routes)/parents/services/parent.service';
import { errorResponse, notFoundResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const parent = await ParentService.getParentById(id);

    if (!parent) {
      return notFoundResponse('Parent not found');
    }

    return successResponse({ parent });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const PATCH = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const data = await req.json();
    const parent = await ParentService.updateParent(id, data);

    return successResponse({ parent });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const DELETE = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    await ParentService.deleteParent(id);

    return successResponse({ message: 'Parent deleted successfully' });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
