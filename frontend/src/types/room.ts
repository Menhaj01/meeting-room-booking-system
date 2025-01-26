export interface Equipment {
  name: string;
}

export type Room = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  equipements: { name: string }[];
  createdAt: string;
  updatedAt: string;
};

export interface Booking {
  id?: string;
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}
