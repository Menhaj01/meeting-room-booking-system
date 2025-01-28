import { Router } from "express";
import createBookingHandler from "./handlers/createBookingHandler";
import getAllRoomsHandler from "./handlers/getAllRoomsHandler";
import getAvailableRoomsHandler from "./handlers/getAvailableRoomsHandler";
import getAvailableTimesForRoomOnDate from "./handlers/getAvailableTimesForRoomOnDate";

const router = Router();

// Register routes
router.post("/rooms/booking", createBookingHandler);
router.get("/rooms/all", getAllRoomsHandler);
router.get("/rooms/available", getAvailableRoomsHandler);
router.get(
  "/rooms/:roomId/availableTimes/:date",
  getAvailableTimesForRoomOnDate
);
export default router;
