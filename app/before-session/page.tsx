"use client";

import { useState } from "react";
import {
  Printer,
  Compass,
  CheckCircle2,
  Coffee,
  PenTool,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Shield,
  FileText
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

const prepareSteps = [
  {
    id: "space",
    label: "Arrange a quiet, private space",
    desc: "Ensure you are in a comfortable environment where you can speak openly without interruption.",
    icon: Shield,
  },
  {
    id: "journal",
    label: "Bring a pen and notepad",
    desc: "Taking notes of concepts, quotes, or questions that arise during dialogue is highly recommended.",
    icon: PenTool,
  },
  {
    id: "question",
    label: "Identify a starting thread",
    desc: "Think of a decision, value tension, or repeating pattern you want to unpack. You don't need a neat summary—just a place to start.",
    icon: Compass,
  },
  {
    id: "mindset",
    label: "Give yourself transition buffer",
    desc: "Try to log off or finish chores 10 minutes prior. Give your mind a moment to slow down before we begin.",
    icon: Coffee,
  },
];

const guidanceSections = [
  {
    title: "1. The Dialogue is Unhurried",
    desc: "Unlike standard conversation or coaching, we don't rush to fix, solve, or advise. We slow down. If a silence happens, it is welcome—it means we are examining a thought rather than reactively filling the space.",
    icon: Sparkles,
  },
  {
    title: "2. No Right Answers",
    desc: "There is no performance here. You don't need a background in philosophy, nor do you need to speak in academic terms. The focus is entirely on your lived experience, your thoughts, and your values.",
    icon: HelpCircle,
  },
  {
    title: "3. Collaborative Inquiry",
    desc: "We work as equal conversational partners. My role is to listen deeply, reflect your words, locate core assumptions, and offer relevant philosophical frameworks. Your role is to explore honestly.",
    icon: CheckCircle2,
  },
];

export default function BeforeSessionPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Hide header hero banner, and footer when printing */}
      <div className="print:hidden">
        <PageHero
          eyebrow="Guide & Preparation"
          title="Preparing for your first philosophical dialogue"
          description="A quiet guide to help you slow down, clarify expectations, and set up your environment before we begin our session."
        />
      </div>

      {/* Print-Only Title block (visible when printing) */}
      <div className="hidden print:block max-w-4xl mx-auto px-8 pt-8 pb-4">
        <div className="border-b border-gray-300 pb-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Benna Philosophical Counselling
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">
            Before Session Preparation Guide
          </h1>
          <p className="text-gray-600 mt-2">
            A practical reference sheet to prepare for a thoughtful, grounded dialogue.
          </p>
        </div>
      </div>

      <section className="px-5 py-6 sm:px-8 lg:px-10 print:px-8 print:py-0">
        <div className="mx-auto w-full max-w-4xl">
          {/* Action Header Card with Print/Download Button */}
          <AnimatedSection className="print:hidden">
            <div className="mb-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-[var(--color-border)] bg-white/80 p-6 shadow-[0_16px_40px_rgba(44,62,80,0.04)] sm:flex-row sm:items-center sm:p-8">
              <div className="max-w-xl">
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Print or Save this Guide
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Keep a physical copy next to your notepad or save a clean PDF version for offline reading.
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] shadow-sm transition hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-muted)] cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                Print / Save PDF
              </button>
            </div>
          </AnimatedSection>

          {/* Interactive Checklist (Printed as static checklist) */}
          <div className="mb-12">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 rounded-full bg-[var(--color-accent)] print:hidden" />
                <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] print:text-xl print:text-gray-900">
                  Pre-Session Checklist
                </h2>
              </div>
              <p className="text-[var(--color-text-secondary)] mb-6 text-sm sm:text-base print:text-gray-600">
                Go through these steps to ensure you are fully prepared for the session. Click to check them off as you go.
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {prepareSteps.map((step) => {
                const Icon = step.icon;
                const isChecked = !!checkedItems[step.id];
                return (
                  <StaggerItem key={step.id} className="print:break-inside-avoid">
                    <div
                      onClick={() => toggleCheck(step.id)}
                      className={`flex gap-4 rounded-2xl border p-5 transition duration-200 cursor-pointer select-none print:cursor-default print:bg-white print:border-gray-300 ${
                        isChecked
                          ? "border-[var(--color-accent)] bg-[rgba(255,193,7,0.04)]"
                          : "border-[var(--color-border)] bg-white/80 hover:border-[var(--color-border-strong)]"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                            isChecked
                              ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                              : "border-[var(--color-border-strong)] bg-white text-[var(--color-text-secondary)]"
                          } print:border-gray-400`}
                        >
                          <CheckCircle2
                            className={`h-4 w-4 transition-opacity ${
                              isChecked ? "opacity-100" : "opacity-0 print:opacity-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className={`text-base font-semibold text-[var(--color-text-primary)] print:text-gray-900 ${
                          isChecked ? "line-through text-[var(--color-text-secondary)] opacity-80 print:no-underline print:opacity-100" : ""
                        }`}>
                          {step.label}
                        </h3>
                        <p className="mt-2 text-xs leading-5 text-[var(--color-text-secondary)] print:text-gray-600">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          {/* Guidelines on What to Expect */}
          <div className="mb-12 print:break-before-page">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 rounded-full bg-[var(--color-accent)] print:hidden" />
                <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] print:text-xl print:text-gray-900">
                  What to Expect During the Session
                </h2>
              </div>
            </AnimatedSection>

            <StaggerContainer className="grid gap-6">
              {guidanceSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <StaggerItem key={index} className="print:break-inside-avoid">
                    <div className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6 shadow-sm print:bg-white print:border-gray-300">
                      <div className="flex gap-4 sm:gap-5">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-highlight)] text-[var(--color-accent)] print:bg-gray-100 print:text-gray-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] print:text-gray-900">
                            {section.title}
                          </h3>
                          <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)] print:text-gray-700">
                            {section.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          {/* Calming Note */}
          <AnimatedSection className="print:break-inside-avoid">
            <div className="rounded-3xl border border-[var(--color-accent)] bg-[rgba(255,193,7,0.02)] p-6 text-center sm:p-8 print:bg-white print:border-gray-400">
              <Sparkles className="mx-auto h-6 w-6 text-[var(--color-accent)] print:text-gray-700" />
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-text-primary)] print:text-gray-900">
                A final reminder: Slow down.
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] print:text-gray-700">
                Philosophical counselling is about examining your questions, not presenting a perfect case.
                You are exactly where you need to be. Show up with an open mind, and we will find the threads together.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Hide CTA Banner when printing */}
      <div className="print:hidden">
        <CtaBanner
          title="Ready to begin?"
          description="If you haven't scheduled your session yet, choose a convenient slot and begin your journey."
          primaryLabel="Book a Session"
          primaryHref="/book-session"
          secondaryLabel="Contact Us"
          secondaryHref="/contact"
        />
      </div>
    </>
  );
}
