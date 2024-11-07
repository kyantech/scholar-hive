import * as z from 'zod';

export const assignmentSchema = z.object({
  subject: z.string().min(1, {
    message: 'Please select a subject.',
  }),
  class: z.string().min(1, {
    message: 'Please select a class.',
  }),
  teacher: z.string().min(1, {
    message: 'Please select a teacher.',
  }),
  dueDate: z.date({ message: 'Due date is required!' }),
});

export type AssignmentFormInputs = z.infer<typeof assignmentSchema>;
