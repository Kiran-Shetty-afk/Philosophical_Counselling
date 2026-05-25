import { NextResponse } from "next/server";
import { z } from "zod";

import {
  getAvailabilityConfig,
  isSlotTaken,
  isSlotBlocked,
  createAppointment,
} from "@/lib/booking-store";
import { generateSlotsForDate } from "@/lib/slots";

const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  service: z.enum(["personal", "family", "meaning"], {
    error: "Please choose a session type.",
  }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format."),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format."),
  notes: z
    .string()
    .min(12, "Please add a short note about what support you need.")
    .max(1000, "Please keep your note under 1000 characters."),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid booking request." },
      { status: 400 },
    );
  }

  const { name, email, service, date, startTime, notes } = parsed.data;

  // Reject past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const requested = new Date(date + "T00:00:00");
  if (requested < today) {
    return NextResponse.json(
      { error: "Cannot book a session in the past." },
      { status: 400 },
    );
  }

  // Server-side double-booking check — never trust frontend only
  if (isSlotTaken(date, startTime)) {
    return NextResponse.json(
      { error: "This slot has just been booked. Please choose another time." },
      { status: 409 },
    );
  }

  if (isSlotBlocked(date, startTime)) {
    return NextResponse.json(
      { error: "This slot is not available. Please choose another time." },
      { status: 409 },
    );
  }

  // Validate the slot actually exists in the generated schedule
  const config = getAvailabilityConfig();
  const slots = generateSlotsForDate({
    date,
    config,
    bookedStartTimes: [],
    blockedStartTimes: [],
  });
  const slot = slots.find((s) => s.startTime === startTime);

  if (!slot) {
    return NextResponse.json(
      { error: "The selected time slot is not available on this date." },
      { status: 400 },
    );
  }

  const appointment = createAppointment({
    name,
    email,
    service,
    date,
    startTime,
    endTime: slot.endTime,
    durationMinutes: config.sessionDurationMinutes,
    notes,
    status: "Pending",
  });

  return NextResponse.json({
    bookingReference: appointment.bookingReference,
    message: "Your appointment request has been received. We will confirm shortly.",
    appointment: {
      id: appointment.id,
      date: appointment.date,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      service: appointment.service,
      status: appointment.status,
    },
  });
}

export async function GET() {
  // Public endpoint returns only count — full list is admin-only
  const { getAllAppointments } = await import("@/lib/booking-store");
  const all = getAllAppointments();
  return NextResponse.json({ total: all.length });
}
