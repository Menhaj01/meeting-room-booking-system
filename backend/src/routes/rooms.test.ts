import request from "supertest";
import express from "express";
import fs from "fs";
import router from "./rooms";

jest.mock("fs");

const mockRooms = {
  rooms: [
    { name: "Room 1", capacity: 10 },
    { name: "Room 2", capacity: 20 },
  ],
};

describe("Rooms API", () => {
  const app = express();
  app.use(express.json());
  app.use("/api/rooms", router);

  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(
      JSON.stringify(mockRooms)
    );
  });

  describe("GET /api/rooms", () => {
    it("should return a list of rooms", async () => {
      const response = await request(app).get("/api/rooms");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockRooms.rooms);
    });
  });

  describe("POST /api/rooms/book", () => {
    it("should create a booking and return a success message", async () => {
      const newBooking = {
        roomName: "Room 1",
        date: "2025-01-17",
        startTime: "09:00",
        endTime: "10:00",
      };

      const response = await request(app)
        .post("/api/rooms/book")
        .send(newBooking);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Booking created successfully");
      expect(response.body.booking).toHaveProperty("id");
      expect(response.body.booking.roomName).toBe(newBooking.roomName);
    });
  });
});
