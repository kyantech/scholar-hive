import { BloodType, Sex } from '@prisma/client';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  photo?: string | null;
  phone?: string | null;
  address?: string | null;
  bloodType: BloodType;
  birthday: Date;
  sex: Sex;
  role: 'teacher';
  hashedPassword: string;
  teacherDetails: {
    id: string;
    subjects: {
      id: string;
      name: string;
    }[];
    classes: {
      id: string;
      name: string;
    }[];
  };
}

export interface CreateTeacherDTO {
  name: string;
  email: string;
  password: string;
  photo?: string;
  phone?: string;
  address?: string;
  bloodType: BloodType;
  birthday: Date;
  sex: Sex;
  subjects: string[];
  classes?: string[];
}

export type UpdateTeacherDTO = Partial<Omit<CreateTeacherDTO, 'email'>>;

export type TeacherResponse = Omit<Teacher, 'hashedPassword'>;
