import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdminAuthenticated } from "@/lib/auth";
import {
  getAllQuotes,
  getDailyQuote,
  getRandomQuote,
  createQuote,
} from "@/lib/wisdom-store";
import type { WisdomCategory } from "@/lib/wisdom-store";

const VALID_CATEGORIES: WisdomCategory[] = [
  "Stoicism",
  "Philosophy",
  "Mindfulness",
  "Self-Reflection",
  "Motivation",
  "Existentialism",
  "Ethics",
];

const createSchema = z.object({
  quote: z.string().min(10, "Quote must be at least 10 characters.").max(500),
  author: z.string().min(2, "Author name is required.").max(100),
  source: z.string().max(200).optional(),
  category: z.enum(
    VALID_CATEGORIES as [WisdomCategory, ...WisdomCategory[]],
  ),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

/**
 * GET /api/daily-wisdom
 *
 * Public: returns the current daily quote (or random if ?refresh=true&exclude=id).
 * Admin:  returns all quotes when ?admin=true (requires auth).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isAdmin = searchParams.get("admin") === "true";

  if (isAdmin) {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
    }
    return NextResponse.json({ quotes: getAllQuotes() });
  }

  const refresh = searchParams.get("refresh") === "true";
  const excludeId = searchParams.get("exclude") ?? undefined;

  const quote = refresh
    ? getRandomQuote(excludeId)
    : getDailyQuote(excludeId);

  if (!quote) {
    return NextResponse.json({ quote: null });
  }

  return NextResponse.json({ quote });
}

/**
 * POST /api/daily-wisdom
 * Admin only — create a new wisdom quote.
 */
export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid quote data." },
      { status: 400 },
    );
  }

  const quote = createQuote(parsed.data);
  return NextResponse.json({ quote }, { status: 201 });
}
