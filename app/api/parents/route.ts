import { NextRequest, NextResponse } from 'next/server';

import { ParentService } from '@/api/parents/services/parent.service';
import { CreateParentDTO } from '@/api/parents/types/parent';
import { auth } from '@/auth';
import { parentSchema } from './schemas/parent';

export const GET = auth(async (req: NextRequest) => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;

    const { parents, total } = await ParentService.listParents(page, limit, search);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { parents, total },
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
    const validatedData = parentSchema.parse(data);
    const parent = await ParentService.createParent(validatedData as unknown as CreateParentDTO);

    return NextResponse.json(
      {
        status: 201,
        success: true,
        data: { parent },
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
