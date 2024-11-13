import { NextRequest, NextResponse } from 'next/server';

import { CalendarEventService } from '@/api/calendar-events/services/calendar-event.service';
import { CreateCalendarEventDTO } from '@/api/calendar-events/types/calendar-event';
import { auth } from '@/auth';
import { calendarEventSchema } from './schemas/calendar-event';

export const GET = auth(async (req: NextRequest) => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;

    const { calendarEvents, total } = await CalendarEventService.listCalendarEvents(page, limit, search);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { calendarEvents, total },
      error: null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        success: false,
        error: { message: error.message },
      },
      { status: 500 }
    );
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = calendarEventSchema.parse(data);
    const calendarEvent = await CalendarEventService.createCalendarEvent(
      validatedData as unknown as CreateCalendarEventDTO
    );

    return NextResponse.json(
      {
        status: 201,
        success: true,
        data: { calendarEvent },
        error: null,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 400,
        success: false,
        error: { message: error.message },
      },
      { status: 400 }
    );
  }
});
