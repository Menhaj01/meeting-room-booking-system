import request from "supertest";
import express from "express";
import router from "../routes/rooms";
import { getRooms } from "../utils/roomsUtils";

jest.mock("../utils/roomsUtils");

// Create test app
const app = express();
app.use(express.json());
app.use(router);

// Error handling middleware to simulate production setup
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

describe("GET /rooms/all", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test: Successful room retrieval
  it("should return all rooms with 200 status", async () => {
    // Mock data
    const mockRooms = [
      { id: "1", name: "Conference Room A" },
      { id: "2", name: "Meeting Room B" },
    ];

    // Mock implementation
    (getRooms as jest.Mock).mockReturnValue(mockRooms);

    // Make request
    const response = await request(app).get("/rooms/all");

    // Verify response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ rooms: mockRooms });
    expect(getRooms).toHaveBeenCalledTimes(1);
  });

  // Test: Error handling
  it("should return 500 status when room retrieval fails", async () => {
    // Mock error
    const errorMessage = "Database connection failed";
    (getRooms as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Make request
    const response = await request(app).get("/rooms/all");

    // Verify response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
    expect(getRooms).toHaveBeenCalledTimes(1);
  });

  // Test: Empty room list
  it("should return empty array when no rooms exist", async () => {
    // Mock empty response
    (getRooms as jest.Mock).mockReturnValue([]);

    // Make request
    const response = await request(app).get("/rooms/all");

    // Verify response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ rooms: [] });
    expect(getRooms).toHaveBeenCalledTimes(1);
  });
});
