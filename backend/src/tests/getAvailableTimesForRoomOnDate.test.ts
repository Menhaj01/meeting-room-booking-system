import request from "supertest";
import express from "express";
import router from "../routes/rooms";

const app = express();
app.use(express.json());
app.use("/api", router);

describe("GET /api/rooms/:roomId/availableTimes/:date", () => {
  it("should return available times for a room on a given date", async () => {
    const roomId = "1";
    const date = "2025-01-30";

    const response = await request(app)
      .get(`/api/rooms/${roomId}/availableTimes/${date}`)
      .expect(200);

    expect(response.body).toHaveProperty("roomId", roomId);
    expect(response.body).toHaveProperty("roomName");
    expect(response.body).toHaveProperty("availableTimes");
    expect(Array.isArray(response.body.availableTimes)).toBe(true);
  });

  it("should return 400 if roomId or date is missing", async () => {
    // Test empty roomId
    const response1 = await request(app)
      .get("/api/rooms/%20/availableTimes/2025-01-30")
      .expect(400);
    expect(response1.body.message).toBe("Missing roomId or date parameter");

    // Test empty date
    const response2 = await request(app)
      .get("/api/rooms/1/availableTimes/%20")
      .expect(400);
    expect(response2.body.message).toBe("Missing roomId or date parameter");
  });
  it("should return 404 if room is not found", async () => {
    const roomId = "nonexistentRoomId";
    const date = "2025-01-30";

    const response = await request(app)
      .get(`/api/rooms/${roomId}/availableTimes/${date}`)
      .expect(404);

    expect(response.body.message).toBe("Room not found");
  });
});
