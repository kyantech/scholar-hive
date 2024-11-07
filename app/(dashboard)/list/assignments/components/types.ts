export interface Assignment {
  id: string;
  subject: string;
  class: string;
  teacher: {
    id: string;
    name: string;
  };
  dueDate: string;
}

export const INITIAL_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
