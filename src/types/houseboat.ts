export interface Houseboat {
  _id: string;
  name: string;
  title: string;
  description?: string;
  location: string;
  beds: number;
  maxPeople: number;
  price: number;
  rating: number;
  images: string[];
  capacity: number;
  isAvailable?: boolean;
} 