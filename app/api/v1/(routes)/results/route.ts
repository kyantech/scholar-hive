import { NextRequest } from 'next/server';

import { ResultService } from '@/api/v1/(routes)/results/services/result.service';
import { CreateResultDTO } from '@/api/v1/(routes)/results/types/result';
import { getParams } from '@/api/v1/lib/params';
import { createdResponse, errorResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';
import { resultSchema } from './schemas/result';

export const GET = auth(async (req: NextRequest) => {
  try {
    const { page, limit, search } = getParams(req);
    const { results, total } = await ResultService.listResults(page, limit, search);

    return successResponse({ results, total });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = resultSchema.parse(data);
    const result = await ResultService.createResult(validatedData as unknown as CreateResultDTO);

    return createdResponse({ result });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
