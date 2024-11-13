import { Prisma, Announcement as PrismaAnnouncement } from '@prisma/client';

import {
  AnnouncementResponse,
  CreateAnnouncementDTO,
  UpdateAnnouncementDTO,
} from '@/api/v1/(routes)/announcements/types/announcement';
import prisma from '@/lib/prisma';

const ANNOUNCEMENT_INCLUDE = {
  class: {
    select: {
      id: true,
      name: true,
    },
  },
} as const;

type AnnouncementWithRelations = PrismaAnnouncement & {
  class: { id: string; name: string };
};

export class AnnouncementService {
  static async createAnnouncement(data: CreateAnnouncementDTO): Promise<AnnouncementResponse> {
    const announcement = await prisma.announcement.create({
      data,
      include: ANNOUNCEMENT_INCLUDE,
    });

    return this.formatAnnouncementResponse(announcement as AnnouncementWithRelations);
  }

  static async updateAnnouncement(id: string, data: Partial<UpdateAnnouncementDTO>): Promise<AnnouncementResponse> {
    const announcement = await prisma.announcement.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: ANNOUNCEMENT_INCLUDE,
    });

    return this.formatAnnouncementResponse(announcement as AnnouncementWithRelations);
  }

  static async listAnnouncements(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{ announcements: AnnouncementResponse[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.AnnouncementWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        where,
        skip,
        take: limit,
        include: ANNOUNCEMENT_INCLUDE,
        orderBy: { date: 'desc' },
      }),
      prisma.announcement.count({ where }),
    ]);

    return {
      announcements: (announcements as AnnouncementWithRelations[]).map(this.formatAnnouncementResponse),
      total,
    };
  }

  static async getAnnouncementById(id: string): Promise<AnnouncementResponse | null> {
    const announcement = await prisma.announcement.findUnique({
      where: { id },
      include: ANNOUNCEMENT_INCLUDE,
    });

    return announcement ? this.formatAnnouncementResponse(announcement as AnnouncementWithRelations) : null;
  }

  static async deleteAnnouncement(id: string): Promise<void> {
    await prisma.announcement.delete({
      where: { id },
    });
  }

  private static formatAnnouncementResponse(announcement: AnnouncementWithRelations): AnnouncementResponse {
    return {
      id: announcement.id,
      title: announcement.title,
      description: announcement.description,
      date: announcement.date,
      class: announcement.class,
      createdAt: announcement.createdAt,
      updatedAt: announcement.updatedAt,
    };
  }
}
