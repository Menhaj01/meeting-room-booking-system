import { RequestHandler } from "express";
import { readJsonFile, writeJsonFile } from "../../utils/fileUtils";
import path from "path";
import { getRooms } from "../../utils/roomsUtils";
import { Booking, Room } from "../../types/room";
import { v4 as uuidv4 } from "uuid";

const bookingsFilePath = path.join(__dirname, "../../data/bookings.json");

const createBooking: RequestHandler = (req, res): void => {
  try {
    const { roomName, startTime, endTime } = req.body;
    if (!roomName || !startTime || !endTime) {
      res
        .status(400)
        .json({ message: "Missing roomName, startTime, or endTime" });
      return;
    }
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400).json({
        message: "Both startTime and endTime must be valid ISO date strings.",
      });
      return;
    }
    if (start >= end) {
      res.status(400).json({
        message: "startTime must be earlier than endTime.",
      });
      return;
    }
    const rooms = getRooms();
    const room = rooms.find((r: Room) => r.name === roomName);

    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }
    const bookings = readJsonFile(bookingsFilePath) || [];
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
    const newBooking: Booking = {
      id: uuidv4(),
      roomId: room.id,
      roomName,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    writeJsonFile(bookingsFilePath, bookings);
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
