export interface Class {
  id: string;
  name: string;
  capacity: number;
  grade: string;
  supervisor: {
    id: string;
    name: string;
  };
}

export const INITIAL_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
