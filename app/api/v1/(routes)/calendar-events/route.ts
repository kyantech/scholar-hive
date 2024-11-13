import { NextRequest } from 'next/server';

import { CalendarEventService } from '@/api/v1/(routes)/calendar-events/services/calendar-event.service';
import { CreateCalendarEventDTO } from '@/api/v1/(routes)/calendar-events/types/calendar-event';
import { getParams } from '@/api/v1/lib/params';
import { createdResponse, errorResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';
import { calendarEventSchema } from './schemas/calendar-event';

export const GET = auth(async (req: NextRequest) => {
  try {
    const { page, limit, search } = getParams(req);
    const { calendarEvents, total } = await CalendarEventService.listCalendarEvents(page, limit, search);

    return successResponse({ calendarEvents, total });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = calendarEventSchema.parse(data);
    const calendarEvent = await CalendarEventService.createCalendarEvent(
      validatedData as unknown as CreateCalendarEventDTO
    );

    return createdResponse({ calendarEvent });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
