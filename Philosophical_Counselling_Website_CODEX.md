# Philosophical Counselling Website
## Senior-Grade Production Architecture Document

---

## 🎨 Design System & Visual Language

### Core Aesthetic Philosophy
- **Style**: Modern minimalist cosmos-inspired UI
- **Inspiration**: Premium SaaS platforms (Vercel, Stripe, Notion aesthetics)
- **Atmosphere**: Calm, contemplative, professional yet warm
- **Target**: Senior developer-level polish with sophisticated animations

### Color Palette
```
Primary Colors:
  - Yellow/Gold:    #FFC107 (warmth, wisdom)
  - Orange:         #FF9800 (energy, transformation)
  - Green:          #4CAF50 (balance, growth)
  - Cream/Off-white: #FAFAFA (clean, spacious)

Secondary:
  - Soft Gray:      #F5F5F5 (backgrounds)
  - Text Primary:   #2C3E50 (dark, readable)
  - Text Secondary: #7F8C8D (subtle, muted)
  - Border:         #E8E8E8 (delicate separation)

Gradients:
  - Cosmic Glow:    linear-gradient(135deg, #FFC107 0%, #FF9800 100%)
  - Soft Fade:      linear-gradient(to bottom, #FAFAFA 0%, #F5F5F5 100%)
  - Reflection:     linear-gradient(135deg, rgba(255,193,7,0.1) 0%, rgba(76,175,80,0.05) 100%)

AVOID: Pure black (#000000), brown, dark grays — keeps design light and reflective
```

### Typography
```
Headings:
  - Font: Inter, Poppins, or Geist (modern, clean)
  - H1: 48px, 600-700 weight, letter-spacing 0
  - H2: 36px, 600 weight, letter-spacing 0.5px
  - H3: 24px, 600 weight, letter-spacing 0

Body:
  - Font: Inter or Geist (system fonts for performance)
  - 16px base, 1.6 line-height (readable, breathing room)
  - Font weight: 400 (regular), 500 (emphasis)

Line Height:
  - Headings: 1.2
  - Body: 1.6
  - Small text: 1.5

```

### Spacing System
```
Base unit: 8px (all spacing multiples of 8)
  8px   - xs (tight spacing)
  16px  - sm (comfortable)
  24px  - md (default section padding)
  32px  - lg (generous spacing)
  48px  - xl (large sections)
  64px  - 2xl (hero sections)

Container:
  - Max width: 1280px (xl screen)
  - Padding: 24px mobile, 48px desktop
  - Side gutters: 16px (mobile), 32px (desktop)
```

### Visual Hierarchy & Elevation
```
Elevation Levels (Tailwind shadows):
  Level 0: no shadow (flat, subtle)
  Level 1: shadow-sm (0px 1px 2px rgba)
  Level 2: shadow (0px 4px 6px rgba)
  Level 3: shadow-lg (0px 10px 15px rgba)
  Level 4: shadow-xl (0px 20px 25px rgba)

Cards:
  - Elevation: Level 2
  - Border: 1px solid #E8E8E8
  - Border-radius: 12px (consistent roundness)
  - Padding: 24px
  - Hover: elevation to Level 3 + subtle scale

Buttons:
  - Border-radius: 8px
  - Padding: 12px 24px (comfortable touch targets)
  - Hover: elevation + 2% scale + shadow expansion
  - Active: slight press down (scale 0.98)
```

---

## 🎬 Animation & Motion Design

### Philosophy
- **Principle**: Every animation serves a purpose (not decorative fluff)
- **Duration**: 600-800ms for page transitions, 300-400ms for micro-interactions
- **Easing**: ease-out for entrance, ease-in-out for continuous motion
- **Performance**: All animations GPU-accelerated (transform, opacity only)
- **Accessibility**: Full respect for `prefers-reduced-motion`

### Animation Categories

#### 1. Entrance & Exit Animations (Framer Motion)
```
Quote Cards:
  - Initial: opacity 0, y: 20px
  - Animate: opacity 1, y: 0
  - Duration: 0.6s, delay: staggered 0.1s
  - Trigger: whileInView (scroll-based)
  - Easing: easeOut

Section Reveals:
  - Initial: opacity 0, y: 40px
  - Animate: opacity 1, y: 0
  - Duration: 0.8s
  - Trigger: whileInView with viewport margin

Floating Elements (Testimonials, Features):
  - Continuous y: [-5px, 5px]
  - Duration: 3s
  - Repeat: infinity
  - Type: easieInOut (smooth wave)
```

#### 2. Cosmos Background (Three.js)
```
Features:
  - Animated starfield with parallax depth
  - Floating geometric shapes (soft, subtle)
  - Particle system responding to scroll
  - Color-shifting glow (yellow → orange → green)

Performance:
  - LOD (Level of Detail) — fewer particles on mobile
  - Throttled to 60fps
  - GPU memory conscious
  - Fallback: Static gradient on low-end devices

Interactivity:
  - Subtle mouse tracking (mouse position affects particle tilt)
  - Scroll-linked animation (slower background = parallax)
  - No janky transitions (smooth easing always)
```

#### 3. Scroll Animations (Framer Motion)
```
Navbar:
  - Entrance: opacity fade-in, 0.4s, staggered
  - Scroll: background color transition (transparent → semi-opaque)
  - Active link indicator: bottom border slide-in

Hero Section:
  - Headline: type-writer effect or word-by-word stagger
  - CTA button: subtle pulse or glow effect (infinite)
  - Background cosmos: slow parallax scroll

Features Grid:
  - Cards: staggered entrance on view
  - Icons: scale-in + rotation (spring easing)
  - Hover: elevation rise + shadow expansion

Testimonial Cards:
  - Entrance: slide in from left/right alternating
  - Hover: scale 1.02 + shadow-lg
  - Rating stars: animated count-up on view

Blog Posts:
  - Title: fade-in
  - Image: zoom-in slow (ken-burns effect)
  - Excerpt: fade-in delayed
```

#### 4. Micro-Interactions (CSS + Tailwind)
```
Buttons:
  - Hover: bg shift darker + elevation lift
  - Active: scale 0.98 (press effect)
  - Focus: ring outline (yellow/orange)
  - Transition: all 0.3s ease-out

Form Inputs:
  - Focus: border color to accent color
  - Error state: red border + shake animation
  - Success: green checkmark + fade-in
  - Placeholder: fade out on type

Links:
  - Hover: underline slide-in from left
  - Color: smooth transition to hover color
  - No click delay (pointer-events handled)

Loading States:
  - Skeleton loaders: pulsing animation (opacity 0.5 → 1.0)
  - Spinner: smooth rotation (360deg, 1.5s linear)
  - Progress bar: smooth width transition

Icons:
  - Hover: scale 1.1 + color shift
  - Rotate on active: 180deg smooth rotation
  - Glow on focus: yellow/orange shadow
```

#### 5. Page Transitions (Framer Motion)
```
Layout Animation:
  - Exit: fade out, 0.3s
  - Enter: fade in, 0.4s
  - Stagger child elements: 0.05s delay each

Modal/Drawer:
  - Backdrop: fade in (opacity 0 → 0.5)
  - Content: slide in from right (x: 100% → 0)
  - Duration: 0.4s, easing: easeOut

Navigation:
  - Route change: smooth fade transition
  - No jarring jumps or flashes
```

---

## 🏗️ Project Architecture

### Tech Stack

**Frontend Excellence**
```
Core:
  - Next.js 14+ (App Router, modern patterns)
  - React 18 (concurrent features, suspense)
  - TypeScript (strict mode, full type safety)
  - Tailwind CSS 3.3+ (utility-first, custom config)

UI Components:
  - shadcn/ui (accessible, customizable)
  - Radix UI (headless components)
  - Custom components (tailored for cosmos theme)

Animations & Visuals:
  - Framer Motion 10+ (production-proven)
  - Three.js (GPU-accelerated 3D canvas)
  - CSS Animations (performant micro-interactions)

Forms & Data:
  - React Hook Form (lightweight, performant)
  - Zod (schema validation, type-safe)
  - Server Actions (Phase 2+, cleaner data flow)

Styling:
  - Tailwind CSS (base + custom layer)
  - CSS Modules (scoped styles if needed)
  - CSS-in-JS for dynamic styles (minimal)
```

**Backend & Database**
```
API Layer:
  - Next.js API Routes (serverless functions)
  - Server Actions (Phase 2+)
  - REST endpoints (JSON, no GraphQL complexity)

Database:
  - PostgreSQL 15+ (relational, powerful)
  - Neon (serverless, free tier, Vercel integration)
  - Prisma ORM (type-safe, migrations, excellent DX)

Authentication:
  - NextAuth.js 4.24+ (sessions, role-based access)
  - Secure password hashing (bcrypt)
  - HTTP-only cookies (no client-side token exposure)

Rate Limiting & Security:
  - Arcjet (easy integration, free tier)
  - Middleware-based protection
  - Request validation (Zod)

Error Tracking & Monitoring:
  - Sentry (error monitoring, free tier)
  - Vercel Analytics (performance, privacy-friendly)
  - Custom logging (development vs production)
```

**Deployment & Hosting**
```
Hosting:
  - Vercel (Next.js native, optimal)
  - Edge functions (geographically distributed)
  - Free tier sufficient for MVP

Database:
  - Neon PostgreSQL (free tier: 3GB, 1 project)
  - Automatic backups, SSL secure

Media Storage:
  - Cloudinary (free tier: 25GB, 25K transformations)
  - Image optimization, CDN delivery
  - Alternative: Vercel Blob (simpler, integrated)

Email Service:
  - EmailJS MVP (client-side, 200/month)
  - Migration path: Resend (server-side, reliable)

Version Control:
  - GitHub (public repo, portfolio showcase)
  - GitHub Actions (CI/CD, automated tests)
```

---

## 🎯 Core Pages & Features

### Phase 1: MVP (4-6 weeks) — Launch-Ready

**Pages (11 total)**
```
1. Home / Landing
   - Hero: cosmos background + animated headline + CTA
   - Features: 3-4 key differentiators (cards with icons)
   - Quote: daily wisdom rotating display
   - CTA: "Book Your Session" prominent
   - Footer: links, newsletter signup

2. About Philosophical Counselling
   - Hero: what is philosophical counselling?
   - Three pillars: philosophy + counselling + wisdom
   - Approach section: methodology explanation
   - Why choose us: 4-5 trust factors

3. Personal Counselling
   - Hero: focus on individual growth
   - What to expect: step-by-step process
   - Benefits: list with icons
   - Testimonials: 2-3 success stories
   - CTA: Book appointment

4. Family Counselling
   - Hero: strengthen family bonds
   - Scope: what it covers
   - Process: visual timeline
   - Testimonials: family success stories
   - CTA: Book appointment

5. Contact Page
   - Contact form: name, email, message, subject
   - Enquiry tracking system (database)
   - Response template: auto-response email
   - Success state: confirmation message + timeline
   - Office info: email, phone (if applicable)

6. FAQ Page
   - Accordion component (smooth expand/collapse)
   - Categories: appointment, process, confidentiality
   - Search functionality: filter FAQs by keyword
   - Expandable sections with proper animation

7. Resources Page
   - Curated links: philosophical works, articles
   - Categories: Stoicism, Existentialism, etc.
   - Cards with previews (link, description, icon)
   - No admin updates needed Phase 1

8. Testimonials Page
   - Hero: real transformation stories
   - Grid layout: 6-9 testimonials
   - Rating display: 5-star system
   - Filter by type: personal, family, general

9. Meet Your Counsellor
   - Counsellor profile(s)
   - Photo, bio, qualifications
   - Specializations
   - Session availability (basic calendar, Phase 1)
   - CTA: Book with this counsellor

10. Admin Dashboard (Protected)
    - Login only (NextAuth.js)
    - Appointment overview: list, status filters
    - Enquiry inbox: unread, replied, archived
    - Basic analytics: appointment count, website traffic
    - Testimonial moderation: approve/reject

11. Blog Homepage
    - Blog listing: 3-6 recent posts
    - Featured post: larger card, prominent
    - Categories: simple list, no admin yet
    - Search: basic filter by title/tag
    - Individual post page: markdown rendering
```

**Features (10 core)**
```
1. Enquiry Booking System
   - Form: subject, message, phone (optional)
   - Database storage (PostgreSQL)
   - Rate limiting: 3 per day per IP
   - Email notification: to admin
   - Admin dashboard: view, filter by status
   - User tracking: linked to user account

2. Appointment Booking
   - Form: date, time, duration, notes
   - Calendar display: available slots (hardcoded Phase 1)
   - Validation: prevent past dates, overlaps
   - Confirmation: email to user + admin
   - Database: PostgreSQL with full audit trail
   - Admin can view/confirm/cancel

3. Contact Form
   - Fields: name, email, message
   - Validation: Zod schema
   - Rate limiting: 5 per day per IP
   - Email: EmailJS integration
   - Success message: form clears, thank you displayed

4. Newsletter Subscription
   - Single email input: clean, focused
   - Validation: email format
   - Database: NewsletterSubscriber table
   - Rate limiting: 1 per email per day
   - Confirmation: "Check your email" message

5. Testimonials Section
   - Display: grid of cards (3 columns desktop, 1 mobile)
   - Fields: name, role, content, rating, image
   - Admin moderation: approval workflow
   - Soft delete: marked but not removed
   - Animations: scale-in on hover, subtle glow

6. Daily Wisdom / Quotes
   - Random rotation: new quote per page load/daily
   - Database or hardcoded array Phase 1
   - Display: floating card, centered
   - Animation: fade-in + subtle bob
   - Optional: quote source/author

7. Confidentiality Promise Section
   - Prominent on home + about page
   - Transparency: clear privacy statement
   - Link to full privacy policy (or embedded)
   - Trust badge: professional assurance

8. Certifications / Qualifications Display
   - Counsellor profile section
   - List: credentials, training, certifications
   - Icons or badges for visual hierarchy
   - Non-negotiable: displayed prominently

9. Session Packages Info
   - Three options (example):
     • Single Session: $X per session
     • 5-Session Plan: $Y (discounted)
     • 10-Session Plan: $Z (best value)
   - Displayed on booking page
   - Note: No actual payment processing (informational only)
   - Future: Can add payment when needed

10. Before Session Guide
    - PDF downloadable or page content
    - Sections: what to expect, how to prepare, tips
    - Calming tone: reduce anxiety
    - Clear formatting: easy to scan
```

**Design Implementation Notes**
```
Hero Sections:
  - Full-width cosmos background (Three.js)
  - Centered text overlay (good contrast)
  - Animated headline: stagger or typewriter
  - CTA button: prominent, glowing effect on hover
  - Responsive: mobile-friendly, text resizes

Cards & Components:
  - Elevation: subtle shadow (Level 2)
  - Hover: elevation increase (Level 3), scale 1.02
  - Border: 1px #E8E8E8 (subtle, clean)
  - Spacing: 24px padding inside
  - Icons: consistent sizing (24px, 32px, 48px)

Forms:
  - Clean layout: one input per line (desktop)
  - Labels: above inputs, clear hierarchy
  - Focus states: yellow/orange border + shadow
  - Validation: inline errors, clear messaging
  - Success state: green checkmark + confirmation
  - Mobile: full-width inputs, no side-by-side

Lists & Grids:
  - Card grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
  - Gaps: 24px between cards
  - Consistent heights: no awkward layout shifts
  - Responsive images: object-cover, aspect-ratio maintained

Animations:
  - Page load: staggered entrance of sections
  - Scroll: reveal animations on view (whileInView)
  - Hover: card lift, icon rotation, color shift
  - Form submit: success animation + redirect or confirmation
```

---

### Phase 2: Growth (6-8 weeks) — Scale Up

**Features Added**
```
1. Blog System (Full)
   - Admin editor: create, edit, delete posts
   - Markdown support: formatting, code blocks
   - SEO: slug, meta description, OG image
   - Publishing: draft/published toggle
   - Categories: assign to posts, filter on blog page

2. Admin Dashboard (Enhanced)
   - Blog post management: list, edit, delete
   - Appointment management: confirm, cancel, notes
   - Enquiry management: reply, mark resolved
   - Analytics: appointments booked, enquiries received
   - User management: view clients, counselors

3. Success Stories / Case Studies
   - Dedicated page: curated testimonials
   - Rich content: description, context, outcome
   - Images: before/after if applicable
   - Admin moderation: approval workflow

4. Meet Your Counsellor (Enhanced)
   - Multiple profiles if applicable
   - Specializations: visible badges
   - Availability: integration with appointment system
   - Booking: direct link to book with specific counselor

5. Resources Page (Admin)
   - Admin can add/edit/delete resources
   - Categories: Stoicism, Existentialism, Buddhism, etc.
   - Each resource: title, URL, category, preview

6. FAQ (Dynamic)
   - Admin add/edit/delete questions
   - Categories: appointment, process, confidentiality, etc.
   - Search: filter by keyword
   - Accordion: smooth expand/collapse animation

7. User Authentication
   - Client login: view own appointments, profile
   - Counselor login: manage schedule, write blogs
   - Password reset: secure token flow
   - Session management: auto-logout on inactivity
```

---

### Phase 3: Engagement (8+ weeks) — Deepen Connection

**Features Added**
```
1. Guided Journaling
   - Create entries: rich text editor
   - Save drafts: auto-save to database
   - Private: only visible to user
   - Reflection tools: mood selector, tags, keywords

2. Philosophy Paths (Learning Modules)
   - Curated learning paths: Stoicism, Existentialism, etc.
   - Modules: bite-sized lessons
   - Progress tracking: completion percentage
   - Downloadable: PDFs, resources

3. Meaning of Life Quiz
   - Interactive: multi-question assessment
   - Result insights: personalized reflection
   - Database: store responses, not judgmental
   - Share: optional, sharable results

4. Life Journey Timeline
   - Interactive visualization: user's milestones
   - Editable: add, edit, delete events
   - Visual: timeline with icons, descriptions
   - Reflection: journaling integrated

5. Reflection Wall (renamed from Community Wall)
   - Anonymous posts: thoughts, observations
   - Moderation: admin approval
   - Upvoting: community engagement (optional)
   - Private: archived after time or admin action

6. Emotional Compass
   - Visual tool: plot emotions on a spectrum
   - Reflective: tracks patterns over time
   - Shareable: optional, privacy respected
   - Interactive: drag, click, visualize
```

---

## 🗄️ Database Schema (Prisma)

```prisma
// ============================================
// USER & AUTHENTICATION
// ============================================

enum UserRole {
  CLIENT
  COUNSELOR
  ADMIN
}

model User {
  id String @id @default(cuid())
  email String @unique
  name String
  phone String?
  password String // hashed with bcrypt
  role UserRole @default(CLIENT)
  
  // Relations
  appointments Appointment[]
  enquiries Enquiry[]
  journalEntries JournalEntry[]
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime? // soft delete
}

// ============================================
// COUNSELOR PROFILES
// ============================================

model Counselor {
  id String @id @default(cuid())
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String @unique
  
  bio String
  specializations String[] // ["Personal Growth", "Family"]
  qualifications String[] // ["MA Philosophy", "Certified Counselor"]
  certifications String[] // ["IACP", "British Association"]
  image String? // Cloudinary URL
  
  // Relations
  appointments Appointment[]
  blogPosts BlogPost[]
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ============================================
// APPOINTMENTS
// ============================================

enum AppointmentStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}

model Appointment {
  id String @id @default(cuid())
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String
  counselor Counselor @relation(fields: [counselorId], references: [id])
  counselorId String
  
  startTime DateTime
  endTime DateTime
  duration Int // in minutes
  status AppointmentStatus @default(PENDING)
  notes String? // client notes
  adminNotes String? // counselor notes
  sessionPackage String? // "Single Session", "5-Session Plan"
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime? // soft delete
}

// ============================================
// ENQUIRIES
// ============================================

enum EnquiryStatus {
  NEW
  IN_PROGRESS
  RESOLVED
}

model Enquiry {
  id String @id @default(cuid())
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String
  
  subject String
  message String
  status EnquiryStatus @default(NEW)
  response String?
  respondedAt DateTime?
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime? // soft delete
}

// ============================================
// BLOG POSTS
// ============================================

model BlogPost {
  id String @id @default(cuid())
  title String
  slug String @unique
  content String // markdown
  excerpt String
  author Counselor @relation(fields: [authorId], references: [id])
  authorId String
  
  image String? // Cloudinary URL
  published Boolean @default(false)
  tags String[]
  views Int @default(0)
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime? // soft delete
}

// ============================================
// TESTIMONIALS
// ============================================

model Testimonial {
  id String @id @default(cuid())
  clientName String
  clientRole String? // "Software Engineer", "Student"
  content String
  rating Int @default(5) // 1-5 stars
  image String? // Cloudinary URL
  approved Boolean @default(false)
  
  // Timestamps
  createdAt DateTime @default(now())
  deletedAt DateTime? // soft delete
}

// ============================================
// GUIDED JOURNALING (Phase 3)
// ============================================

model JournalEntry {
  id String @id @default(cuid())
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String
  
  title String?
  content String
  mood String? // "happy", "anxious", "neutral"
  tags String[]
  isPrivate Boolean @default(true)
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ============================================
// REFLECTION WALL (Phase 3)
// ============================================

model ReflectionPost {
  id String @id @default(cuid())
  content String
  isAnonymous Boolean @default(true)
  approved Boolean @default(false)
  likes Int @default(0)
  
  // Timestamps
  createdAt DateTime @default(now())
  deletedAt DateTime? // soft delete
}

// ============================================
// NEWSLETTER SUBSCRIPTION
// ============================================

model NewsletterSubscriber {
  id String @id @default(cuid())
  email String @unique
  subscribed Boolean @default(true)
  
  // Timestamps
  createdAt DateTime @default(now())
  unsubscribedAt DateTime?
}
```

---

## 📁 Project Structure

```
philosophical-counselling/
├── app/
│   ├── layout.tsx                 # Root layout + metadata
│   ├── page.tsx                   # Home page
│   ├── robots.ts                  # robots.txt
│   ├── sitemap.ts                 # sitemap.xml
│   │
│   ├── (public)/
│   │   ├── about/page.tsx
│   │   ├── personal-counselling/page.tsx
│   │   ├── family-counselling/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── testimonials/page.tsx
│   │   ├── counsellors/page.tsx
│   │   └── blog/
│   │       ├── page.tsx           # Blog listing
│   │       └── [slug]/page.tsx    # Blog post detail
│   │
│   ├── api/
│   │   ├── appointments/
│   │   │   ├── route.ts           # POST: create appointment
│   │   │   └── [id]/route.ts      # PUT: update appointment
│   │   ├── enquiries/route.ts     # POST: submit enquiry
│   │   ├── newsletter/route.ts    # POST: subscribe
│   │   ├── contact/route.ts       # POST: contact form
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   └── health/route.ts        # Health check
│   │
│   ├── (admin)/
│   │   ├── admin/
│   │   │   ├── layout.tsx         # Admin layout (protected)
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── appointments/page.tsx
│   │   │   ├── enquiries/page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   └── testimonials/page.tsx
│   │   │
│   │   └── auth/
│   │       ├── login/page.tsx
│   │       └── register/page.tsx  # Counselor registration
│   │
│   └── (user)/
│       └── dashboard/
│           ├── page.tsx           # User dashboard (Phase 2)
│           └── appointments/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CosmosBackground.tsx   # Three.js canvas
│   │   └── Sidebar.tsx            # Admin sidebar
│   │
│   ├── ui/                        # shadcn/ui + customizations
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Accordion.tsx
│   │   └── ...others
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTA.tsx
│   │   └── DailyWisdom.tsx
│   │
│   ├── forms/
│   │   ├── AppointmentForm.tsx
│   │   ├── EnquiryForm.tsx
│   │   ├── ContactForm.tsx
│   │   ├── NewsletterForm.tsx
│   │   └── LoginForm.tsx
│   │
│   └── common/
│       ├── LoadingSpinner.tsx
│       ├── EmptyState.tsx
│       ├── SkeletonLoader.tsx
│       └── ErrorBoundary.tsx
│
├── lib/
│   ├── prisma.ts                  # Prisma client singleton
│   ├── auth.ts                    # NextAuth configuration
│   ├── validation.ts              # Zod schemas
│   ├── utils.ts                   # Helper functions
│   ├── constants.ts               # App constants
│   ├── db.ts                      # Database utilities
│   └── middleware.ts              # Middleware helpers
│
├── styles/
│   ├── globals.css                # Tailwind directives
│   ├── animations.css             # Custom keyframes
│   ├── colors.css                 # CSS variables (colors)
│   └── themes.css                 # Theme configurations
│
├── config/
│   ├── site.ts                    # Site metadata
│   ├── navigation.ts              # Nav structure
│   └── features.ts                # Feature flags
│
├── public/
│   ├── images/
│   │   ├── counsellor.jpg
│   │   ├── testimonials/
│   │   └── logos/
│   ├── fonts/
│   │   └── geist.woff2
│   └── icons/
│       └── favicon.ico
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── middleware.ts                  # NextAuth, rate limiting
├── .env.local                     # Local environment
├── .env.example                   # Template
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── postcss.config.js
└── README.md
```

---

## 🎨 Component Examples (Premium Quality)

### Button Component (shadcn/ui + customization)
```tsx
// components/ui/Button.tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:shadow-lg hover:scale-105 active:scale-98",
        secondary: "bg-green-100 text-green-900 hover:bg-green-200 border border-green-300",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline: "border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-9 px-3",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      {props.children}
    </button>
  )
);

export { Button, buttonVariants };
```

### Card Component (Elevation, Hover Effects)
```tsx
// components/ui/Card.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: "none" | "sm" | "md" | "lg";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevation = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:scale-105",
        elevation === "none" && "shadow-none",
        elevation === "sm" && "shadow-sm",
        elevation === "md" && "shadow-md",
        elevation === "lg" && "shadow-lg",
        className
      )}
      {...props}
    />
  )
);

export { Card };
```

### Animated Section (Framer Motion)
```tsx
// components/sections/AnimatedSection.tsx
"use client";

import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedSection({ children, delay = 0, className }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## 🔐 Security & Best Practices

```
Authentication:
  ✓ NextAuth.js v4.24+ (production-tested)
  ✓ Bcrypt password hashing (cost factor: 12)
  ✓ HTTP-only cookies (no client-side token exposure)
  ✓ CSRF protection (built into Next.js)
  ✓ Session timeout: 30 days
  ✓ Password reset: secure token (expires in 1 hour)

Authorization:
  ✓ Role-based access control (CLIENT, COUNSELOR, ADMIN)
  ✓ Protected routes: middleware checks
  ✓ API endpoints: role validation on each request
  ✓ Database: user_id checks prevent cross-access

Data Protection:
  ✓ All sensitive data in environment variables
  ✓ Input validation: Zod schemas on every form
  ✓ SQL injection protection: Prisma parameterized queries
  ✓ XSS prevention: React auto-escaping, CSP headers
  ✓ HTTPS enforced: Vercel automatic SSL

Rate Limiting:
  ✓ Arcjet integration on API routes
  ✓ Contact form: 5 requests/day per IP
  ✓ Enquiry form: 3 requests/day per IP
  ✓ Newsletter: 1 per email per day
  ✓ Appointment: unlimited (authenticated only)

Privacy & Compliance:
  ✓ GDPR-compliant: data export, delete on request
  ✓ Confidentiality promise: prominently displayed
  ✓ Privacy policy: linked in footer
  ✓ Soft deletes: data recovery for 90 days
  ✓ Audit logs: all sensitive actions logged
```

---

## 📊 Performance & SEO

### Performance Targets
```
Core Web Vitals:
  LCP (Largest Contentful Paint): < 2.5s ✓
  FID (First Input Delay): < 100ms ✓
  CLS (Cumulative Layout Shift): < 0.1 ✓
  
Lighthouse Scores (target 90+):
  Performance: 95+
  Accessibility: 98+
  Best Practices: 95+
  SEO: 100

Optimizations:
  ✓ Image optimization: next/image, WebP
  ✓ Code splitting: dynamic imports, lazy loading
  ✓ CSS-in-JS: minimal, production builds only
  ✓ Font loading: system fonts + custom (preload)
  ✓ Three.js: lazy load, LOD (Level of Detail)
  ✓ Animations: GPU-accelerated (transform, opacity)
  ✓ Caching: ISR (Incremental Static Regeneration)
```

### SEO Strategy
```
Technical SEO:
  ✓ Dynamic metadata: generateMetadata() per page
  ✓ Sitemap generation: next-sitemap plugin
  ✓ robots.txt: allow crawling, prevent admin
  ✓ Canonical URLs: self-referential
  ✓ Mobile-first indexing: responsive design
  ✓ Structured data: JSON-LD (article, local business)
  ✓ Open Graph: social sharing cards
  ✓ Twitter Cards: custom previews

Content SEO:
  ✓ Blog: keyword-rich titles, meta descriptions
  ✓ Headings: proper H1-H3 hierarchy
  ✓ Internal linking: cross-post recommendations
  ✓ Alt text: all images described
  ✓ Schema markup: FAQs, breadcrumbs
  ✓ Keywords: target "philosophical counselling"
```

---

## 🚀 Implementation Timeline

### Week 1-2: Setup & Foundation (Premium Start)
```
Day 1-3: Project Initialization
  - Create Next.js 14 project (TypeScript)
  - Install Tailwind, shadcn/ui, Framer Motion
  - Set up Tailwind custom config (colors, fonts, animations)
  - Create CSS variables for theme (colors.css)
  
Day 4-5: Database & Auth
  - Neon PostgreSQL setup
  - Prisma schema creation (all models)
  - NextAuth.js configuration
  - Middleware for role-based access
  
Day 6-7: Design System
  - Create Button, Card, Input, Modal components
  - Set up animation utilities (Framer Motion)
  - Build Navbar, Footer components
  - Create CosmosBackground Three.js component
  - Implement loading states, skeleton loaders
  
Day 8-10: GitHub & Deployment
  - Push to GitHub repository
  - Set up Vercel integration
  - Configure environment variables
  - Test deployment pipeline
```

### Week 3-4: Core Pages (Visual Polish)
```
Days 11-13: Landing Page
  - Hero section: cosmos background + animated headline
  - Features section: 3-4 cards with staggered animation
  - Daily wisdom quote: rotating display
  - CTA section: prominent "Book Now" button
  - Footer: responsive, newsletter signup
  
Days 14-16: Service Pages
  - About page: full-page layout
  - Personal/Family counselling pages
  - Counsellor profiles: image, bio, specializations
  - Trust sections: certifications, confidentiality promise
  
Days 17-19: Forms & Interactions
  - Contact form: validation, success state
  - Appointment booking: calendar, form, confirmation
  - Enquiry form: database integration
  - Newsletter: signup with email validation
  - Rate limiting: Arcjet integration

Days 20-21: Pages
  - FAQ: accordion component
  - Resources: curated link cards
  - Testimonials: grid layout
```

### Week 5-6: Authentication & Polish (Professional Finish)
```
Days 22-24: Admin Dashboard
  - Login page (NextAuth.js)
  - Dashboard layout: sidebar navigation
  - Appointments: list, filter, update
  - Enquiries: inbox, reply, status
  - Testimonials: approval workflow
  
Days 25-27: SEO & Monitoring
  - Sitemap generation
  - robots.txt configuration
  - Meta tags: home, about, blog (dynamic)
  - Structured data: JSON-LD schemas
  - Sentry integration: error tracking
  
Days 28-30: Testing & Optimization
  - Lighthouse optimization: target 90+
  - Cross-browser testing: Chrome, Firefox, Safari
  - Mobile testing: responsive design
  - Accessibility: keyboard navigation, screen readers
  - Performance: bundle size, animation smoothness
  
Day 31: Deployment & Launch
  - Final Vercel deployment
  - DNS configuration
  - Email setup (EmailJS)
  - Live monitoring: Sentry, Analytics
  - Launch announcement
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.3.0",
    "framer-motion": "^10.16.0",
    "three": "^r160.0.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "next-auth": "^4.24.0",
    "@prisma/client": "^5.7.0",
    "emailjs-com": "^3.2.0",
    "axios": "^1.6.0",
    "next-mdx-remote": "^5.0.0",
    "next-sitemap": "^4.1.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "sentry-next": "^7.91.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "@types/three": "^r160.0.0",
    "prisma": "^5.7.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.1.0",
    "playwright": "^1.40.0"
  }
}
```

---

## 🎯 Key Design Principles (Senior Dev Standard)

```
1. Visual Hierarchy
   - Headings dominate, body text readable
   - Interactive elements: obvious, inviting
   - Whitespace: breathing room, not cramped
   - Color: strategic use, not chaotic

2. Micro-Interactions
   - Every action: subtle feedback (animation)
   - No sudden layout shifts (CLS = 0)
   - Hover states: clear, inviting
   - Loading states: elegant spinners, not jarring

3. Typography
   - Font: modern (Inter, Geist)
   - Hierarchy: size, weight, color
   - Line height: readable (1.6 body, 1.2 headings)
   - Letter spacing: subtle, not overdone

4. Color Usage
   - Primary: yellow/orange (warmth, wisdom)
   - Secondary: green (balance, growth)
   - Accent: understated, purposeful
   - Contrast: WCAG AA (4.5:1) minimum

5. Spacing & Alignment
   - Base unit: 8px (consistent grid)
   - Padding: generous (24px+ sections)
   - Gaps: consistent (16px, 24px)
   - Alignment: intentional, not random

6. Animation Standards
   - Duration: 300-800ms (not too slow)
   - Easing: ease-out entrance, ease-in-out motion
   - Performance: GPU-accelerated only
   - Accessibility: prefers-reduced-motion respected

7. Responsiveness
   - Mobile-first: start small, enhance larger
   - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
   - Touch targets: 44px minimum (accessibility)
   - Images: responsive, object-cover, aspect-ratio
```

---

## 🚦 Success Metrics (Phase 1)

```
Launch Quality:
  ✓ 95+ Lighthouse Performance
  ✓ 98+ Accessibility score
  ✓ < 2.5s LCP (Largest Contentful Paint)
  ✓ 0 layout shifts (CLS)
  ✓ All animations smooth (60fps)
  ✓ Mobile responsive: 320px - 1920px

User Engagement:
  ✓ Appointment bookings: trackable
  ✓ Form submissions: monitored
  ✓ Page load time: < 2 seconds
  ✓ Mobile conversion: > 60%
  ✓ Bounce rate: < 50%

Technical Excellence:
  ✓ Type safety: strict TypeScript
  ✓ Error handling: Sentry tracking
  ✓ Security: OWASP Top 10 covered
  ✓ Performance: no memory leaks
  ✓ Accessibility: WCAG 2.1 AA
```

---

## 🎓 Learning Resources

- **Next.js**: https://nextjs.org/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Three.js**: https://threejs.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Prisma**: https://www.prisma.io/docs
- **shadcn/ui**: https://ui.shadcn.com/
- **NextAuth.js**: https://next-auth.js.org/

---

## 📝 Final Notes

**This is not just another project—it's a portfolio piece.**

Every detail matters:
- **Animations**: Smooth, purposeful, performant
- **Design**: Modern, clean, professional
- **Code**: Type-safe, well-organized, scalable
- **UX**: Delightful, accessible, responsive
- **Performance**: Fast, efficient, optimized

**Launch Phase 1 perfectly. Master Phase 2. Expand Phase 3.**

---

**Document Version**: 2.0 (Codex Format)
**Last Updated**: May 21, 2026
**Status**: Ready for Senior Developer Implementation
