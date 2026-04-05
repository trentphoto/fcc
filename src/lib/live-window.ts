/**
 * Whether `date` falls on a Sunday in America/New_York between 8:00 and 11:30 inclusive.
 */
export function isSundayLiveServiceWindowEastern(date: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);

  const weekday = parts.find((p) => p.type === "weekday")?.value;
  const hour = Number(parts.find((p) => p.type === "hour")?.value);
  const minute = Number(parts.find((p) => p.type === "minute")?.value);
  if (weekday !== "Sunday") return false;
  if (Number.isNaN(hour) || Number.isNaN(minute)) return false;

  const minutesSinceMidnight = hour * 60 + minute;
  const start = 8 * 60;
  const end = 11 * 60 + 30;
  return minutesSinceMidnight >= start && minutesSinceMidnight <= end;
}
