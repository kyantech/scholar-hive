import * as z from 'zod';

export const announcementSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().transform((str) => new Date(str)),
  classId: z.string().min(1),
});

export type AnnouncementFormInputs = z.infer<typeof announcementSchema>;
