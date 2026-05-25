import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdminAuthenticated } from "@/lib/auth";
import {
  addBlockedSlot,
  removeBlockedSlot,
  getAllBlockedSlots,
} from "@/lib/booking-store";

const blockSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format."),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format."),
  reason: z.string().max(200).optional(),
});

/** GET /api/admin/slots/block — list all blocked slots */
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }
  return NextResponse.json({ blockedSlots: getAllBlockedSlots() });
}

/** POST /api/admin/slots/block — block a slot */
export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = blockSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 },
    );
  }

  const blocked = addBlockedSlot(parsed.data);
  return NextResponse.json({ blocked });
}

/** DELETE /api/admin/slots/block?id=xxx — unblock a slot */
export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing slot id." }, { status: 400 });
  }

  const removed = removeBlockedSlot(id);
  if (!removed) {
    return NextResponse.json({ error: "Blocked slot not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
