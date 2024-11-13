export interface AssignmentResponse {
  id: string;
  dueDate: Date;
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

export interface CreateAssignmentDTO {
  dueDate: Date;
  subjectId: string;
  classId: string;
  teacherId: string;
}

export type UpdateAssignmentDTO = Partial<CreateAssignmentDTO>;
