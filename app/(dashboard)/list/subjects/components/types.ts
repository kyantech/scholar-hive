export type Teacher = {
  id: string;
  name: string;
};

export interface Subject {
  id: string;
  name: string;
  teachers: Teacher[];
}

export const INITIAL_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
