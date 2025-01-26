import axios, { type AxiosResponse } from 'axios';
import { type Room } from '../types/room';

const API_BASE_URL = 'http://localhost:3000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all rooms data from the backend
export const getRooms = async (): Promise<Room[]> => {
  try {
    const response: AxiosResponse<{ rooms: Room[] }> =
      await api.get('/rooms/all');
    return response.data.rooms; // Return the rooms data
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error; // Propagate error
  }
};

// Fetch available rooms based on startTime and endTime
export const fetchAvailableRooms = async (
  startTime: string,
  endTime: string,
): Promise<Room[]> => {
  try {
    const response: AxiosResponse<{ rooms: Room[] }> = await api.get(
      '/rooms/available',
      {
        params: {
          startTime,
          endTime,
        },
      },
    );
    return response.data.rooms; // Return the available rooms data
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    throw error; // Propagate error
  }
};
