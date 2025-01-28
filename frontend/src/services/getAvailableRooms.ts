import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchAvailableRooms = async (
  startTime: string,
  endTime: string,
) => {
  try {
    const response = await axios.get(`${API_URL}/rooms`, {
      params: {
        startTime,
        endTime,
      },
    });
    return response.data.rooms;
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    throw error;
  }
};
