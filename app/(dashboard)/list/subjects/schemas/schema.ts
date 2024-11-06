import * as z from 'zod';

export const subjectsSchema = z.object({
  name: z.string().min(2, {
    message: 'Subject name must be at least 2 characters.',
  }),
  teachers: z.array(z.string()).min(1, {
    message: 'Please select at least one teacher.',
  }),
});

export type SubjectFormInputs = z.infer<typeof subjectsSchema>;
