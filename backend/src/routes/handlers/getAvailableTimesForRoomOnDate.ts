import { RequestHandler } from "express";
import { getAvailableTimes } from "../../services/roomService";
import { createErrorResponse } from "../../utils/errorUtils";

const getAvailableTimesForRoomOnDate: RequestHandler = async (
  req,
  res,
  next
) => {
  const { roomId, date } = req.params;

  if (!roomId?.trim() || !date?.trim()) {
    res
      .status(400)
      .json(createErrorResponse("Missing roomId or date parameter"));
    return;
  }

  try {
    const result = await getAvailableTimes(roomId, date);

    if (result.error) {
      res
        .status(result.status || 500)
        .json(createErrorResponse(result.message || "An error occurred"));
      return;
    }

    res.status(200).json(result.data);
  } catch (error) {
    next(error);
  }
};

export default getAvailableTimesForRoomOnDate;
