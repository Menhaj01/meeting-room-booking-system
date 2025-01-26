import fs from "fs";

// Helper function to read JSON data from a file
export const readJsonFile = (filePath: string): any => {
  if (!fs.existsSync(filePath)) return null;
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Helper function to write JSON data to a file
export const writeJsonFile = (filePath: string, data: any): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
