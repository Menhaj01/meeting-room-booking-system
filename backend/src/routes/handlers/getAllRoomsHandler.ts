import { RequestHandler } from "express";
import { getRooms } from "../../utils/roomsUtils";

const getAllRoomsHandler: RequestHandler = (req, res, next) => {
  try {
    const rooms = getRooms();
    res.status(200).json({ rooms });
  } catch (error) {
    next(error);
  }
};

export default getAllRoomsHandler;
