export interface Houseboat {
  _id: string;
  name: string;
  title: string;
  description?: string;
  location: string;
  beds: number;
  maxPeople: number;
  cutPrice: number | string;
  price: number | string;
  rating: number;
  images: string[];
  capacity: number;
  isAvailable?: boolean;
} 