export interface Competition {
  id: number;
  image: string;
  gender: string;
  grade: string;
  price: number;
  title: string;
  description: string;
  prize: string;
  participants: number;
  official: boolean;
  path: string;
  images: string[];
  contact: string[];
}
