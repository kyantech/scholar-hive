import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest, NextResponse } from 'next/server';

import { ClassService } from '@/api/classes/services/class.service';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const classFound = await ClassService.getClassById(id);

    if (!classFound) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          error: { message: 'Class not found' },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      success: true,
      data: { class: classFound },
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
    const classUpdated = await ClassService.updateClass(id, data);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { class: classUpdated },
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
    await ClassService.deleteClass(id);

    return NextResponse.json({
      status: 200,
      success: true,
      message: 'Class deleted successfully',
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
