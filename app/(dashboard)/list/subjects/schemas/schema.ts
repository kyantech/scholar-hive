import * as z from 'zod';

export const subjectsSchema = z.object({
  name: z.string().min(2, {
    message: 'Subject name must be at least 2 characters.',
  }),
  teachers: z.array(z.string()).optional(),
});

export type SubjectFormInputs = z.infer<typeof subjectsSchema>;
