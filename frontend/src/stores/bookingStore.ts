import { defineStore } from 'pinia';

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: [] as any[],
  }),
  actions: {
    async fetchBookings() {
      const response = await fetch('/bookings.json');
      const data = await response.json();
      this.bookings = data.bookings;
    },
    bookRoom(roomId: string, startTime: string, endTime: string) {
      const booking = {
        roomId,
        startTime,
        endTime,
      };
      this.bookings.push(booking);
    },
  },
});
