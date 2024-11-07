import { z } from 'zod';

export const teacherSchema = z.object({
  email: z.string().email({ message: 'Invalid email address!' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long!' }).optional(),
  name: z.string().min(1, { message: 'First name is required!' }),
  phone: z.string().min(1, { message: 'Phone is required!' }),
  address: z.string().min(1, { message: 'Address is required!' }),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    message: 'Blood Type is required!',
  }),
  birthday: z.date({ message: 'Birthday is required!' }),
  sex: z.enum(['male', 'female', 'other'], {
    message: 'Sex is required!',
  }),
  img: z.instanceof(FileList).optional(),
  classes: z.array(z.string()).optional(),
  subjects: z.array(z.string()).min(1, 'At least one subject must be selected'),
});

export type TeacherFormInputs = z.infer<typeof teacherSchema>;
