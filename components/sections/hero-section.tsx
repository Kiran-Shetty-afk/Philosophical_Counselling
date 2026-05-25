import { ArrowRight, Compass, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { getDailyQuote } from "@/lib/wisdom-store";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const quote = getDailyQuote();

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top,rgba(255,193,7,0.28),transparent_38%),radial-gradient(circle_at_85%_18%,rgba(255,152,0,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(250,250,250,0.9))]" />
      <div className="animate-glow-drift absolute left-1/2 top-12 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[rgba(255,152,0,0.18)] blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        {/* Left — headline */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] shadow-[0_12px_36px_rgba(44,62,80,0.08)] backdrop-blur">
            <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
            Reflective care for modern life
          </div>

          <h1 className="mt-8 max-w-4xl text-[3.4rem] font-semibold leading-[0.98] tracking-tight text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
            Find steadier ground through philosophical counselling.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
            A calm, contemporary practice for people navigating uncertainty,
            relationships, identity, and the search for meaning with greater
            clarity and intention.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="/book-session" className={cn(buttonVariants({ size: "lg" }))}>
              Book Your Session
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/about"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              Explore Our Approach
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-sm text-[var(--color-text-secondary)]">
            {[
              { stat: "1:1", label: "Personalized reflective sessions" },
              { stat: "100%", label: "Confidential and judgment-free space" },
              { stat: "Values-led", label: "Practical insight rooted in wisdom traditions" },
            ].map(({ stat, label }) => (
              <div key={stat}>
                <p className="text-2xl font-semibold text-[var(--color-text-primary)]">{stat}</p>
                <p className="mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — daily wisdom card */}
        <div className="animate-float-soft relative">
          <div className="absolute -left-6 top-8 hidden h-24 w-24 rounded-full border border-white/80 bg-white/60 blur-[1px] lg:block" />
          <div className="rounded-[2rem] border border-white/80 bg-white/72 p-4 shadow-[0_30px_70px_rgba(44,62,80,0.12)] backdrop-blur-xl sm:p-6">
            <div className="rounded-[1.5rem] bg-[linear-gradient(145deg,rgba(255,248,225,0.96),rgba(255,255,255,0.96))] p-5 sm:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
                    Daily wisdom
                  </p>
                  {quote ? (
                    <>
                      <p className="mt-3 max-w-sm text-xl font-semibold leading-8 text-[var(--color-text-primary)] sm:text-2xl sm:leading-9">
                        &ldquo;{quote.quote}&rdquo;
                      </p>
                      <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                        — {quote.author}
                        {quote.source ? (
                          <span className="ml-1 italic">{quote.source}</span>
                        ) : null}
                      </p>
                    </>
                  ) : (
                    <p className="mt-3 text-base text-[var(--color-text-secondary)]">
                      A moment of reflection to begin.
                    </p>
                  )}
                </div>
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <Compass className="h-6 w-6 text-[var(--color-accent)]" />
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
                <a
                  href="/personal-counselling"
                  className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-5 transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
                >
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    Personal growth
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                    Clarify patterns, choices, and inner conflicts with structured dialogue.
                  </p>
                </a>
                <a
                  href="/family-counselling"
                  className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-5 transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
                >
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    Family support
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                    Create healthier conversations around values, care, and change.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
