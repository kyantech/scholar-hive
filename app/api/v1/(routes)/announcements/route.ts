import { NextRequest } from 'next/server';

import { AnnouncementService } from '@/api/v1/(routes)/announcements/services/announcement.service';
import { CreateAnnouncementDTO } from '@/api/v1/(routes)/announcements/types/announcement';
import { getParams } from '@/api/v1/lib/params';
import { createdResponse, errorResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';
import { announcementSchema } from './schemas/announcement';

export const GET = auth(async (req: NextRequest) => {
  try {
    const { page, limit, search } = getParams(req);
    const { announcements, total } = await AnnouncementService.listAnnouncements(page, limit, search);

    return successResponse({ announcements, total });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = announcementSchema.parse(data);
    const announcement = await AnnouncementService.createAnnouncement(
      validatedData as unknown as CreateAnnouncementDTO
    );

    return createdResponse({ announcement });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
