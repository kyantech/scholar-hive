import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest } from 'next/server';

import { AssignmentService } from '@/api/v1/(routes)/assignments/services/assignment.service';
import { errorResponse, notFoundResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const assignment = await AssignmentService.getAssignmentById(id);

    if (!assignment) {
      return notFoundResponse('Assignment not found');
    }

    return successResponse({ assignment });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const PATCH = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const data = await req.json();
    const assignment = await AssignmentService.updateAssignment(id, data);

    return successResponse({ assignment });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const DELETE = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    await AssignmentService.deleteAssignment(id);

    return successResponse({ message: 'Assignment deleted successfully' });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
