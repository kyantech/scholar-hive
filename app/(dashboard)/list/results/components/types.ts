export interface Result {
  id: string;
  subject: {
    id: string;
    name: string;
  };
  class: {
    id: string;
    name: string;
  };
  teacher: {
    id: string;
    name: string;
  };
  student: {
    id: string;
    name: string;
  };
  date: string;
  score: number;
}

export const INITIAL_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
