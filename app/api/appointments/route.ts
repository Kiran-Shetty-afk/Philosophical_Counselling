import { NextResponse } from "next/server";

import { appointmentFormSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = appointmentFormSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid appointment request.",
      },
      { status: 400 },
    );
  }

  const bookingReference = `BPC-${Date.now().toString().slice(-6)}`;

  return NextResponse.json({
    bookingReference,
    message: "Your appointment request has been received.",
  });
}
