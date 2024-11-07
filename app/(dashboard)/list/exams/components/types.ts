export interface Exam {
  id: string;
  subject: string;
  class: string;
  teacher: {
    id: string;
    name: string;
  };
  date: string;
}

export const INITIAL_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
