import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest } from 'next/server';

import { ResultService } from '@/api/v1/(routes)/results/services/result.service';
import { errorResponse, notFoundResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const result = await ResultService.getResultById(id);

    if (!result) {
      return notFoundResponse('Result not found');
    }

    return successResponse({ result });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const PATCH = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const data = await req.json();
    const result = await ResultService.updateResult(id, data);

    return successResponse({ result });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const DELETE = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    await ResultService.deleteResult(id);

    return successResponse({ message: 'Result deleted successfully' });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
