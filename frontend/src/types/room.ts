export type Room = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  equipements: { name: string }[];
  createdAt: string;
  updatedAt: string;
};
