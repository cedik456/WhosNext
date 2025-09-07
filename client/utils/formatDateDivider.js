// utils/formatDateDivider.js
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);

export const formatDateDivider = (date, isFirstToday = false) => {
  const d = dayjs(date);
  const now = dayjs();

  if (d.isToday()) {
    // Only show "Today" on the first message of the day
    return isFirstToday ? `Today at ${d.format("h:mm A")}` : null;
  }

  if (now.diff(d, "day") < 7) {
    // Within this week (yesterday, etc.)
    return `${d.format("dddd")} at ${d.format("h:mm A")}`;
  }

  // Older than 7 days
  return d.format(`MMM D [at] h:mm A`);
};
