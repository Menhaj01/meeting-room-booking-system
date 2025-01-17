import { defineStore } from 'pinia';

export const useRoomsStore = defineStore('rooms', {
  state: () => ({
    rooms: [] as any[],
    bookings: [] as any[],
  }),
  actions: {
    async loadRooms() {
      const response = await fetch('/rooms.json');
      const data = await response.json();
      this.rooms = data.rooms;
    },
  },
});
