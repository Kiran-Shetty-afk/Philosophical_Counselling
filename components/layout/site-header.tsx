"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/65 bg-[color:var(--color-surface-muted)]/88 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--gradient-brand)] text-lg font-bold text-white shadow-[0_12px_24px_rgba(255,193,7,0.3)]">
            B
          </span>
          <span className="max-w-[9.5rem] text-sm font-semibold leading-5 text-[var(--color-text-primary)] sm:max-w-[13rem] sm:text-base lg:max-w-none">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                isActive(item.href)
                  ? "bg-[rgba(255,193,7,0.12)] text-[var(--color-text-primary)] font-semibold"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(255,193,7,0.07)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book-session"
            className="hidden rounded-full border border-[var(--color-border-strong)] bg-white/88 px-5 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] md:inline-flex"
          >
            Book a Session
          </Link>

          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white/88 text-[var(--color-text-primary)] transition hover:border-[var(--color-accent)] xl:hidden"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/60 bg-white/92 transition-all duration-300 xl:hidden",
          isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto grid w-full max-w-7xl gap-1 px-4 py-4 sm:px-8">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive(item.href)
                  ? "bg-[rgba(255,193,7,0.12)] text-[var(--color-text-primary)] font-semibold"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]",
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
