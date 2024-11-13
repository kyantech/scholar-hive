import * as z from 'zod';

export const resultSchema = z.object({
  type: z.string().min(1, {
    message: 'Type is required.',
  }),
  examId: z.string().min(1, {
    message: 'Please select an exam.',
  }),
  studentId: z.string().min(1, {
    message: 'Please select a student.',
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
