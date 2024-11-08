import { z } from 'zod';

export const parentSchema = z.object({
  email: z.string().email({ message: 'Invalid email address!' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long!' }),
  name: z.string().min(1, { message: 'Name is required!' }),
  phone: z.string().min(1, { message: 'Phone is required!' }),
  address: z.string().min(1, { message: 'Address is required!' }),
  students: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, { message: 'At least one student must be selected!' }),
  img: z.instanceof(FileList).optional(),
});

export type ParentFormInputs = z.infer<typeof parentSchema>;
