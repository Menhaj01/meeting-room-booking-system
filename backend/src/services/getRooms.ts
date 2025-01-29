import { readJsonFile } from "../utils/fileUtils";
import path from "path";

// Paths to JSON data files
const roomsFilePath = path.join(__dirname, "../data/rooms.json");

// Helper function to fetch rooms
export const getRooms = () => {
  const data = readJsonFile(roomsFilePath);
  return data?.rooms || [];
};
