import { ArrowRight, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top,rgba(255,193,7,0.28),transparent_38%),radial-gradient(circle_at_85%_18%,rgba(255,152,0,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(250,250,250,0.9))]" />
      <div className="animate-glow-drift absolute left-1/2 top-12 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[rgba(255,152,0,0.18)] blur-3xl" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="animate-fade-up max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] shadow-[0_12px_36px_rgba(44,62,80,0.08)] backdrop-blur">
            <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
            Reflective care for modern life
          </div>

          <h1 className="mt-8 text-[3.4rem] font-semibold leading-[0.98] tracking-tight text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
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
      </div>
    </section>
  );
}
