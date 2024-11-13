import { NextRequest } from 'next/server';

import { SubjectService } from '@/api/v1/(routes)/subjects/services/subject.service';
import { CreateSubjectDTO } from '@/api/v1/(routes)/subjects/types/subject';
import { getParams } from '@/api/v1/lib/params';
import { createdResponse, errorResponse, successResponse } from '@/api/v1/lib/responses';
import { auth } from '@/auth';
import { subjectSchema } from './schemas/subject';

export const GET = auth(async (req: NextRequest) => {
  try {
    const { page, limit, search } = getParams(req);
    const { subjects, total } = await SubjectService.listSubjects(page, limit, search);

    return successResponse({ subjects, total });
  } catch (error: any) {
    return errorResponse(error.message);
  }
});

export const POST = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const validatedData = subjectSchema.parse(data);
    const subject = await SubjectService.createSubject(validatedData as unknown as CreateSubjectDTO);

    return createdResponse({ subject });
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
});
