import type { Metadata } from "next";
import { Scale, Calendar, DollarSign, EyeOff, MessageSquare, AlertCircle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing our sessions, cancellations, fees, and the scope of philosophical counselling.",
};

const termsSections = [
  {
    icon: Scale,
    title: "1. Scope & Nature of Service",
    content: "Philosophical counselling is an intellectual, reflective, and educational dialogue. It is designed to help clients examine assumptions, clarify values, and explore personal questions. It is not clinical psychotherapy, mental health treatment, or medical psychiatry. If you are experiencing clinical psychological distress, severe depression, or require medical care, we advise consulting with a licensed healthcare provider.",
  },
  {
    icon: Calendar,
    title: "2. Session Booking & Cancellation Policy",
    content: "To respect both your schedule and mine, we enforce a strict 24-hour rescheduling and cancellation policy:",
    list: [
      "Notice: You must reschedule or cancel your session at least 24 hours prior to the scheduled start time.",
      "Late Changes: Cancellations or rescheduling requests made within 24 hours of the session will forfeit that session credit or be subject to a late fee.",
      "No-Shows: If you do not join the session within 15 minutes of the start time, it will be considered a no-show and the session will be charged in full.",
    ],
  },
  {
    icon: DollarSign,
    title: "3. Fees, Payments & Package Expirations",
    content: "All pricing and packages are clearly displayed on the booking page. Please note the following financial terms:",
    list: [
      "Expirations: Single sessions are valid for 3 months from booking. The 5-session package expires 6 months after purchase, and the 10-session package expires 12 months after purchase.",
      "Refunds: All fees are non-refundable once a session has been conducted or once a package has expired.",
      "No Financial Processing: Session requests are informational. Billing is completed via secure invoicing before the session commences.",
    ],
  },
  {
    icon: EyeOff,
    title: "4. Confidentiality & Legal Exceptions",
    content: "We uphold strict confidentiality, as described in our Privacy Policy. However, by booking a session, you acknowledge and agree that confidentiality may be set aside in the following circumstances:",
    list: [
      "Safety: If there is an imminent risk of serious physical harm to you or another person.",
      "Legal: If disclosure is required by a valid court order, subpoena, or applicable law.",
      "Supervision: Case discussions may occur in anonymous peer supervision, where your identity is completely protected.",
    ],
  },
  {
    icon: MessageSquare,
    title: "5. Code of Conduct",
    content: "Our dialogues are built on mutual respect and intellectual openness. We reserve the right to immediately terminate a session or relationship if a client exhibits abusive, threatening, or harassing behavior, without refund.",
  },
  {
    icon: AlertCircle,
    title: "6. Limitation of Liability",
    content: "The content of sessions and resources are for self-reflection and educational purposes only. You are solely responsible for any decisions or actions you choose to take based on the ideas discussed. The practice is not liable for any personal, financial, or professional decisions made by clients.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms of Service"
        title="Terms of practice &amp; engagement"
        description="Clear boundaries build comfortable spaces. These terms outline our mutual expectations, booking rules, and the nature of philosophical dialogue."
      />

      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-4xl">
          <StaggerContainer className="grid gap-8">
            {termsSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <StaggerItem key={index}>
                  <div className="rounded-[1.8rem] border border-[var(--color-border)] bg-white/80 p-7 shadow-sm transition hover:shadow-md">
                    <div className="flex gap-4 sm:gap-5">
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-highlight)] text-[var(--color-accent)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                          {section.title}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                          {section.content}
                        </p>
                        {section.list ? (
                          <ul className="mt-4 grid gap-2">
                            {section.list.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                                <span className="leading-6">{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <CtaBanner
        title="Have questions about these terms?"
        description="Clear communication is the foundation of philosophical work. Contact me if you have any questions or concerns."
        primaryLabel="Contact the Practice"
        primaryHref="/contact"
        secondaryLabel="Book a Session"
        secondaryHref="/book-session"
      />
    </>
  );
}
