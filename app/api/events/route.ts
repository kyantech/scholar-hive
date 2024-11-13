import { NextRequest, NextResponse } from 'next/server';

import { EventService } from '@/api/events/services/event.service';
import { CreateEventDTO } from '@/api/events/types/event';
import { auth } from '@/auth';
import { eventSchema } from './schemas/event';

export const GET = auth(async (req: NextRequest) => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;

    const { events, total } = await EventService.listEvents(page, limit, search);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { events, total },
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
    const validatedData = eventSchema.parse(data);
    const event = await EventService.createEvent(validatedData as unknown as CreateEventDTO);

    return NextResponse.json(
      {
        status: 201,
        success: true,
        data: { event },
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
