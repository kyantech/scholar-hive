import * as z from 'zod';

export const announcementSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required.',
  }),
  description: z.string().min(1, {
    message: 'Description is required.',
  }),
  class: z.string().min(1, {
    message: 'Please select a class.',
  }),
  date: z.date({
    message: 'Date is required!',
  }),
});

export type AnnouncementFormInputs = z.infer<typeof announcementSchema>;
