// src/stores/booking.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getRooms } from '../services/api'; // Import the api service

export const useBookingStore = defineStore('booking', () => {
  const rooms = ref([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Fetch rooms from the backend
  const fetchRooms = async () => {
    isLoading.value = true;
    try {
      rooms.value = await getRooms();
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Handle error with known type 'Error'
        error.value = err.message;
      } else {
        // Handle unexpected error types
        error.value = 'An unexpected error occurred';
      }
    } finally {
      isLoading.value = false;
    }
  };

  const getAvailableRooms = (
    selectedDate: string,
    startTime: string,
    endTime: string,
  ) => {
    // You can implement your filtering logic here to return available rooms
    return rooms.value.filter((room) => {
      // Implement your filtering logic based on selectedDate, startTime, and endTime
      return true; // Example: return all rooms (you can enhance this logic)
    });
  };

  return {
    rooms,
    isLoading,
    error,
    fetchRooms,
    getAvailableRooms,
  };
});
