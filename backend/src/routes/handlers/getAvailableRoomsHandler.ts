import { RequestHandler } from "express";
import { getRooms } from "../../utils/roomsUtils";
import { readJsonFile } from "../../utils/fileUtils";
import path from "path";
import { Room, Booking } from "../../types/room";

const bookingsFilePath = path.join(__dirname, "../../data/bookings.json");

const getAvailableRoomsHandler: RequestHandler = (req, res, next) => {
  try {
    const rooms = getRooms();
    const bookings: Booking[] = readJsonFile(bookingsFilePath) || [];
    const { startTime, endTime } = req.query;
    if (!startTime || !endTime) {
      res.status(400).json({
        message: "Both startTime and endTime are required.",
      });
      return;
    }
    const start = new Date(startTime as string);
    const end = new Date(endTime as string);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400).json({
        message: "Both startTime and endTime must be valid ISO date strings.",
      });
      return;
    }
    if (start >= end) {
      res.status(400).json({
        message: "startTime must be less than endTime.",
      });
      return;
    }

    const availableRooms = rooms.filter((room: Room) => {
      const isRoomBooked = bookings.some((booking: Booking) => {
        const bookingStart = new Date(booking.startTime);
        const bookingEnd = new Date(booking.endTime);

        const isBooked =
          booking.roomName === room.name &&
          start < bookingEnd &&
          end > bookingStart;

        return isBooked;
      });

      return !isRoomBooked;
    });

    if (availableRooms.length === 0) {
      res.status(404).json({
        message: "No rooms available for the specified time range.",
        rooms: availableRooms,
      });
      return;
    }
    res.status(200).json({ rooms: availableRooms });
  } catch (error) {
    next(error);
  }
};

export default getAvailableRoomsHandler;
