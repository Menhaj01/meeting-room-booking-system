import { getRooms } from "./getRooms";
import { readJsonFile } from "../utils/fileUtils";
import { Room, Booking } from "../types/room";
import { BOOKINGS_PATH } from "../constants/paths";
import {
  generateTimeSlots,
  filterBookingsForRoomAndDate,
  getBookedTimes,
} from "../utils/timeUtils";

interface AvailableTimesResponse {
  error?: boolean;
  status?: number;
  message?: string;
  data?: {
    roomId: string;
    roomName: string;
    availableTimes: string[];
  };
}

export const getAvailableTimes = async (
  roomId: string,
  date: string
): Promise<AvailableTimesResponse> => {
  try {
    const rooms = getRooms();
    const bookings: Booking[] = await readJsonFile(BOOKINGS_PATH);
    const timeSlots = generateTimeSlots();

    const room = rooms.find((r: Room) => r.id === roomId);
    if (!room) {
      return { error: true, status: 404, message: "Room not found" };
    }

    const roomBookings = filterBookingsForRoomAndDate(bookings, roomId, date);
    const bookedTimes = getBookedTimes(roomBookings);
    const availableTimes = timeSlots.filter((time) => !bookedTimes.has(time));

    return { data: { roomId: room.id, roomName: room.name, availableTimes } };
  } catch (error) {
    throw error;
  }
};
