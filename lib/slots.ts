/**
 * slots.ts
 *
 * Slot generation engine.
 * Generates 45-minute slots from admin availability config,
 * filters out booked, blocked, past, and holiday slots.
 */

import type { AvailabilityConfig } from "@/lib/booking-store";

export type TimeSlot = {
  startTime: string;   // "HH:MM" 24-hour
  endTime: string;     // "HH:MM" 24-hour
  label: string;       // "9:00 AM – 9:45 AM"
  available: boolean;
  reason?: "booked" | "blocked" | "past" | "break" | "holiday";
};

/** Convert "HH:MM" to total minutes from midnight */
function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

/** Convert total minutes from midnight to "HH:MM" */
function fromMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Format "HH:MM" to "9:00 AM" style */
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const hour = h ?? 0;
  const minute = m ?? 0;
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

type GenerateSlotsOptions = {
  date: string;                    // YYYY-MM-DD
  config: AvailabilityConfig;
  bookedStartTimes: string[];      // ["09:00", "10:00"]
  blockedStartTimes: string[];     // ["11:00"]
};

export function generateSlotsForDate({
  date,
  config,
  bookedStartTimes,
  blockedStartTimes,
}: GenerateSlotsOptions): TimeSlot[] {
  const dateObj = new Date(date + "T00:00:00");
  const dayOfWeek = dateObj.getDay();

  // Check if it's a holiday
  const isHoliday = config.holidays.some((h) => h.date === date);
  if (isHoliday) return [];

  // Find the schedule for this day
  const daySchedule = config.schedule.find((s) => s.dayOfWeek === dayOfWeek);
  if (!daySchedule || !daySchedule.enabled) return [];

  const { sessionDurationMinutes, bufferMinutes } = config;
  const slotStep = sessionDurationMinutes + bufferMinutes;

  const dayStart = toMinutes(daySchedule.startTime);
  const dayEnd = toMinutes(daySchedule.endTime);
  const breakStart = daySchedule.breakStart ? toMinutes(daySchedule.breakStart) : null;
  const breakEnd = daySchedule.breakEnd ? toMinutes(daySchedule.breakEnd) : null;

  // "Now" in minutes for past-slot filtering
  const now = new Date();
  const isToday =
    now.getFullYear() === dateObj.getFullYear() &&
    now.getMonth() === dateObj.getMonth() &&
    now.getDate() === dateObj.getDate();
  const nowMinutes = isToday ? now.getHours() * 60 + now.getMinutes() : -1;

  const slots: TimeSlot[] = [];
  let cursor = dayStart;

  while (cursor + sessionDurationMinutes <= dayEnd) {
    const slotEnd = cursor + sessionDurationMinutes;
    const startStr = fromMinutes(cursor);
    const endStr = fromMinutes(slotEnd);
    const label = `${formatTime(startStr)} – ${formatTime(endStr)}`;

    // Determine availability
    let available = true;
    let reason: TimeSlot["reason"] | undefined;

    if (isToday && cursor <= nowMinutes) {
      available = false;
      reason = "past";
    } else if (breakStart !== null && breakEnd !== null && cursor >= breakStart && cursor < breakEnd) {
      available = false;
      reason = "break";
    } else if (bookedStartTimes.includes(startStr)) {
      available = false;
      reason = "booked";
    } else if (blockedStartTimes.includes(startStr)) {
      available = false;
      reason = "blocked";
    }

    slots.push({ startTime: startStr, endTime: endStr, label, available, reason });
    cursor += slotStep;
  }

  return slots;
}
