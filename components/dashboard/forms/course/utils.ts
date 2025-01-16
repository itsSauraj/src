export const formatDuration = (
  hours: number,
  minutes: number,
  seconds: number,
): string => {
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
