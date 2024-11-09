export interface SubjectResponse {
  id: string;
  name: string;
  teachers: {
    id: string;
    name: string;
    email: string;
    teacherDetails: {
      subjects: {
        id: string;
        name: string;
      }[];
      classes: {
        id: string;
        name: string;
      }[];
    };
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubjectDTO {
  name: string;
  teacherIds?: string[];
}

export type UpdateSubjectDTO = CreateSubjectDTO;
