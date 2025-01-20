export interface Equipment {
  name: string;
}

export interface Room {
  name: string;
  description: string;
  capacity: number;
  equipements: Equipment[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id?: string;
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}
