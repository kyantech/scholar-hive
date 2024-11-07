import { z } from 'zod';

export const studentSchema = z.object({
  email: z.string().email({ message: 'Invalid email address!' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long!' }),
  name: z.string().min(1, { message: 'Name is required!' }),
  phone: z.string().min(1, { message: 'Phone is required!' }),
  address: z.string().min(1, { message: 'Address is required!' }),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    message: 'Blood Type is required!',
  }),
  birthday: z.date({ message: 'Birthday is required!' }),
  sex: z.enum(['male', 'female', 'other'], {
    message: 'Sex is required!',
  }),
  grade: z.string().min(1, { message: 'Grade is required!' }),
  class: z.string().min(1, { message: 'Class is required!' }),
  img: z.instanceof(FileList).optional(),
});

export type StudentFormInputs = z.infer<typeof studentSchema>;
