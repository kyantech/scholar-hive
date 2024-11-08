import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest, NextResponse } from 'next/server';

import { TeacherService } from '@/api/teachers/services/teacher.service';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const teacher = await TeacherService.getTeacherById(id);

    if (!teacher) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          error: { message: 'Teacher not found' },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      success: true,
      data: { teacher },
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
    const teacher = await TeacherService.updateTeacher(id, data);

    return NextResponse.json(
      {
        status: 200,
        success: true,
        data: { teacher },
        error: null,
      },
      { status: 200 }
    );
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
    await TeacherService.deleteTeacher(id);

    return NextResponse.json({
      status: 200,
      success: true,
      message: 'Teacher deleted successfully',
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
