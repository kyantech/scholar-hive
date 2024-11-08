import { z } from 'zod';

export const classSchema = z.object({
  name: z.string(),
  grade: z.string(),
  capacity: z.number().min(1),
  supervisorId: z.string(),
  teacherIds: z.array(z.string()).optional(),
});

export type ClassFormInputs = z.infer<typeof classSchema>;
