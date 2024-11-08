import { BloodType, Sex } from '@prisma/client';

export interface Student {
  id: string;
  name: string;
  email: string;
  photo?: string | null;
  phone?: string | null;
  address?: string | null;
  bloodType: BloodType;
  birthday: Date;
  sex: Sex;
  role: 'student';
  hashedPassword: string;
  studentDetails: {
    id: string;
    grade: string;
    class: {
      id: string;
      name: string;
    };
  };
}

export interface CreateStudentDTO {
  name: string;
  email: string;
  password: string;
  photo?: string;
  phone?: string;
  address?: string;
  bloodType: BloodType;
  birthday: Date;
  sex: Sex;
  grade: string;
  classId: string;
}

export type UpdateStudentDTO = Partial<Omit<CreateStudentDTO, 'email'>>;

export type StudentResponse = Omit<Student, 'hashedPassword'>;
