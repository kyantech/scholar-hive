import { Sex } from '@prisma/client';

export interface Student {
  id: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  grade: string;
  class: {
    id: string;
    name: string;
  };
  address: string;
  password: string;
  bloodType: 'A+' | 'O+' | 'B+' | 'AB+' | 'A-' | 'O-' | 'B-' | 'AB-';
  birthday: Date;
  sex: Sex;
}

export const INITIAL_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
