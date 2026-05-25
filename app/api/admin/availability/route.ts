import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdminAuthenticated } from "@/lib/auth";
import {
  getAvailabilityConfig,
  updateAvailabilityConfig,
} from "@/lib/booking-store";

const daySchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  enabled: z.boolean(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  breakStart: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  breakEnd: z.string().regex(/^\d{2}:\d{2}$/).optional(),
});

const configSchema = z.object({
  sessionDurationMinutes: z.number().min(15).max(180),
  bufferMinutes: z.number().min(0).max(60),
  schedule: z.array(daySchema).length(7),
  holidays: z.array(
    z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      reason: z.string().optional(),
    }),
  ),
});

/**
 * GET /api/admin/availability
 * Returns the current availability configuration.
 */
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }
  return NextResponse.json({ config: getAvailabilityConfig() });
}

/**
 * POST /api/admin/availability
 * Replaces the full availability configuration.
 */
export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = configSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid configuration." },
      { status: 400 },
    );
  }

  updateAvailabilityConfig(parsed.data);
  return NextResponse.json({ config: getAvailabilityConfig() });
}
