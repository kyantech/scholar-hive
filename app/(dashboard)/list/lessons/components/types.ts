export interface Lesson {
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
}

export const INITIAL_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
