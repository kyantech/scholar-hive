import { Sex } from '@prisma/client';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  photo: string;
  subjects: {
    id: string;
    name: string;
  }[];
  classes: {
    id: string;
    name: string;
  }[];
  phone: string;
  address: string;
  password: string;
  bloodType: 'A+' | 'O+' | 'B+' | 'AB+' | 'A-' | 'O-' | 'B-' | 'AB-';
  birthday: Date;
  sex: Sex;
}

export const INITIAL_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
