import axios from 'axios';

export const getRooms = async () => {
  try {
    const response = await axios.get('http://localhost:3000');
    return response.data; // Assuming the response contains the rooms data
  } catch (error: unknown) {
    // Type assertion: Assume the error is an AxiosError
    if (axios.isAxiosError(error)) {
      console.error(
        'Error fetching rooms:',
        error.response ? error.response.data : error.message,
      );
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; // Rethrow or handle accordingly
  }
};
