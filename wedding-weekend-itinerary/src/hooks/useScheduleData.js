import { useEffect, useMemo, useState } from "react";
import { fetchSheetRows } from "../api/fetchItineraryFromSheet";
import { dayOrder, isYes, toISODate } from "../utils/scheduleUtils";

export function useScheduleData(sheetTabName) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [userSelectedDay, setUserSelectedDay] = useState("");

  useEffect(() => {
    fetchSheetRows(sheetTabName)
      .then(setRows)
      .catch((err) => setError(err.message || "Failed to load sheet"));
  }, [sheetTabName]);

  const guestRows = useMemo(() => {
    return rows
      .filter((r) => r.Who === "Everyone")
      .map((r) => ({ ...r, isOptional: isYes(r.Optional) }));
  }, [rows]);

  const uniqueDays = useMemo(() => {
    const set = new Set(
      guestRows
        .filter((r) => r.Day !== "Monday" && r.Day !== "Thursday")
        .map((r) => r.Day),
    );
    return [...set].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  }, [guestRows]);

  const defaultDay = useMemo(() => {
    if (uniqueDays.length === 0) return "";

    const today = toISODate(new Date());
    const match = guestRows.find((r) => r.Date === today);

    if (match && uniqueDays.includes(match.Day)) return match.Day;
    if (uniqueDays.includes("Friday")) return "Friday";
    return uniqueDays[0];
  }, [guestRows, uniqueDays]);

  const selectedDay =
    userSelectedDay && uniqueDays.includes(userSelectedDay)
      ? userSelectedDay
      : defaultDay;

  const setSelectedDay = (day) => setUserSelectedDay(day);

  return { rows, error, guestRows, uniqueDays, selectedDay, setSelectedDay };
}
