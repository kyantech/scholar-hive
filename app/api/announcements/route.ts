import { NextRequest, NextResponse } from 'next/server';

import { AnnouncementService } from '@/api/announcements/services/announcement.service';
import { CreateAnnouncementDTO } from '@/api/announcements/types/announcement';
import { auth } from '@/auth';
import { announcementSchema } from './schemas/announcement';

export const GET = auth(async (req: NextRequest) => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;

    const { announcements, total } = await AnnouncementService.listAnnouncements(page, limit, search);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { announcements, total },
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
    const validatedData = announcementSchema.parse(data);
    const announcement = await AnnouncementService.createAnnouncement(
      validatedData as unknown as CreateAnnouncementDTO
    );

    return NextResponse.json(
      {
        status: 201,
        success: true,
        data: { announcement },
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
