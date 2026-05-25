import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdminAuthenticated } from "@/lib/auth";
import { getAppointmentById, updateAppointment } from "@/lib/booking-store";

const patchSchema = z.object({
  status: z
    .enum(["Pending", "Confirmed", "Completed", "Cancelled"])
    .optional(),
  adminNotes: z.string().max(2000).optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(),
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

/**
 * PATCH /api/admin/appointments/[id]
 * Update status, admin notes, or reschedule an appointment.
 */
export async function PATCH(request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const { id } = await params;
  const existing = getAppointmentById(id);

  if (!existing) {
    return NextResponse.json(
      { error: "Appointment not found." },
      { status: 404 },
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid update." },
      { status: 400 },
    );
  }

  const updated = updateAppointment(id, parsed.data);
  return NextResponse.json({ appointment: updated });
}
