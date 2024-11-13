import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest } from 'next/server';

import { CalendarEventService } from '@/api/v1/(routes)/calendar-events/services/calendar-event.service';
import { errorResponse, notFoundResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const calendarEvent = await CalendarEventService.getCalendarEventById(id);

    if (!calendarEvent) {
      return notFoundResponse('Calendar event not found');
    }

    return successResponse({ calendarEvent });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const PATCH = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const data = await req.json();
    const calendarEvent = await CalendarEventService.updateCalendarEvent(id, data);

    return successResponse({ calendarEvent });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const DELETE = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    await CalendarEventService.deleteCalendarEvent(id);

    return successResponse({ message: 'Calendar event deleted successfully' });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
