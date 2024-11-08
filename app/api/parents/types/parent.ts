import { BloodType, Sex } from '@prisma/client';

export interface Parent {
  id: string;
  name: string;
  email: string;
  photo?: string | null;
  phone?: string | null;
  address?: string | null;
  bloodType: BloodType;
  birthday: Date;
  sex: Sex;
  role: 'parent';
  hashedPassword: string;
  parentDetails: {
    id: string;
    students: Array<{
      id: string;
      name: string;
      email: string;
      studentDetails: {
        id: string;
        grade: string;
        class: {
          id: string;
          name: string;
        };
      };
    }>;
  };
}

export interface CreateParentDTO {
  name: string;
  email: string;
  password: string;
  photo?: string;
  phone?: string;
  address?: string;
  bloodType: BloodType;
  birthday: Date;
  sex: Sex;
  studentIds: string[];
}

export type UpdateParentDTO = Partial<Omit<CreateParentDTO, 'email'>>;

export type ParentResponse = Omit<Parent, 'hashedPassword'>;
