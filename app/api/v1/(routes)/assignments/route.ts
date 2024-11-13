import { NextRequest } from 'next/server';

import { AssignmentService } from '@/api/v1/(routes)/assignments/services/assignment.service';
import { CreateAssignmentDTO } from '@/api/v1/(routes)/assignments/types/assignment';
import { getParams } from '@/api/v1/lib/params';
import { createdResponse, errorResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';
import { assignmentSchema } from './schemas/assignment';

export const GET = auth(async (req: NextRequest) => {
  try {
    const { page, limit } = getParams(req);
    const { assignments, total } = await AssignmentService.listAssignments(page, limit);

    return successResponse({ assignments, total });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = assignmentSchema.parse(data);
    const assignment = await AssignmentService.createAssignment(validatedData as unknown as CreateAssignmentDTO);

    return createdResponse({ assignment });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
