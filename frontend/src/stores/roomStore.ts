import { defineStore } from 'pinia';
import type { Room } from '../types/room';

export const useRoomStore = defineStore('roomStore', {
  state: () => ({
    availableRooms: [] as Room[],
    availableTimes: [] as string[],
    initialLoading: true,
  }),
  actions: {
    setAvailableRooms(rooms: Room[]) {
      this.availableRooms = rooms;
      this.initialLoading = false;
    },
    setAvailableTimes(times: string[]) {
      this.availableTimes = times;
    },
    setLoading(loading: boolean) {
      this.initialLoading = loading;
    },
  },
});
