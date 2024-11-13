import * as z from 'zod';

export const eventSchema = z.object({
  title: z.string().min(1),
  date: z.string().transform((str) => new Date(str)),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  classId: z.string().min(1),
});

export type EventFormInputs = z.infer<typeof eventSchema>;
