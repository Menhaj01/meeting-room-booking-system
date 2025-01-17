import { Router, Request, Response } from "express";
import fs from "fs";

const getRooms = () => {
  const data = fs.readFileSync("src/data/bookings.json", "utf-8");
  return JSON.parse(data).rooms;
};

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const rooms = getRooms(); // Read rooms data from the file
  res.status(200).json(rooms);
});

router.post("/book", (req: Request, res: Response) => {
  const { roomName, date, startTime, endTime } = req.body;

  const booking = {
    roomName,
    date,
    startTime,
    endTime,
    id: Math.floor(Math.random() * 1000),
  };

  res.status(201).json({ message: "Booking created successfully", booking });
});

export default router;
