import express from "express";
import cors from 'cors';
import roomsRouter from "./routes/rooms";

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", roomsRouter); // Prefix all routes with '/api'

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
