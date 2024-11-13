import { NextRequest } from 'next/server';

import { EventService } from '@/api/v1/(routes)/events/services/event.service';
import { CreateEventDTO } from '@/api/v1/(routes)/events/types/event';
import { getParams } from '@/api/v1/lib/params';
import { createdResponse, errorResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';
import { eventSchema } from './schemas/event';

export const GET = auth(async (req: NextRequest) => {
  try {
    const { page, limit, search } = getParams(req);
    const { events, total } = await EventService.listEvents(page, limit, search);

    return successResponse({ events, total });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = eventSchema.parse(data);
    const event = await EventService.createEvent(validatedData as unknown as CreateEventDTO);

    return createdResponse({ event });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
