import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import weekday from "dayjs/plugin/weekday";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(weekday);
dayjs.extend(advancedFormat);

export const formatMessengerStyleTime = (date) => {
  const d = dayjs(date);
  const now = dayjs();

  if (d.isToday()) {
    return d.format("h:mm A");
  } else if (d.isYesterday()) {
    return "Yesterday";
  } else if (now.diff(d, "day") < 7) {
    return d.format("dddd");
  } else if (now.year() === d.year()) {
    return d.format("MMM D");
  } else {
    return d.format("MMM D, YYYY");
  }
};
