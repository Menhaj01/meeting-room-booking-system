export const isValidDate = (date: string): boolean =>
  !isNaN(new Date(date).getTime());

export const validateTimeRange = (
  startTime: string,
  endTime: string
): string | null => {
  if (!startTime || !endTime) return "Both startTime and endTime are required.";
  if (!isValidDate(startTime) || !isValidDate(endTime))
    return "Both startTime and endTime must be valid ISO date strings.";

  const start = new Date(startTime);
  const end = new Date(endTime);
  if (start >= end) return "startTime must be less than endTime.";

  return null;
};
