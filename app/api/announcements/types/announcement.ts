export interface AnnouncementResponse {
  id: string;
  title: string;
  description: string;
  date: Date;
  class: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAnnouncementDTO {
  title: string;
  description: string;
  date: Date;
  classId: string;
}

export type UpdateAnnouncementDTO = Partial<CreateAnnouncementDTO>;
