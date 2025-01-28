import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

interface Booking {
  roomName: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}
export const createBooking = async (
  roomName: string,
  startTime: string,
  endTime: string,
): Promise<Booking> => {
  try {
    const response = await axios.post(`${API_URL}/rooms/booking`, {
      roomName,
      startTime,
      endTime,
    });
    return response.data.booking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};
