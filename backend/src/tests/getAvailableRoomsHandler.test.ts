import request from "supertest";
import express from "express";
import router from "../routes/rooms";
import * as roomsUtils from "../services/getRooms";
import { readJsonFile } from "../utils/fileUtils";

const app = express();
app.use(express.json());
app.use(router);

jest.mock("../services/getRooms.ts");
jest.mock("../utils/fileUtils");

describe("GET /rooms/available", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test: No query parameters
  it("should return a 400 error if startTime or endTime are missing", async () => {
    const response = await request(app).get("/rooms/available");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Both startTime and endTime are required."
    );
  });

  // Test: Invalid startTime or endTime
  it("should return a 400 error if startTime or endTime are not valid ISO date strings", async () => {
    const response = await request(app)
      .get("/rooms/available")
      .query({ startTime: "invalid-date", endTime: "2025-01-29T12:00:00Z" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Both startTime and endTime must be valid ISO date strings."
    );
  });

  // Test: startTime is greater than or equal to endTime
  it("should return a 400 error if startTime is greater than or equal to endTime", async () => {
    const response = await request(app).get("/rooms/available").query({
      startTime: "2025-01-29T12:00:00Z",
      endTime: "2025-01-29T10:00:00Z",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("startTime must be less than endTime.");
  });

  // Test: Valid request but no available rooms
  it("should return a 404 error if no rooms are available for the specified time range", async () => {
    // Mock the data
    (roomsUtils.getRooms as jest.Mock).mockReturnValue([
      { id: "1", name: "Salle #1" },
      { id: "2", name: "Salle #2" },
    ]);
    (readJsonFile as jest.Mock).mockReturnValue([
      {
        roomId: "1",
        roomName: "Salle #1",
        startTime: "2025-01-29T08:00:00Z",
        endTime: "2025-01-29T10:00:00Z",
      },
      {
        roomId: "2",
        roomName: "Salle #2",
        startTime: "2025-01-29T09:00:00Z",
        endTime: "2025-01-29T18:00:00Z",
      },
    ]);
    const response = await request(app).get("/rooms/available").query({
      startTime: "2025-01-29T09:30:00Z",
      endTime: "2025-01-29T10:30:00Z",
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      "No rooms available for the specified time range."
    );
  });

  // Test: Valid request with available rooms
  it("should return a list of available rooms for the specified time range", async () => {
    // Mock the data
    (roomsUtils.getRooms as jest.Mock).mockReturnValue([
      { id: "1", name: "Salle #1" },
      { id: "2", name: "Salle #2" },
    ]);
    (readJsonFile as jest.Mock).mockReturnValue([
      {
        roomId: "1",
        roomName: "Salle #1",
        startTime: "2025-01-29T08:00:00Z",
        endTime: "2025-01-29T10:00:00Z",
      },
      {
        roomId: "2",
        roomName: "Salle #2",
        startTime: "2025-01-29T09:00:00Z",
        endTime: "2025-01-29T18:00:00Z",
      },
    ]);

    const response = await request(app).get("/rooms/available").query({
      startTime: "2025-01-29T10:00:00Z",
      endTime: "2025-01-29T12:00:00Z",
    });

    expect(response.status).toBe(200);
    expect(response.body.rooms.length).toBe(1);
    expect(response.body.rooms[0].name).toBe("Salle #1");
  });
});
