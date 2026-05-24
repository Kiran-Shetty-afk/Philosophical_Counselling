import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/65 bg-[color:var(--color-surface-muted)]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gradient-brand)] text-lg font-bold text-white shadow-[0_12px_24px_rgba(255,193,7,0.3)]">
            B
          </span>
          <span className="max-w-44 text-sm font-semibold leading-5 text-[var(--color-text-primary)] sm:max-w-none sm:text-base">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {siteConfig.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-[var(--color-border-strong)] bg-white/85 px-5 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] lg:inline-flex"
        >
          Book a Session
        </a>
      </div>
    </header>
  );
}
