import request from "supertest";
import express from "express";
import createBooking from "../routes/handlers/createBookingHandler";
import * as fileUtils from "../utils/fileUtils";
import * as roomsUtils from "../services/getRooms";
import * as bookingUtils from "../utils/bookingUtils";
import { Booking, Room } from "../types/room";

const app = express();
app.use(express.json());
app.post("/rooms/booking", createBooking);

describe("POST /rooms/booking", () => {
  let mockRooms: Room[];
  let mockBookings: Booking[];

  beforeEach(() => {
    mockRooms = [
      {
        id: "1",
        name: "Salle #1",
        description: "Salle #1",
        capacity: 5,
        equipements: [
          {
            name: "TV",
          },
          {
            name: "Retro Projecteur",
          },
        ],
        createdAt: "2016-12-07T12:39:29.812Z",
        updatedAt: "2016-12-08T17:31:39.489Z",
      },
    ];
    mockBookings = [];
    jest.spyOn(roomsUtils, "getRooms").mockReturnValue(mockRooms);
    jest.spyOn(fileUtils, "readJsonFile").mockReturnValue(mockBookings);
    jest.spyOn(fileUtils, "writeJsonFile").mockImplementation(() => {});
    jest.spyOn(bookingUtils, "checkBookingConflict").mockReturnValue(false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a booking successfully", async () => {
    const response = await request(app).post("/rooms/booking").send({
      roomName: "Salle #1",
      startTime: "2024-02-01T10:00:00.000Z",
      endTime: "2024-02-01T11:00:00.000Z",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Room successfully booked");
    expect(response.body.booking).toHaveProperty("id");
  });

  it("should return 400 for missing fields", async () => {
    const response = await request(app).post("/rooms/booking").send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Missing roomName, startTime, or endTime"
    );
  });

  it("should return 404 if the room does not exist", async () => {
    jest.spyOn(roomsUtils, "getRooms").mockReturnValue([]);
    const response = await request(app).post("/rooms/booking").send({
      roomName: "Salle #1",
      startTime: "2024-02-01T10:00:00.000Z",
      endTime: "2024-02-01T11:00:00.000Z",
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Room not found");
  });

  it("should return 400 if the room is already booked", async () => {
    jest.spyOn(bookingUtils, "checkBookingConflict").mockReturnValue(true);
    const response = await request(app).post("/rooms/booking").send({
      roomName: "Salle #1",
      startTime: "2024-02-01T10:00:00.000Z",
      endTime: "2024-02-01T11:00:00.000Z",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Room is already booked during this time"
    );
  });
});
