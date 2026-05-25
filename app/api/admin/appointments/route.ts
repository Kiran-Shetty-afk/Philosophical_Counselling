import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/auth";
import { getAllAppointments } from "@/lib/booking-store";

/**
 * GET /api/admin/appointments
 * Returns all appointments for the admin dashboard.
 * Protected — requires admin session cookie.
 */
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const appointments = getAllAppointments();
  return NextResponse.json({ appointments });
}
