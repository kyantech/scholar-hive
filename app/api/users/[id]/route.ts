import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest, NextResponse } from 'next/server';

import { UserService } from '@/api/users/services/user.service';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const user = await UserService.getUserById(id);

    if (!user) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          error: { message: 'User not found' },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      success: true,
      data: { user },
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
