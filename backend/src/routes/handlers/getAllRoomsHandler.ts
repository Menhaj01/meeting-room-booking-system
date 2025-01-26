import { RequestHandler } from "express";
import { getRooms } from "../../utils/roomsUtils";

const getAllRoomsHandler: RequestHandler = (req, res, next) => {
  try {
    const rooms = getRooms(); // Fetch all rooms
    res.status(200).json({ rooms }); // Return all rooms
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

export default getAllRoomsHandler;
