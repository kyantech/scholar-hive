import { z } from 'zod';

export const classSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  grade: z.string().min(1, 'Grade is required'),
  capacity: z.string().min(1, 'Capacity is required'),
  supervisor: z.string().min(1, 'Supervisor is required'),
});

export type ClassFormInputs = z.infer<typeof classSchema>;
