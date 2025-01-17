import { defineStore } from "pinia";

interface Room {
  name: string;
  description: string;
  capacity: number;
  equipements: { name: string }[];
}

export const useRoomsStore = defineStore("rooms", {
  state: () => ({
    rooms: [] as Room[],
  }),
  actions: {
    setRooms(newRooms: Room[]) {
      this.rooms = newRooms;
    },
  },
});
