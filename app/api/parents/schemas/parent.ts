import { z } from 'zod';

export const parentSchema = z.object({
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
  studentIds: z.array(z.string()).min(1),
});

export type ParentFormInputs = z.infer<typeof parentSchema>;
