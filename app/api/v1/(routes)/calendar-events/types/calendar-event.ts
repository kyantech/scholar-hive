export interface CalendarEventResponse {
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

export interface CreateCalendarEventDTO {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  classId: string;
}

export type UpdateCalendarEventDTO = Partial<CreateCalendarEventDTO>;
