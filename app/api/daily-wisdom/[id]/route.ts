import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdminAuthenticated } from "@/lib/auth";
import { getQuoteById, updateQuote, deleteQuote } from "@/lib/wisdom-store";
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

const patchSchema = z.object({
  quote: z.string().min(10).max(500).optional(),
  author: z.string().min(2).max(100).optional(),
  source: z.string().max(200).optional(),
  category: z
    .enum(VALID_CATEGORIES as [WisdomCategory, ...WisdomCategory[]])
    .optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

/**
 * PATCH /api/daily-wisdom/[id]
 * Admin only — update a wisdom quote.
 */
export async function PATCH(request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const { id } = await params;
  if (!getQuoteById(id)) {
    return NextResponse.json({ error: "Quote not found." }, { status: 404 });
  }

  const json = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid update." },
      { status: 400 },
    );
  }

  const updated = updateQuote(id, parsed.data);
  return NextResponse.json({ quote: updated });
}

/**
 * DELETE /api/daily-wisdom/[id]
 * Admin only — delete a wisdom quote.
 */
export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const { id } = await params;
  if (!getQuoteById(id)) {
    return NextResponse.json({ error: "Quote not found." }, { status: 404 });
  }

  deleteQuote(id);
  return NextResponse.json({ success: true });
}
