import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { ADMIN_SESSION_COOKIE, validateAdminCredentials } from "@/lib/auth";

const loginSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z.string().min(1, "Please enter your password."),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid login request." },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;

  if (!validateAdminCredentials(email, password)) {
    return NextResponse.json(
      { error: "Incorrect admin email or password." },
      { status: 401 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ success: true });
}
