export const createISODateTime = (date: string, time: string): string => {
  const localDateTime = new Date(`${date}T${time}:00`);
  if (isNaN(localDateTime.getTime()))
    throw new Error('Invalid date or time value');
  localDateTime.setMinutes(
    localDateTime.getMinutes() - localDateTime.getTimezoneOffset(),
  );
  return localDateTime.toISOString();
};
