import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchAvailableTimes = async (
  roomId: string,
  selectedDate: string,
) => {
  try {
    const response = await axios.get(
      `${API_URL}/rooms/${roomId}/availableTimes/${selectedDate}`,
    );
    return response.data.availableTimes;
  } catch (error) {
    console.error('Error fetching available times:', error);
    throw error;
  }
};
