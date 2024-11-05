import { z } from 'zod';

export const parentSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long!' })
    .max(20, { message: 'Username must be at most 20 characters long!' }),
  email: z.string().email({ message: 'Invalid email address!' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long!' }),
  firstName: z.string().min(1, { message: 'First name is required!' }),
  lastName: z.string().min(1, { message: 'Last name is required!' }),
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