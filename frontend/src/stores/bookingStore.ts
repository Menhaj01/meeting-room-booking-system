// stores/bookingStore.ts
import { defineStore } from 'pinia';

export const useBookingStore = defineStore('booking', {
  state: () => ({
    selectedDate: '',
    startTime: '',
    endTime: '',
    isLoading: false, // For UI states like loading
  }),
  actions: {
    setDate(date: string) {
      this.selectedDate = date;
    },
    setStartTime(time: string) {
      this.startTime = time;
    },
    setEndTime(time: string) {
      this.endTime = time;
    },
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },
  },
});
