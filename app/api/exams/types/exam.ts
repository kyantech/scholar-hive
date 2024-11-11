export interface ExamResponse {
  id: string;
  date: Date;
  subject: {
    id: string;
    name: string;
  };
  class: {
    id: string;
    name: string;
  };
  teacher: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExamDTO {
  date: Date;
  subjectId: string;
  classId: string;
  teacherId: string;
}

export type UpdateExamDTO = Partial<CreateExamDTO>;
