import { defineStore } from 'pinia';
import { type Room } from '../types/room';

const defaultRoom: Room = {
  id: '',
  name: '',
  description: '',
  capacity: 0,
  equipements: [],
  createdAt: '',
  updatedAt: '',
};
export const useBookingStore = defineStore('bookingStore', {
  state: () => ({
    name: '',
    selectedRoom: defaultRoom,
    selectedDate: '',
    startTime: '',
    endTime: '',
    showModal: false,
  }),
  actions: {
    setSelectedRoom(room: Room) {
      this.selectedRoom = room;
    },
    setDate(date: string) {
      console.log('Updating date:', date);
      this.selectedDate = date;
    },
    setStartTime(time: string) {
      this.startTime = time;
    },
    setEndTime(time: string) {
      this.endTime = time;
    },
    toggleModal(isOpen: boolean) {
      this.showModal = isOpen;
    },
    reset() {
      this.selectedRoom = defaultRoom;
      this.selectedDate = '';
      this.startTime = '';
      this.endTime = '';
      this.showModal = false; // Close modal on reset
    },
  },
});
