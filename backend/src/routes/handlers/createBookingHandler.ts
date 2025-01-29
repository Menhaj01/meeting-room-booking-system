import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { readJsonFile, writeJsonFile } from "../../utils/fileUtils";
import { getRooms } from "../../utils/roomsUtils";
import {
  validateBookingRequest,
  checkBookingConflict,
} from "../../utils/bookingUtils";
import { Booking, Room } from "../../types/room";

const bookingsFilePath: string = path.join(
  __dirname,
  "../../data/bookings.json"
);

const createBooking: RequestHandler = (req, res): void => {
  try {
    const {
      roomName,
      startTime,
      endTime,
    }: { roomName: string; startTime: string; endTime: string } = req.body;
    const error: string | null = validateBookingRequest(
      roomName,
      startTime,
      endTime
    );
    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    const rooms: Room[] = getRooms();
    const room: Room | undefined = rooms.find(({ name }) => name === roomName);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    const bookings: Booking[] = readJsonFile(bookingsFilePath) || [];
    if (checkBookingConflict(bookings, roomName, startTime, endTime)) {
      res
        .status(400)
        .json({ message: "Room is already booked during this time" });
      return;
    }

    const newBooking: Booking = {
      id: uuidv4(),
      roomId: room.id,
      roomName,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      createdAt: new Date().toISOString(),
    };

    writeJsonFile(bookingsFilePath, [...bookings, newBooking]);
    res
      .status(201)
      .json({ message: "Room successfully booked", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createBooking;
