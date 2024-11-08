import { Student, Teacher } from '@prisma/client';

export interface Class {
  id: string;
  name: string;
  grade: string;
  capacity: number;
  supervisorId: string;
  supervisor: Teacher;
  teachers: Teacher[];
  students: Student[];
}

export interface CreateClassDTO {
  name: string;
  grade: string;
  capacity: number;
  supervisorId: string;
  teacherIds?: string[];
}

export type UpdateClassDTO = Partial<CreateClassDTO>;

export type ClassResponse = Class;
