# Benna Philosophical Counselling Website

A modern, production-quality Next.js website for a philosophical counselling practice. Built with a calm, premium visual language, reusable UI primitives, Framer Motion scroll animations, and a fully functional admin console.

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

## Features

### Public site (11 pages)
- **Home** — animated hero with daily rotating wisdom quote, services, approach, testimonials, CTA, contact
- **About** — pillars, approach steps, testimonials, CTA
- **Personal Counselling** — benefits with icons, 4-step process, testimonials, CTA
- **Family Counselling** — focus areas, philosophical differentiators, CTA
- **Book a Session** — validated appointment form, session options, availability, packages
- **Blog** — featured post, category pills, post grid
- **Blog post** — cover image, YouTube embed, prose body, related posts, CTA
- **Resources** — 6 cards with category, type, read time
- **FAQ** — 8-item accordion, CTA
- **Testimonials** — 3-column grid, CTA
- **Contact** — validated contact form wired to `/api/contact`, confidentiality section
- **Meet the Counsellor** — profile, qualifications, specializations, CTA

### Admin console (5 pages, protected)
- **Dashboard** — metric cards overview
- **Appointments** — confirm / pending / cancel with admin notes
- **Enquiries** — status management with response drafts
- **Blog manager** — create, edit, draft, publish, featured toggle, delete
- **Testimonials** — approve / hold / reject moderation

### API routes
- `POST /api/appointments` — Zod-validated, returns booking reference
- `POST /api/contact` — Zod-validated, returns enquiry reference
- `POST /api/auth/login` — cookie-based session auth
- `POST /api/auth/logout` — clears session cookie

### Infrastructure
- `proxy.ts` — admin route protection middleware (Next.js 16)
- `app/sitemap.ts` — full sitemap for all pages and blog posts
- `app/robots.ts` — blocks `/admin/` and `/auth/` from crawlers
- `app/not-found.tsx` — custom 404 page
- Full OG + Twitter metadata in root layout
- SVG image support via `next.config.ts`

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin console: [http://localhost:3000/auth/login](http://localhost:3000/auth/login)

Credentials are set via environment variables — see `.env.example`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

## Quality Checks

```bash
npm run lint
npm run build
```

## Phase 2 Roadmap

- Database integration (Prisma + Neon PostgreSQL)
- Email notifications (Resend)
- Real appointment persistence and admin updates
- Newsletter subscription
- Cloudinary image uploads for blog and counsellor profile
