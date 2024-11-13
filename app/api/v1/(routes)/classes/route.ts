import { NextRequest } from 'next/server';

import { ClassService } from '@/api/v1/(routes)/classes/services/class.service';
import { CreateClassDTO } from '@/api/v1/(routes)/classes/types/class';
import { getParams } from '@/api/v1/lib/params';
import { createdResponse, errorResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';
import { classSchema } from './schemas/class';

export const GET = auth(async (req: NextRequest) => {
  try {
    const { page, limit, search } = getParams(req);
    const { classes, total } = await ClassService.listClasses(page, limit, search);

    return successResponse({ classes, total });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = classSchema.parse(data);
    const classCreated = await ClassService.createClass(validatedData as unknown as CreateClassDTO);

    return createdResponse({ class: classCreated });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
