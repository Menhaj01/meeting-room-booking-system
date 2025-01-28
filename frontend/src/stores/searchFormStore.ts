import { defineStore } from 'pinia';

export const useSearchFormStore = defineStore('searchFormStore', {
  state: () => ({
    selectedDate: '',
    startTime: '',
    endTime: '',
    isLoading: false,
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
