import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { NextRequest } from 'next/server';

import { UserService } from '@/api/v1/(routes)/users/services/user.service';
import { errorResponse, notFoundResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  const id = ctx.params?.id as string;
  try {
    const user = await UserService.getUserById(id);

    if (!user) {
      return notFoundResponse('User not found');
    }

    return successResponse({ user });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});
