export interface Parent {
  id: string;
  name: string;
  email: string;
  students: {
    id: string;
    name: string;
  }[];
  phone: string;
  address: string;
  photo: string;
}
