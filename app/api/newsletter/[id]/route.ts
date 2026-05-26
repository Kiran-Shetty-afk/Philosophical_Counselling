import { NextResponse } from "next/server";

import { removeSubscriber, deleteSubscriber } from "@/lib/newsletter-store";

/* ── PATCH  /api/newsletter/[id] ───────────────────────────
   Soft-unsubscribe (set active = false)
   ───────────────────────────────────────────────────────── */
export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const success = removeSubscriber(id);
  if (!success) {
    return NextResponse.json({ error: "Subscriber not found." }, { status: 404 });
  }
  return NextResponse.json({ message: "Subscriber deactivated." });
}

/* ── DELETE  /api/newsletter/[id] ──────────────────────────
   Hard-delete subscriber record
   ───────────────────────────────────────────────────────── */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const success = deleteSubscriber(id);
  if (!success) {
    return NextResponse.json({ error: "Subscriber not found." }, { status: 404 });
  }
  return NextResponse.json({ message: "Subscriber deleted." });
}
