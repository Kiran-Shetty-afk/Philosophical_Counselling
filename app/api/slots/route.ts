import { NextResponse } from "next/server";

import {
  getAvailabilityConfig,
  getAppointmentsForDate,
  getBlockedSlotsForDate,
} from "@/lib/booking-store";
import { generateSlotsForDate } from "@/lib/slots";

/**
 * GET /api/slots?date=YYYY-MM-DD
 * Returns all slots for a given date with availability status.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Please provide a valid date in YYYY-MM-DD format." },
      { status: 400 },
    );
  }

  // Reject past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const requested = new Date(date + "T00:00:00");
  if (requested < today) {
    return NextResponse.json(
      { error: "Cannot fetch slots for a past date." },
      { status: 400 },
    );
  }

  const config = getAvailabilityConfig();
  const bookedStartTimes = getAppointmentsForDate(date).map((a) => a.startTime);
  const blockedStartTimes = getBlockedSlotsForDate(date).map((s) => s.startTime);

  const slots = generateSlotsForDate({
    date,
    config,
    bookedStartTimes,
    blockedStartTimes,
  });

  return NextResponse.json({ date, slots });
}
