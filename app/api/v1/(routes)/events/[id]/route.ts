import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest } from 'next/server';

import { EventService } from '@/api/v1/(routes)/events/services/event.service';
import { errorResponse, notFoundResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const event = await EventService.getEventById(id);

    if (!event) {
      return notFoundResponse('Event not found');
    }

    return successResponse({ event });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const PATCH = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const data = await req.json();
    const event = await EventService.updateEvent(id, data);

    return successResponse({ event });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const DELETE = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    await EventService.deleteEvent(id);

    return successResponse({ message: 'Event deleted successfully' });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
