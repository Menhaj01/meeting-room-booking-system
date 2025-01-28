export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  equipements: { name: string }[];
  createdAt: string;
  updatedAt: string;
}
