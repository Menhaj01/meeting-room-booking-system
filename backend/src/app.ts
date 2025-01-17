import express from "express";
import roomsRouter from "./routes/rooms";

const app = express();

app.use(express.json());

app.use("/api/rooms", roomsRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
