import type { Metadata } from "next";
import { Shield, Eye, Database, Trash2, Mail, Lock } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our commitment to confidentiality, data security, and your rights regarding personal information.",
};

const policySections = [
  {
    icon: Lock,
    title: "1. The Promise of Confidentiality",
    content: "Confidentiality is a foundational pillar of philosophical counselling. What you share in sessions, including your notes, booking requests, and dialogues, is held in the strictest professional confidence. It is never sold, shared, or disclosed to any third party, except in rare and specific safety or legal circumstances detailed in our Terms of Service.",
  },
  {
    icon: Eye,
    title: "2. Information We Collect",
    content: "We collect only the minimal data required to provide our services. This includes:",
    list: [
      "Contact forms: Name, email address, and message text.",
      "Newsletter subscriptions: Email address and subscription state.",
      "Appointment requests: Name, email, service selection, slot preferences, and any optional preparation notes you choose to share.",
    ],
  },
  {
    icon: Database,
    title: "3. How We Use and Store Data",
    content: "Your data is used solely to reply to inquiries, schedule appointments, and send requested newsletter reflections. It is stored securely on servers with encrypted databases. We do not use advertising trackers or sell profiling data.",
  },
  {
    icon: Trash2,
    title: "4. Retention & Soft Deletes",
    content: "We do not retain information longer than necessary. System records, subscription logs, and contact inquiries are archived when inactive. Deleted data is marked with 'soft deletes' for a 90-day recovery buffer, after which it is permanently purged from our primary databases.",
  },
  {
    icon: Shield,
    title: "5. Your Rights (GDPR & Privacy Compliance)",
    content: "Regardless of your location, we honor standard privacy rights. At any time, you have the right to:",
    list: [
      "Access a copy of all personal data we hold about you.",
      "Request correction of any incorrect or incomplete information.",
      "Request permanent deletion of all your contact, newsletter, or appointment records.",
      "Opt-out of newsletter communications instantly via the unsubscribe link in any email.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="Our commitment to your privacy &amp; trust"
        description="We believe in clear, honest relationships. This policy details how we protect your personal information and uphold strict standards of confidentiality."
      />

      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-4xl">
          <StaggerContainer className="grid gap-8">
            {policySections.map((section, index) => {
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

            <StaggerItem>
              <div className="rounded-[1.8rem] border border-[var(--color-border)] bg-white/80 p-7 shadow-sm transition hover:shadow-md">
                <div className="flex gap-4 sm:gap-5">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-highlight)] text-[var(--color-accent)]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                      6. Contact &amp; Enquiries
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                      If you have questions about this policy, want to export your data, or request permanent removal of your information, please contact us at:
                    </p>
                    <p className="mt-3 text-base font-semibold text-[var(--color-text-primary)]">
                      <a href="mailto:hello@benna-philosophy.com" className="hover:underline">
                        hello@benna-philosophy.com
                      </a>
                    </p>
                    <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                      We aim to respond to and fulfill all data access or removal requests within 5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <CtaBanner
        title="Ready to begin?"
        description="If you have any questions about how our sessions run or how confidentiality works, let's have a brief conversation."
        primaryLabel="Contact the Practice"
        primaryHref="/contact"
        secondaryLabel="Book a Session"
        secondaryHref="/book-session"
      />
    </>
  );
}
