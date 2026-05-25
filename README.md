# Benna Philosophical Counselling Website

A modern, production-quality Next.js website for a philosophical counselling practice. Built with a calm, premium visual language, reusable UI primitives, Framer Motion scroll animations, a fully functional admin console, and a complete appointment booking system.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS 4 + `@tailwindcss/typography` |
| Animations | Framer Motion 12 + CSS keyframes |
| Forms | React Hook Form 7 + Zod 4 |
| Icons | Lucide React |
| Fonts | Geist Sans + Geist Mono |

## Admin credentials

Default credentials (override via environment variables):

| Field | Value |
|---|---|
| Email | `admin@benna-philosophy.com` |
| Password | `Admin@12345` |

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local` to override.

## Run locally

```bash
npm install
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin console: [http://localhost:3000/auth/login](http://localhost:3000/auth/login)

## Environment variables

```bash
cp .env.example .env.local
```

See `.env.example` for all available variables.

## Quality checks

```bash
npm run lint
npm run build
```

---

## Public site — 11 pages

| Page | Description |
|---|---|
| `/` | Home — animated hero with daily rotating wisdom quote, services, approach, testimonials, CTA |
| `/about` | About — pillars, approach steps, testimonials, CTA |
| `/personal-counselling` | Benefits with icons, 4-step process, testimonials, CTA |
| `/family-counselling` | Focus areas, philosophical differentiators, CTA |
| `/book-session` | **Full booking wizard** — calendar, real-time slot grid, details, confirm |
| `/blog` | Featured post, category pills, animated post grid, CTA |
| `/blog/[slug]` | Cover image, YouTube embed, prose body, related posts, CTA |
| `/resources` | 6 cards with category, type, read time, CTA |
| `/faq` | 8-item accordion, CTA |
| `/testimonials` | 3-column grid, CTA |
| `/contact` | Validated contact form wired to `/api/contact`, CTA |
| `/counsellor` | Profile, qualifications, specializations, CTA |

---

## Booking system

### User flow
1. Select a date from the calendar picker
2. View only available 45-minute slots for that date
3. Enter name, email, session type, and notes
4. Review and confirm — server validates slot availability again before accepting

### Slot rules
- Sessions are fixed at **45 minutes**
- **15-minute buffer** between sessions (configurable)
- Past slots are hidden automatically
- Break times are excluded from available slots
- Holiday dates show no slots
- Once booked, a slot is immediately unavailable to other users
- Double-booking is prevented at the API level — frontend validation is never trusted alone

### Slot states
| State | Appearance |
|---|---|
| Available | White card, hover accent border |
| Selected | Dark filled card |
| Booked | Greyed out, strikethrough, "booked" label |
| Blocked | Greyed out, strikethrough, "blocked" label |
| Past | Greyed out, strikethrough, "past" label |
| Break | Greyed out, strikethrough, "break" label |

---

## Admin console — 7 pages (protected)

| Page | Description |
|---|---|
| `/admin/dashboard` | Metric cards with icons + trends, recent appointments, recent enquiries, quick actions |
| `/admin/appointments` | Full appointment list with status filters, date filter, confirm/complete/cancel, admin notes |
| `/admin/availability` | Set working days, hours, break times, session duration, buffer, holiday dates |
| `/admin/wisdom` | Manage daily wisdom quotes — add, edit, delete, toggle active, pin featured |
| `/admin/enquiries` | Status management with response drafts |
| `/admin/blog` | Create, edit, draft, publish, featured toggle, delete |
| `/admin/testimonials` | Approve / hold / reject moderation |

---

## API routes

| Route | Method | Description |
|---|---|---|
| `/api/slots` | GET `?date=YYYY-MM-DD` | Returns all slots for a date with availability status |
| `/api/appointments` | POST | Create booking — double-booking protected, server-validated |
| `/api/daily-wisdom` | GET | Public — returns current daily quote. `?refresh=true&exclude=id` for random refresh |
| `/api/daily-wisdom` | POST | Admin only — create a new wisdom quote |
| `/api/daily-wisdom/[id]` | PATCH | Admin only — update quote fields |
| `/api/daily-wisdom/[id]` | DELETE | Admin only — delete a quote |
| `/api/auth/login` | POST | Admin login — sets HTTP-only session cookie |
| `/api/auth/logout` | POST | Clears session cookie |
| `/api/admin/appointments` | GET | All appointments (admin only) |
| `/api/admin/appointments/[id]` | PATCH | Update status, admin notes, or reschedule |
| `/api/admin/availability` | GET / POST | Read or replace availability configuration |
| `/api/admin/slots/block` | GET / POST / DELETE | List, add, or remove blocked slots |

---

## Daily Wisdom system

### How it works
- 18 quotes seeded across 7 categories: Stoicism, Philosophy, Mindfulness, Self-Reflection, Motivation, Existentialism, Ethics
- Server renders the initial quote at page load (no flash, no layout shift)
- Client component handles animated fade transitions and refresh interactions

### Selection logic
1. **Featured quote** — if admin pins a quote as featured, it always shows
2. **Daily deterministic** — otherwise, a quote is selected by day index (same quote all day for all visitors, changes at midnight UTC)
3. **Refresh** — "New quote" button fetches a random active quote excluding the current one

### Quote data structure
```ts
type WisdomQuote = {
  id: string;
  quote: string;
  author: string;
  source?: string;        // book / work title
  category: WisdomCategory;
  isActive: boolean;      // hidden from rotation when false
  isFeatured: boolean;    // overrides random — only one can be featured
  createdAt: string;
  updatedAt: string;
}
```

### Admin controls (`/admin/wisdom`)
- Search by quote text or author
- Filter by category (7 categories)
- Filter by status: All / Active / Inactive / Featured
- Pin/unpin featured (only one featured at a time — pinning a new one unpins the previous)
- Toggle active/inactive per quote
- Create new quotes with full form
- Edit existing quotes inline
- Delete quotes

### Frontend UX
- Animated fade-in/out transitions via Framer Motion `AnimatePresence`
- "New quote" refresh button with loading spinner
- Category badge with colour coding per category
- Author attribution with optional source title
- Decorative glow background matching site aesthetic
- Fully responsive — mobile, tablet, desktop

---

`lib/booking-store.ts` — server-side in-memory singleton store.

All booking logic (slot generation, double-booking checks, availability config) is real and production-grade. The store is designed to be a drop-in replacement for Prisma — swap the Map operations for database calls in Phase 2 without changing any API or UI code.

**Data held in store:**
- `appointments` — all bookings with full schema
- `blockedSlots` — admin-blocked individual slots
- `availabilityConfig` — working days, hours, breaks, holidays, session duration, buffer

---

## Infrastructure

- `proxy.ts` — admin route protection middleware (Next.js 16)
- `app/sitemap.ts` — full sitemap for all pages and blog posts
- `app/robots.ts` — blocks `/admin/` and `/auth/` from crawlers
- `app/not-found.tsx` — custom 404 page
- Full OG + Twitter metadata on all pages
- SVG image support via `next.config.ts`
- `scroll-margin-top` for sticky header anchor offset

---

## Phase 2 roadmap

- Replace in-memory store with Prisma + Neon PostgreSQL
- Email notifications on booking confirmation (Resend)
- User dashboard — view and cancel own appointments
- Newsletter subscription
- Cloudinary image uploads for blog and counsellor profile
- Rate limiting on booking and contact endpoints (Arcjet)
