import { NextResponse } from "next/server";

import {
  addSubscriber,
  findByEmail,
  getAllSubscribers,
} from "@/lib/newsletter-store";

/* ── POST  /api/newsletter ─────────────────────────────────
   Subscribe an email address to the newsletter
   ───────────────────────────────────────────────────────── */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email ?? "").trim().toLowerCase();

    // Basic server-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    // Check for already-active subscription
    const existing = findByEmail(email);
    if (existing?.active) {
      return NextResponse.json(
        { message: "You are already subscribed. Thank you!", alreadySubscribed: true },
        { status: 200 },
      );
    }

    const subscriber = addSubscriber(email);

    return NextResponse.json(
      {
        message: "Welcome! You have been subscribed successfully.",
        id: subscriber.id,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

/* ── GET  /api/newsletter ──────────────────────────────────
   Admin: list all subscribers (should be auth-gated Phase 2)
   ───────────────────────────────────────────────────────── */
export async function GET() {
  const subscribers = getAllSubscribers();
  return NextResponse.json({ subscribers, total: subscribers.length });
}
