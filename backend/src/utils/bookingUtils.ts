import { Booking } from "../types/room";

export const validateBookingRequest = (
  roomName: string,
  startTime: string,
  endTime: string
): string | null => {
  if (!roomName || !startTime || !endTime) {
    return "Missing roomName, startTime, or endTime";
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "Both startTime and endTime must be valid ISO date strings.";
  }

  if (start >= end) {
    return "startTime must be earlier than endTime.";
  }

  return null;
};

export const checkBookingConflict = (
  bookings: Booking[],
  roomName: string,
  startTime: string,
  endTime: string
): boolean => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  return bookings.some(
    (booking) =>
      booking.roomName === roomName &&
      ((start >= new Date(booking.startTime) &&
        start < new Date(booking.endTime)) ||
        (end > new Date(booking.startTime) &&
          end <= new Date(booking.endTime)) ||
        (start <= new Date(booking.startTime) &&
          end >= new Date(booking.endTime)))
  );
};
