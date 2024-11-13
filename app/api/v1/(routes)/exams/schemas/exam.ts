import { z } from 'zod';

export const examSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  subjectId: z.string(),
  classId: z.string(),
  teacherId: z.string(),
});

export type ExamFormInputs = z.infer<typeof examSchema>;
