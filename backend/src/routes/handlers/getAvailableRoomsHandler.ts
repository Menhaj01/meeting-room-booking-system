import { RequestHandler } from "express";
import { getRooms } from "../../utils/roomsUtils";
import { readJsonFile } from "../../utils/fileUtils";
import path from "path";
import { Room, Booking } from "../../types/room";

// Paths to JSON data files
const bookingsFilePath = path.join(__dirname, "../../data/bookings.json");

const getAvailableRoomsHandler: RequestHandler = (req, res, next) => {
  try {
    const rooms = getRooms(); // Fetch all rooms
    const bookings: Booking[] = readJsonFile(bookingsFilePath) || [];

    // Get startTime and endTime from query parameters
    const { startTime, endTime } = req.query;

    // Error if both startTime and endTime are not provided
    if (!startTime || !endTime) {
      res.status(400).json({
        message: "Both startTime and endTime are required.",
      });
      return;
    }

    // Parse startTime and endTime to Date objects
    const start = new Date(startTime as string);
    const end = new Date(endTime as string);

    // Check if the parsed dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400).json({
        message: "Both startTime and endTime must be valid ISO date strings.",
      });
      return;
    }

    // Error if startTime is greater than or equal to endTime
    if (start >= end) {
      res.status(400).json({
        message: "startTime must be less than endTime.",
      });
      return;
    }

    // Filter rooms based on availability
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

      return !isRoomBooked; // Room is available if not booked
    });

    // If no rooms are available, return a 404 status with a message
    if (availableRooms.length === 0) {
      res.status(404).json({
        message: "No rooms available for the specified time range.",
        rooms: availableRooms,
      });
      return;
    }

    // Respond with available rooms
    res.status(200).json({ rooms: availableRooms });
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

export default getAvailableRoomsHandler;
