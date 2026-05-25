/**
 * wisdom-store.ts
 *
 * Server-side in-memory store for the Daily Wisdom system.
 * Same pattern as booking-store.ts — production-grade logic,
 * Prisma-ready for Phase 2 without changing any API or UI code.
 *
 * Selection logic:
 *   1. If a quote is pinned as featured → always show it.
 *   2. Otherwise → pick a random active quote, avoiding the last shown.
 *   3. Daily mode → seed by day index so the same quote shows all day.
 *   4. Refresh mode → pick a new random quote on each client request.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type WisdomCategory =
  | "Stoicism"
  | "Philosophy"
  | "Mindfulness"
  | "Self-Reflection"
  | "Motivation"
  | "Existentialism"
  | "Ethics";

export type WisdomQuote = {
  id: string;
  quote: string;
  author: string;
  source?: string;       // book / work title
  category: WisdomCategory;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

// ─── Seed data — 18 quotes across all categories ─────────────────────────────

const seedQuotes: WisdomQuote[] = [
  {
    id: "w-01",
    quote: "The unexamined life is not worth living.",
    author: "Socrates",
    source: "Apology",
    category: "Philosophy",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-02",
    quote: "He who has a why can bear almost any how.",
    author: "Friedrich Nietzsche",
    category: "Motivation",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-03",
    quote: "No man ever steps in the same river twice, for it is not the same river and he is not the same man.",
    author: "Heraclitus",
    category: "Philosophy",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-04",
    quote: "You have power over your mind, not outside events. Realise this, and you will find strength.",
    author: "Marcus Aurelius",
    source: "Meditations",
    category: "Stoicism",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-05",
    quote: "Waste no more time arguing about what a good man should be. Be one.",
    author: "Marcus Aurelius",
    source: "Meditations",
    category: "Stoicism",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-06",
    quote: "The obstacle is the way.",
    author: "Marcus Aurelius",
    source: "Meditations",
    category: "Stoicism",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-07",
    quote: "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.",
    author: "Jean-Paul Sartre",
    source: "Existentialism is a Humanism",
    category: "Existentialism",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-08",
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Motivation",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-09",
    quote: "The present moment always will have been.",
    author: "Epictetus",
    source: "Discourses",
    category: "Stoicism",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-10",
    quote: "To know what you know and what you do not know — that is true knowledge.",
    author: "Confucius",
    source: "Analects",
    category: "Philosophy",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-11",
    quote: "Between stimulus and response there is a space. In that space is our power to choose our response.",
    author: "Viktor Frankl",
    source: "Man's Search for Meaning",
    category: "Self-Reflection",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-12",
    quote: "The mind is everything. What you think, you become.",
    author: "Buddha",
    category: "Mindfulness",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-13",
    quote: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha",
    category: "Mindfulness",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-14",
    quote: "He who knows others is wise; he who knows himself is enlightened.",
    author: "Lao Tzu",
    source: "Tao Te Ching",
    category: "Self-Reflection",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-15",
    quote: "Act only according to that maxim whereby you can at the same time will that it should become a universal law.",
    author: "Immanuel Kant",
    source: "Groundwork of the Metaphysics of Morals",
    category: "Ethics",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-16",
    quote: "The greatest wealth is to live content with little.",
    author: "Plato",
    category: "Philosophy",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-17",
    quote: "Knowing yourself is the beginning of all wisdom.",
    author: "Aristotle",
    category: "Self-Reflection",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "w-18",
    quote: "We suffer more in imagination than in reality.",
    author: "Seneca",
    source: "Letters from a Stoic",
    category: "Stoicism",
    isActive: true,
    isFeatured: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

// ─── Store singleton ──────────────────────────────────────────────────────────

const quotes = new Map<string, WisdomQuote>();
for (const q of seedQuotes) {
  quotes.set(q.id, q);
}

// ─── Store API ────────────────────────────────────────────────────────────────

export function getAllQuotes(): WisdomQuote[] {
  return Array.from(quotes.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getActiveQuotes(): WisdomQuote[] {
  return getAllQuotes().filter((q) => q.isActive);
}

export function getQuoteById(id: string): WisdomQuote | undefined {
  return quotes.get(id);
}

export function createQuote(
  data: Omit<WisdomQuote, "id" | "createdAt" | "updatedAt">,
): WisdomQuote {
  const id = `w-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const now = new Date().toISOString();
  // If new quote is featured, unfeature all others
  if (data.isFeatured) {
    for (const [k, v] of quotes) {
      quotes.set(k, { ...v, isFeatured: false });
    }
  }
  const quote: WisdomQuote = { ...data, id, createdAt: now, updatedAt: now };
  quotes.set(id, quote);
  return quote;
}

export function updateQuote(
  id: string,
  updates: Partial<Omit<WisdomQuote, "id" | "createdAt">>,
): WisdomQuote | null {
  const existing = quotes.get(id);
  if (!existing) return null;
  // If setting featured, unfeature all others first
  if (updates.isFeatured) {
    for (const [k, v] of quotes) {
      if (k !== id) quotes.set(k, { ...v, isFeatured: false });
    }
  }
  const updated: WisdomQuote = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  quotes.set(id, updated);
  return updated;
}

export function deleteQuote(id: string): boolean {
  return quotes.delete(id);
}

/**
 * Get the quote to display on the homepage.
 *
 * Priority:
 *   1. Featured quote (if any active one is pinned)
 *   2. Daily deterministic quote (changes once per day, same for all visitors)
 *   3. Falls back to first active quote if none found
 */
export function getDailyQuote(excludeId?: string): WisdomQuote | null {
  const active = getActiveQuotes();
  if (active.length === 0) return null;

  // Priority 1: featured
  const featured = active.find((q) => q.isFeatured);
  if (featured) return featured;

  // Priority 2: daily deterministic (changes at midnight UTC)
  const pool = excludeId ? active.filter((q) => q.id !== excludeId) : active;
  if (pool.length === 0) return active[0] ?? null;

  const dayIndex = Math.floor(Date.now() / 86_400_000);
  return pool[dayIndex % pool.length] ?? pool[0] ?? null;
}

/**
 * Get a random active quote, optionally excluding the current one.
 * Used for the "refresh" button on the frontend.
 */
export function getRandomQuote(excludeId?: string): WisdomQuote | null {
  const active = getActiveQuotes();
  if (active.length === 0) return null;

  const featured = active.find((q) => q.isFeatured);
  if (featured) return featured;

  const pool = excludeId ? active.filter((q) => q.id !== excludeId) : active;
  if (pool.length === 0) return active[0] ?? null;

  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx] ?? null;
}
