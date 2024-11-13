import { NextRequest, NextResponse } from 'next/server';

import { AssignmentService } from '@/api/assignments/services/assignment.service';
import { CreateAssignmentDTO } from '@/api/assignments/types/assignment';
import { auth } from '@/auth';
import { assignmentSchema } from './schemas/assignment';

export const GET = auth(async (req: NextRequest) => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const { assignments, total } = await AssignmentService.listAssignments(page, limit);

    return NextResponse.json({
      status: 200,
      success: true,
      data: { assignments, total },
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
    const validatedData = assignmentSchema.parse(data);
    const assignment = await AssignmentService.createAssignment(validatedData as unknown as CreateAssignmentDTO);

    return NextResponse.json(
      {
        status: 201,
        success: true,
        data: { assignment },
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
