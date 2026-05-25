"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, RefreshCw, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type WisdomQuote = {
  id: string;
  quote: string;
  author: string;
  source?: string;
  category: string;
};

type WisdomSectionProps = {
  initialQuote: WisdomQuote | null;
};

const CATEGORY_COLORS: Record<string, string> = {
  Stoicism: "bg-[rgba(255,152,0,0.12)] text-[#c06c00]",
  Philosophy: "bg-[rgba(255,193,7,0.14)] text-[#b45309]",
  Mindfulness: "bg-[rgba(44,62,80,0.08)] text-[var(--color-text-secondary)]",
  "Self-Reflection": "bg-[rgba(255,193,7,0.14)] text-[#b45309]",
  Motivation: "bg-[rgba(255,152,0,0.12)] text-[#c06c00]",
  Existentialism: "bg-[rgba(44,62,80,0.08)] text-[var(--color-text-secondary)]",
  Ethics: "bg-[rgba(255,193,7,0.14)] text-[#b45309]",
};

export function WisdomSection({ initialQuote }: WisdomSectionProps) {
  const [quote, setQuote] = useState<WisdomQuote | null>(initialQuote);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0); // drives AnimatePresence re-mount

  const refresh = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const excludeParam = quote ? `&exclude=${quote.id}` : "";
      const res = await fetch(`/api/daily-wisdom?refresh=true${excludeParam}`);
      const data = await res.json() as { quote: WisdomQuote | null };
      if (data.quote) {
        setQuote(data.quote);
        setKey((k) => k + 1);
      }
    } catch {
      // silent — keep current quote
    } finally {
      setLoading(false);
    }
  }, [quote, loading]);

  if (!quote) return null;

  const categoryColor =
    CATEGORY_COLORS[quote.category] ??
    "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]";

  return (
    <section className="px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section label */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-surface-highlight)]">
              <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
              Daily Wisdom
            </span>
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            type="button"
            aria-label="Refresh wisdom quote"
            className={cn(
              "flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]",
              loading && "opacity-60 cursor-not-allowed",
            )}
          >
            <RefreshCw
              className={cn("h-3.5 w-3.5", loading && "animate-spin")}
            />
            New quote
          </button>
        </div>

        {/* Quote card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(145deg,rgba(255,248,225,0.94),rgba(255,255,255,0.96))] p-8 shadow-[0_24px_64px_rgba(44,62,80,0.08)] sm:p-12">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[rgba(255,193,7,0.12)] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-[rgba(255,152,0,0.08)] blur-2xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  {/* Category badge */}
                  <span
                    className={cn(
                      "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
                      categoryColor,
                    )}
                  >
                    {quote.category}
                  </span>

                  {/* Quote text */}
                  <blockquote className="mt-5">
                    <p className="text-2xl font-semibold leading-[1.4] tracking-tight text-[var(--color-text-primary)] sm:text-3xl sm:leading-[1.35] lg:text-4xl lg:leading-[1.3]">
                      &ldquo;{quote.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Attribution */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px w-8 bg-[var(--color-border-strong)]" />
                    <div>
                      <p className="font-semibold text-[var(--color-text-primary)]">
                        {quote.author}
                      </p>
                      {quote.source && (
                        <p className="mt-0.5 text-sm italic text-[var(--color-text-secondary)]">
                          {quote.source}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Compass icon */}
                <div className="hidden lg:flex lg:h-20 lg:w-20 lg:shrink-0 lg:items-center lg:justify-center lg:rounded-[1.5rem] lg:bg-white/80 lg:shadow-[0_12px_32px_rgba(44,62,80,0.08)]">
                  <Compass className="h-9 w-9 text-[var(--color-accent)]" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
