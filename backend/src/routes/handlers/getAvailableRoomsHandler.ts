import { RequestHandler } from "express";
import { getRooms } from "../../utils/roomsUtils";
import { readJsonFile } from "../../utils/fileUtils";
import path from "path";
import { validateTimeRange } from "../../utils/validationUtils";
import { isRoomAvailable } from "../../utils/roomUtils";
import { Room } from "../../types/room";

const bookingsFilePath = path.join(__dirname, "../../data/bookings.json");

const getAvailableRoomsHandler: RequestHandler = (req, res, next) => {
  try {
    const { startTime, endTime } = req.query;
    const validationError = validateTimeRange(
      startTime as string,
      endTime as string
    );

    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    const rooms = getRooms();
    const bookings = readJsonFile(bookingsFilePath) || [];
    const start = new Date(startTime as string);
    const end = new Date(endTime as string);

    const availableRooms = rooms.filter((room: Room) =>
      isRoomAvailable(room, bookings, start, end)
    );

    if (availableRooms.length === 0) {
      res
        .status(404)
        .json({ message: "No rooms available for the specified time range." });
      return;
    }

    res.status(200).json({ rooms: availableRooms });
  } catch (error) {
    next(error);
  }
};

export default getAvailableRoomsHandler;
