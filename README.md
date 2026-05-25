# Benna Philosophical Counselling Website

A modern, production-quality Next.js website for a philosophical counselling practice. Built with a calm, premium visual language, reusable UI primitives, Framer Motion scroll animations, a fully functional admin console, a complete appointment booking system, and a dynamic Daily Wisdom system.

---

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

---

## Admin credentials

Default credentials (override via environment variables):

| Field | Value |
|---|---|
| Email | `admin@benna-philosophy.com` |
| Password | `Admin@12345` |

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local` to override.

---

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

## Public site — 12 pages

| Page | Description |
|---|---|
| `/` | Home — two-column hero with daily wisdom card, services, approach, testimonials, CTA, contact |
| `/about` | Pillars, approach steps, testimonials, CTA |
| `/personal-counselling` | Benefits with icons, 4-step process, testimonials, CTA |
| `/family-counselling` | Focus areas, philosophical differentiators, CTA |
| `/book-session` | Full booking wizard — calendar, real-time slot grid, details, confirm |
| `/blog` | Featured post, category pills, animated post grid, CTA |
| `/blog/[slug]` | Cover image, YouTube embed, prose body, related posts, CTA |
| `/resources` | 6 cards with category, type, read time, CTA |
| `/faq` | 8-item accordion, CTA |
| `/testimonials` | 3-column grid, CTA |
| `/contact` | Validated contact form wired to `/api/contact`, CTA |
| `/counsellor` | Profile, qualifications, specializations, CTA |

---

## Admin console — 7 pages (protected)

| Page | Description |
|---|---|
| `/admin/dashboard` | Metric cards with icons + trends, recent appointments, recent enquiries, quick actions |
| `/admin/appointments` | Full list with status filters, date filter, confirm/complete/cancel, admin notes |
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
| `/api/contact` | POST | Submit contact enquiry |
| `/api/daily-wisdom` | GET | Public — returns current daily quote |
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

## Booking system

### User flow
1. Select a date from the calendar picker
2. View only available 45-minute slots for that date
3. Enter name, email, session type, and notes
4. Review and confirm — server re-validates slot availability before accepting

### Slot rules
- Sessions fixed at **45 minutes**, **15-minute buffer** between sessions (both configurable by admin)
- Past slots hidden automatically
- Break times excluded from available slots
- Holiday dates show no slots
- Once booked, a slot is immediately unavailable to other users
- Double-booking prevented at API level — frontend validation never trusted alone

### Slot states

| State | Appearance |
|---|---|
| Available | White card, hover accent border |
| Selected | Dark filled card |
| Booked | Greyed out, strikethrough, "booked" label |
| Blocked | Greyed out, strikethrough, "blocked" label |
| Past | Greyed out, strikethrough, "past" label |
| Break | Greyed out, strikethrough, "break" label |

### Booking store (`lib/booking-store.ts`)
Server-side in-memory singleton. All logic is production-grade and Prisma-ready — swap Map operations for database calls in Phase 2 without changing any API or UI code.

**Data held:**
- `appointments` — all bookings with full schema
- `blockedSlots` — admin-blocked individual slots
- `availabilityConfig` — working days, hours, breaks, holidays, session duration, buffer

---

## Daily Wisdom system

### How it works
- 18 quotes seeded across 7 categories: Stoicism, Philosophy, Mindfulness, Self-Reflection, Motivation, Existentialism, Ethics
- Quote is server-rendered inside the hero card at page load — no flash, no layout shift
- Changes automatically once per day at midnight UTC
- Admin can override at any time by pinning a featured quote

### Selection logic
1. **Featured quote** — if admin pins a quote, it always shows until unpinned
2. **Daily deterministic** — otherwise selected by day index (same quote all day for all visitors)
3. Inactive quotes are never shown

### Quote data structure

```ts
type WisdomQuote = {
  id: string;
  quote: string;
  author: string;
  source?: string;       // book / work title
  category: WisdomCategory;
  isActive: boolean;     // excluded from rotation when false
  isFeatured: boolean;   // overrides daily rotation — only one at a time
  createdAt: string;
  updatedAt: string;
}

type WisdomCategory =
  | "Stoicism" | "Philosophy" | "Mindfulness"
  | "Self-Reflection" | "Motivation" | "Existentialism" | "Ethics"
```

### Admin controls (`/admin/wisdom`)
- Search by quote text or author
- Filter by category (7 categories) and status (All / Active / Inactive / Featured)
- Pin/unpin featured — pinning a new one auto-unpins the previous
- Toggle active/inactive per quote
- Create, edit, and delete quotes

### Frontend UX
- Quote displayed in the floating glassmorphism card on the right side of the hero
- Original `animate-float-soft` CSS animation preserved
- Author attribution with optional italic source title
- Two mini-cards below link to `/personal-counselling` and `/family-counselling`
- No refresh button — quote changes daily or when admin pins a new one

### Wisdom store (`lib/wisdom-store.ts`)
Server-side in-memory singleton. Same Prisma-ready pattern as the booking store.

---

## Infrastructure

- `proxy.ts` — admin route protection middleware (Next.js 16)
- `app/sitemap.ts` — full sitemap for all pages and blog posts
- `app/robots.ts` — blocks `/admin/` and `/auth/` from crawlers
- `app/not-found.tsx` — custom 404 page
- Full OG + Twitter metadata on all pages
- SVG image support via `next.config.ts`
- `scroll-margin-top` for sticky header anchor offset
- Active link highlighting in header (desktop + mobile)
- Admin layout isolated from public layout (no shared header/footer)

---

## Design system

| Token | Value |
|---|---|
| Background | `#faf7f1` |
| Surface | `#fffdf8` |
| Surface muted | `#f6efe3` |
| Text primary | `#2c3e50` |
| Text secondary | `#70808b` |
| Border | `#e7e0d4` |
| Accent | `#ff9800` |
| Accent soft | `#ffc107` |
| Gradient brand | `135deg, #ffc107 → #ff9800` |

All components use CSS custom properties. No hardcoded colour values in component files.

---

## Phase 2 roadmap

- Replace in-memory stores with Prisma + Neon PostgreSQL
- Email notifications on booking confirmation (Resend)
- User dashboard — view and cancel own appointments
- Newsletter subscription
- Cloudinary image uploads for blog and counsellor profile
- Rate limiting on booking and contact endpoints (Arcjet)
- Counsellor registration page
- User authentication (client login)
