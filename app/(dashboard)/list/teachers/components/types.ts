export interface Teacher {
  id: string;
  name: string;
  email: string;
  photo: string;
  teacherId: string;
  subjects: string[];
  classes: string[];
  phone: string;
  address: string;
}

export const INITIAL_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
