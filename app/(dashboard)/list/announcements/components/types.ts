export interface Announcement {
  id: string;
  title: string;
  description: string;
  class: {
    id: string;
    name: string;
  };
  date: string;
}

export const INITIAL_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
