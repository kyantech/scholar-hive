import { NextRequest, NextResponse } from 'next/server';

import { UserService } from '@/api/users/services/user.service';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest) => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;

    const { users, total } = await UserService.listUsers(page, limit, search);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { users, total },
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
