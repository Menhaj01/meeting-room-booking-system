import { Router } from "express";
import createBookingHandler from "./handlers/createBookingHandler";
import getAllRoomsHandler from "./handlers/getAllRoomsHandler";
import getAvailableRoomsHandler from "./handlers/getAvailableRoomsHandler";

const router = Router();

// Register routes
router.post("/rooms/booking", createBookingHandler);
router.get("/rooms/all", getAllRoomsHandler);
router.get("/rooms/available", getAvailableRoomsHandler);

export default router;
