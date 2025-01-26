export interface Booking {
  roomName: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}

export interface Room {
  name: string;
  description: string;
  capacity: number;
  equipements: { name: string }[];
  createdAt: string;
  updatedAt: string;
}
