import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { Room, Booking } from '../types/room';

const API_URL = 'http://localhost:3000/api';

export const useBookingStore = defineStore('booking', () => {
  const rooms = ref<Room[]>([]);
  const bookings = ref<Booking[]>([]);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  async function fetchRooms() {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await axios.get(`${API_URL}/rooms`);
      console.log('response------>>>', response);
      rooms.value = response.data;
    } catch (err: any) {
      error.value = 'Failed to fetch rooms';
      throw new Error(err.response?.data?.error || 'Failed to fetch rooms');
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchBookings() {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await axios.get(`${API_URL}/bookings`);
      bookings.value = response.data;
    } catch (err: any) {
      error.value = 'Failed to fetch bookings';
      throw new Error(err.response?.data?.error || 'Failed to fetch bookings');
    } finally {
      isLoading.value = false;
    }
  }

  function isRoomAvailable(
    roomId: string,
    date: string,
    startTime: string,
    endTime: string,
  ): boolean {
    return !bookings.value.some(
      (booking) =>
        booking.roomId === roomId &&
        booking.date === date &&
        ((booking.startTime <= startTime && booking.endTime > startTime) ||
          (booking.startTime < endTime && booking.endTime >= endTime)),
    );
  }

  function getAvailableRooms(
    date: string,
    startTime: string,
    endTime: string,
  ): Room[] {
    if (!date || !startTime || !endTime) {
      return rooms.value;
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (start >= end) {
      error.value = 'End time must be after start time';
      return [];
    }

    return rooms.value.filter((room) =>
      isRoomAvailable(room.name, date, startTime, endTime),
    );
  }

  async function bookRoom(
    roomId: string,
    date: string,
    startTime: string,
    endTime: string,
  ) {
    try {
      isLoading.value = true;
      error.value = null;

      const start = new Date(`${date}T${startTime}`);
      const end = new Date(`${date}T${endTime}`);

      if (start >= end) {
        throw new Error('End time must be after start time');
      }

      if (!isRoomAvailable(roomId, date, startTime, endTime)) {
        throw new Error('Room is not available for the selected time slot');
      }

      const response = await axios.post(`${API_URL}/bookings`, {
        roomId,
        date,
        startTime,
        endTime,
      });

      await fetchBookings();
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || err.message || 'Failed to book room';
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      isLoading.value = false;
    }
  }

  // Initialize store
  Promise.all([fetchRooms(), fetchBookings()]).catch(() => {
    error.value = 'Failed to initialize data';
  });

  return {
    rooms,
    bookings,
    error,
    isLoading,
    fetchRooms,
    fetchBookings,
    getAvailableRooms,
    bookRoom,
  };
});
