import { NextRequest } from 'next/server';

import { UserService } from '@/api/v1/(routes)/users/services/user.service';
import { getParams } from '@/api/v1/lib/params';
import { errorResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';

export const GET = auth(async (req: NextRequest) => {
  try {
    const { page, limit, search } = getParams(req);
    const { users, total } = await UserService.listUsers(page, limit, search);

    return successResponse({ users, total });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});
