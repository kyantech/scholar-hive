import { NextRequest, NextResponse } from 'next/server';

import { ClassService } from '@/api/classes/services/class.service';
import { CreateClassDTO } from '@/api/classes/types/class';
import { auth } from '@/auth';
import { classSchema } from './schemas/class';

export const GET = auth(async (req: NextRequest) => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;

    const { classes, total } = await ClassService.listClasses(page, limit, search);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { classes, total },
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
    const validatedData = classSchema.parse(data);
    const classCreated = await ClassService.createClass(validatedData as unknown as CreateClassDTO);

    return NextResponse.json(
      {
        status: 201,
        success: true,
        data: { class: classCreated },
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
