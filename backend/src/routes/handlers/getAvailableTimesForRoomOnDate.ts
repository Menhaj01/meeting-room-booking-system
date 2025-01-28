import { RequestHandler } from "express";
import { getRooms } from "../../utils/roomsUtils";
import { readJsonFile } from "../../utils/fileUtils";
import path from "path";
import { Room, Booking } from "../../types/room";

const bookingsFilePath = path.join(__dirname, "../../data/bookings.json");

const getAvailableTimesForRoomOnDate: RequestHandler = (req, res, next) => {
  try {
    const { roomId, date } = req.params;
    if (!roomId || !date) {
      res.status(400).json({ message: "Missing roomId or date parameter" });
      return;
    }

    const rooms = getRooms();
    const bookings: Booking[] = readJsonFile(bookingsFilePath) || [];
    const timeSlots = Array.from({ length: 10 }, (_, i) => {
      const hour = i + 9;
      return `${hour < 10 ? "0" : ""}${hour}:00`;
    });

    const room = rooms.find((r: Room) => r.id === roomId);

    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    const roomBookings = bookings.filter((booking: Booking) => {
      const bookingDate = new Date(booking.startTime)
        .toISOString()
        .split("T")[0];
      const queryDate = new Date(date).toISOString().split("T")[0];
      return booking.roomId === roomId && bookingDate === queryDate;
    });

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

    const availableTimes = timeSlots.filter((time) => !bookedTimes.has(time));

    res.status(200).json({
      roomId: room.id,
      roomName: room.name,
      availableTimes,
    });
  } catch (error) {
    next(error);
  }
};

export default getAvailableTimesForRoomOnDate;
