import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest, NextResponse } from 'next/server';

import { ResultService } from '@/api/results/services/result.service';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const result = await ResultService.getResultById(id);

    if (!result) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          error: { message: 'Result not found' },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      success: true,
      data: { result },
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
    const result = await ResultService.updateResult(id, data);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { result },
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
    await ResultService.deleteResult(id);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { message: 'Result deleted successfully' },
      error: null,
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
