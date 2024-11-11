import { NextRequest, NextResponse } from 'next/server';

import { ResultService } from '@/api/results/services/result.service';
import { CreateResultDTO } from '@/api/results/types/result';
import { auth } from '@/auth';
import { resultSchema } from './schemas/result';

export const GET = auth(async (req: NextRequest) => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;

    const { results, total } = await ResultService.listResults(page, limit, search);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { results, total },
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

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = resultSchema.parse(data);
    const result = await ResultService.createResult(validatedData as unknown as CreateResultDTO);

    return NextResponse.json(
      {
        status: 201,
        success: true,
        data: { result },
        error: null,
      },
      { status: 201 }
    );
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
