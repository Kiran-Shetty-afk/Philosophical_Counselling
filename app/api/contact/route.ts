import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ?? "Invalid enquiry submission.",
      },
      { status: 400 },
    );
  }

  // Phase 1: Enquiry is captured and acknowledged.
  // Phase 2: Wire to database (Prisma) and email notification (Resend/EmailJS).
  const enquiryReference = `ENQ-${Date.now().toString().slice(-6)}`;

  return NextResponse.json({
    enquiryReference,
    message:
      "Your enquiry has been received. We will respond with care within one business day.",
  });
}
