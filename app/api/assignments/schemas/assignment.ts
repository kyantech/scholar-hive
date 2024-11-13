import { z } from 'zod';

export const assignmentSchema = z.object({
  dueDate: z.string().transform((str) => new Date(str)),
  subjectId: z.string(),
  classId: z.string(),
  teacherId: z.string(),
});

export type AssignmentFormInputs = z.infer<typeof assignmentSchema>;
