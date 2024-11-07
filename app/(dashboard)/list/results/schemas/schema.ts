import * as z from 'zod';

export const resultSchema = z.object({
  subject: z.string().min(1, {
    message: 'Please select a subject.',
  }),
  class: z.string().min(1, {
    message: 'Please select a class.',
  }),
  teacher: z.string().min(1, {
    message: 'Please select a teacher.',
  }),
  student: z.string().min(1, {
    message: 'Please select a student.',
  }),
  date: z.date({
    message: 'Date is required!',
  }),
  score: z
    .number()
    .min(0)
    .max(100, {
      message: 'Score must be between 0 and 100',
    })
    .or(z.string().regex(/^\d+$/).transform(Number)),
});

export type ResultFormInputs = z.infer<typeof resultSchema>;
