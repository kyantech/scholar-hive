import { Prisma, CalendarEvent as PrismaCalendarEvent } from '@prisma/client';

import {
  CalendarEventResponse,
  CreateCalendarEventDTO,
  UpdateCalendarEventDTO,
} from '@/api/calendar-events/types/calendar-event';
import prisma from '@/lib/prisma';

const CALENDAR_EVENT_INCLUDE = {
  class: {
    select: {
      id: true,
      name: true,
    },
  },
} as const;

type CalendarEventWithRelations = PrismaCalendarEvent & {
  class: { id: string; name: string };
};

export class CalendarEventService {
  static async createCalendarEvent(data: CreateCalendarEventDTO): Promise<CalendarEventResponse> {
    const calendarEvent = await prisma.calendarEvent.create({
      data,
      include: CALENDAR_EVENT_INCLUDE,
    });

    return this.formatCalendarEventResponse(calendarEvent as CalendarEventWithRelations);
  }

  static async updateCalendarEvent(id: string, data: Partial<UpdateCalendarEventDTO>): Promise<CalendarEventResponse> {
    const calendarEvent = await prisma.calendarEvent.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: CALENDAR_EVENT_INCLUDE,
    });

    return this.formatCalendarEventResponse(calendarEvent as CalendarEventWithRelations);
  }

  static async listCalendarEvents(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{ calendarEvents: CalendarEventResponse[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.CalendarEventWhereInput = {
      ...(search && {
        OR: [{ title: { contains: search, mode: 'insensitive' } }],
      }),
    };

    const [calendarEvents, total] = await Promise.all([
      prisma.calendarEvent.findMany({
        where,
        skip,
        take: limit,
        include: CALENDAR_EVENT_INCLUDE,
        orderBy: { date: 'desc' },
      }),
      prisma.calendarEvent.count({ where }),
    ]);

    return {
      calendarEvents: (calendarEvents as CalendarEventWithRelations[]).map(this.formatCalendarEventResponse),
      total,
    };
  }

  static async getCalendarEventById(id: string): Promise<CalendarEventResponse | null> {
    const calendarEvent = await prisma.calendarEvent.findUnique({
      where: { id },
      include: CALENDAR_EVENT_INCLUDE,
    });

    return calendarEvent ? this.formatCalendarEventResponse(calendarEvent as CalendarEventWithRelations) : null;
  }

  static async deleteCalendarEvent(id: string): Promise<void> {
    await prisma.calendarEvent.delete({
      where: { id },
    });
  }

  private static formatCalendarEventResponse(calendarEvent: CalendarEventWithRelations): CalendarEventResponse {
    return {
      id: calendarEvent.id,
      title: calendarEvent.title,
      date: calendarEvent.date,
      startTime: calendarEvent.startTime,
      endTime: calendarEvent.endTime,
      class: calendarEvent.class,
      createdAt: calendarEvent.createdAt,
      updatedAt: calendarEvent.updatedAt,
    };
  }
}
