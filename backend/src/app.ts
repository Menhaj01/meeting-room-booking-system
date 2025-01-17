import express, { Application } from "express";
import roomsRouter from "./routes/rooms";

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/rooms", roomsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
