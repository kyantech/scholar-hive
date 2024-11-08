import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest, NextResponse } from 'next/server';

import { ParentService } from '@/api/parents/services/parent.service';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const parent = await ParentService.getParentById(id);

    if (!parent) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          error: { message: 'Parent not found' },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      success: true,
      data: { parent },
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

export const PATCH = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const data = await req.json();
    const parent = await ParentService.updateParent(id, data);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { parent },
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

export const DELETE = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    await ParentService.deleteParent(id);

    return NextResponse.json({
      status: 200,
      success: true,
      message: 'Parent deleted successfully',
    });
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
