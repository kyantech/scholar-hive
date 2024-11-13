export interface ResultResponse {
  id: string;
  type: string;
  score: number;
  exam: {
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
    student: {
      id: string;
      name: string;
    };
  };

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateResultDTO {
  type: string;
  score: number;
  examId: string;
  studentId: string;
}

export type UpdateResultDTO = Partial<CreateResultDTO>;
