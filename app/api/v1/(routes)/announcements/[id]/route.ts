import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest } from 'next/server';

import { AnnouncementService } from '@/api/v1/(routes)/announcements/services/announcement.service';
import { errorResponse, notFoundResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const announcement = await AnnouncementService.getAnnouncementById(id);

    if (!announcement) {
      return notFoundResponse('Announcement not found');
    }

    return successResponse({ announcement });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const PATCH = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const data = await req.json();
    const announcement = await AnnouncementService.updateAnnouncement(id, data);

    return successResponse({ announcement });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const DELETE = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    await AnnouncementService.deleteAnnouncement(id);

    return successResponse({ message: 'Announcement deleted successfully' });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
