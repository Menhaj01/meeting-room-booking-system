import { readJsonFile } from "../utils/fileUtils";
import { ROOMS_PATH } from "../constants/paths";

// Helper function to fetch rooms
export const getRooms = () => {
  const data = readJsonFile(ROOMS_PATH);
  return data?.rooms || [];
};
