import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
function formatIsoDate(isoDate) {
  return format(new Date(isoDate), "yyyy/MM/dd"); // formatIsoDate("2025-05-01T07:30:00.000Z")  => "2025/05/01"
}
function formatIsoDateToTime(isoDate) {
  const zonedData = toZonedTime(isoDate, "UTC");
  return format(zonedData, "HH:mm:ss"); // formatIsoDateToTime("2025-05-01T07:30:00.000Z") => "07:30:00"
}

export { formatIsoDate, formatIsoDateToTime };
