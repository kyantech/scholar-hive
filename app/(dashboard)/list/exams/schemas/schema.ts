import * as z from 'zod';

export const examSchema = z.object({
  subject: z.string().min(1, {
    message: 'Please select a subject.',
  }),
  class: z.string().min(1, {
    message: 'Please select a class.',
  }),
  teacher: z.string().min(1, {
    message: 'Please select a teacher.',
  }),
  date: z.date({ message: 'Birthday is required!' }),
});

export type ExamFormInputs = z.infer<typeof examSchema>;
