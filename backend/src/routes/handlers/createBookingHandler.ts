import { RequestHandler } from "express";
import { readJsonFile, writeJsonFile } from "../../utils/fileUtils";
import path from "path";
import { getRooms } from "../../utils/roomsUtils";
import { Booking, Room } from "../../types/room";

const bookingsFilePath = path.join(__dirname, "../../data/bookings.json");

const createBooking: RequestHandler = (req, res): void => {
  try {
    const { roomName, startTime, endTime } = req.body;

    // Validate request body parameters
    if (!roomName || !startTime || !endTime) {
      res
        .status(400)
        .json({ message: "Missing roomName, startTime, or endTime" });
      return;
    }

    // Parse startTime and endTime to Date objects
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Validate the date format
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400).json({
        message: "Both startTime and endTime must be valid ISO date strings.",
      });
      return;
    }

    // Check that startTime is before endTime
    if (start >= end) {
      res.status(400).json({
        message: "startTime must be earlier than endTime.",
      });
      return;
    }

    // Check if room exists
    const rooms = getRooms();
    const room = rooms.find((r: Room) => r.name === roomName);

    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    // Read the existing bookings
    const bookings = readJsonFile(bookingsFilePath) || [];

    // Check for booking conflicts (overlapping time)
    const isConflict = bookings.some(
      (booking: Booking) =>
        booking.roomName === roomName &&
        ((start >= new Date(booking.startTime) &&
          start < new Date(booking.endTime)) ||
          (end > new Date(booking.startTime) &&
            end <= new Date(booking.endTime)) ||
          (start <= new Date(booking.startTime) &&
            end >= new Date(booking.endTime)))
    );

    if (isConflict) {
      res
        .status(400)
        .json({ message: "Room is already booked during this time" });
      return;
    }

    // Add the new booking
    const newBooking: Booking = {
      roomName,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    writeJsonFile(bookingsFilePath, bookings);

    // Respond with success message and booking details
    res.status(201).json({
      message: "Room successfully booked",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createBooking;
