import { z } from 'zod';

export const teacherSchema = z.object({
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
  subjects: z.array(z.string()).min(1),
});

export type TeacherFormInputs = z.infer<typeof teacherSchema>;
