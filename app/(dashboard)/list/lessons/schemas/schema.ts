import * as z from 'zod';

export const lessonSchema = z.object({
  subject: z.string().min(1, {
    message: 'Please select a subject.',
  }),
  class: z.string().min(1, {
    message: 'Please select a class.',
  }),
  teacher: z.string().min(1, {
    message: 'Please select a teacher.',
  }),
});

export type LessonFormInputs = z.infer<typeof lessonSchema>;
