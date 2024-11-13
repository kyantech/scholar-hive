export interface EventResponse {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  class: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEventDTO {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  classId: string;
}

export type UpdateEventDTO = Partial<CreateEventDTO>;
