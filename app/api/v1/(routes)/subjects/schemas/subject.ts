import * as z from 'zod';

export const subjectSchema = z.object({
  name: z.string().min(2),
  teacherIds: z.array(z.string()).optional(),
});

export type SubjectFormInputs = z.infer<typeof subjectSchema>;
