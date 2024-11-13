import { NextRequest } from 'next/server';

import { ParentService } from '@/api/v1/(routes)/parents/services/parent.service';
import { CreateParentDTO } from '@/api/v1/(routes)/parents/types/parent';
import { getParams } from '@/api/v1/lib/params';
import { createdResponse, errorResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';
import { parentSchema } from './schemas/parent';

export const GET = auth(async (req: NextRequest) => {
  try {
    const { page, limit, search } = getParams(req);
    const { parents, total } = await ParentService.listParents(page, limit, search);

    return successResponse({ parents, total });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = parentSchema.parse(data);
    const parent = await ParentService.createParent(validatedData as unknown as CreateParentDTO);

    return createdResponse({ parent });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
