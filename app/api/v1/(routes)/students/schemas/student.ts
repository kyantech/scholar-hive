import { z } from 'zod';

export const studentSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  bloodType: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .transform((bloodType) => bloodType.replace('+', '_POSITIVE').replace('-', '_NEGATIVE')),
  birthday: z.string().transform((str) => new Date(str)),
  sex: z.enum(['male', 'female', 'other']),
  grade: z.string(),
  classId: z.string(),
});

export type StudentFormInputs = z.infer<typeof studentSchema>;
