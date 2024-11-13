import { Prisma, Event as PrismaEvent } from '@prisma/client';

import { CreateEventDTO, EventResponse, UpdateEventDTO } from '@/api/v1/(routes)/events/types/event';
import prisma from '@/lib/prisma';

const EVENT_INCLUDE = {
  class: {
    select: {
      id: true,
      name: true,
    },
  },
} as const;

type EventWithRelations = PrismaEvent & {
  class: { id: string; name: string };
};

export class EventService {
  static async createEvent(data: CreateEventDTO): Promise<EventResponse> {
    const event = await prisma.event.create({
      data,
      include: EVENT_INCLUDE,
    });

    return this.formatEventResponse(event as EventWithRelations);
  }

  static async updateEvent(id: string, data: Partial<UpdateEventDTO>): Promise<EventResponse> {
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: EVENT_INCLUDE,
    });

    return this.formatEventResponse(event as EventWithRelations);
  }

  static async listEvents(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{ events: EventResponse[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.EventWhereInput = {
      ...(search && {
        OR: [{ title: { contains: search, mode: 'insensitive' } }],
      }),
    };

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        include: EVENT_INCLUDE,
        orderBy: { date: 'desc' },
      }),
      prisma.event.count({ where }),
    ]);

    return {
      events: (events as EventWithRelations[]).map(this.formatEventResponse),
      total,
    };
  }

  static async getEventById(id: string): Promise<EventResponse | null> {
    const event = await prisma.event.findUnique({
      where: { id },
      include: EVENT_INCLUDE,
    });

    return event ? this.formatEventResponse(event as EventWithRelations) : null;
  }

  static async deleteEvent(id: string): Promise<void> {
    await prisma.event.delete({
      where: { id },
    });
  }

  private static formatEventResponse(event: EventWithRelations): EventResponse {
    return {
      id: event.id,
      title: event.title,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      class: event.class,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }
}
