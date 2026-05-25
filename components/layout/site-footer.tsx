import Link from "next/link";
import { Mail, MapPin, Clock } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Personal Counselling", href: "/personal-counselling" },
    { label: "Family Counselling", href: "/family-counselling" },
    { label: "Book a Session", href: "/book-session" },
    { label: "Meet the Counsellor", href: "/counsellor" },
  ],
  explore: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Resources", href: "/resources" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
  ],
  contact: [
    { label: "Contact Us", href: "/contact" },
  ],
} as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white/70">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gradient-brand)] text-base font-bold text-white shadow-[0_8px_20px_rgba(255,193,7,0.28)]">
                B
              </span>
              <span className="text-base font-semibold text-[var(--color-text-primary)]">
                Benna Philosophical Counselling
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-7 text-[var(--color-text-secondary)]">
              Reflective, confidential, and human-centered support for people
              seeking clarity, resilience, and grounded decision-making.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                <a
                  href="mailto:hello@benna-philosophy.com"
                  className="transition hover:text-[var(--color-text-primary)]"
                >
                  hello@benna-philosophy.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                <span>Mon to Sat, by appointment</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                <span>Online &amp; in-person sessions</span>
              </div>
            </div>
          </div>

          {/* Services column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
              Services
            </p>
            <ul className="mt-5 grid gap-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
              Explore
            </p>
            <ul className="mt-5 grid gap-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
              Begin your journey
            </p>
            <p className="mt-5 text-sm leading-7 text-[var(--color-text-secondary)]">
              A first conversation is always calm, confidential, and without
              pressure. Reach out whenever you are ready.
            </p>
            <Link
              href="/book-session"
              className="mt-5 inline-flex rounded-full border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
            >
              Book a session
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-text-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Benna Philosophical Counselling.
            All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link
              href="/contact"
              className="transition hover:text-[var(--color-text-primary)]"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="transition hover:text-[var(--color-text-primary)]"
            >
              Terms
            </Link>
            <Link
              href="/faq"
              className="transition hover:text-[var(--color-text-primary)]"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
