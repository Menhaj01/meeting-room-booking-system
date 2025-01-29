import { Booking } from "../types/room";

// Generates time slots from 09:00 to 18:00
export const generateTimeSlots = (): string[] => {
  return Array.from({ length: 10 }, (_, i) => {
    const hour = i + 9;
    return `${hour < 10 ? "0" : ""}${hour}:00`;
  });
};

// Filters bookings for a specific room and date
export const filterBookingsForRoomAndDate = (
  bookings: Booking[],
  roomId: string,
  date: string
): Booking[] => {
  const queryDate = new Date(date).toISOString().split("T")[0];
  return bookings.filter((booking: Booking) => {
    const bookingDate = new Date(booking.startTime).toISOString().split("T")[0];
    return booking.roomId === roomId && bookingDate === queryDate;
  });
};

// Returns a set of booked times based on room bookings
export const getBookedTimes = (roomBookings: Booking[]): Set<string> => {
  const bookedTimes = new Set<string>();

  roomBookings.forEach((booking: Booking) => {
    const startTime = new Date(booking.startTime);
    const endTime = new Date(booking.endTime);
    let currentTime = startTime;

    while (currentTime <= endTime) {
      const time = `${
        currentTime.getUTCHours() < 10 ? "0" : ""
      }${currentTime.getUTCHours()}:00`;
      bookedTimes.add(time);
      currentTime.setUTCHours(currentTime.getUTCHours() + 1);
    }
  });

  return bookedTimes;
};
