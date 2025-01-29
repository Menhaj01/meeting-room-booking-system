import { Booking, Room } from "../types/room";

export const isRoomAvailable = (
  room: Room,
  bookings: Booking[],
  start: Date,
  end: Date
): boolean => {
  return !bookings.some((booking: Booking) => {
    const bookingStart = new Date(booking.startTime);
    const bookingEnd = new Date(booking.endTime);

    return (
      booking.roomId === room.id && start < bookingEnd && end > bookingStart
    );
  });
};
