"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { adminNavItems } from "@/lib/admin";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export function AdminShell({
  children,
  title,
  description,
}: AdminShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ec_0%,#f5efe4_100%)]">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[260px_1fr] lg:px-10">
        <aside className="rounded-[2rem] border border-[var(--color-border)] bg-white/88 p-6 shadow-[0_24px_60px_rgba(44,62,80,0.08)] lg:sticky lg:top-8 lg:self-start">
          <Link href="/" className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              Benna Admin
            </span>
            <h1 className="mt-3 text-2xl font-semibold text-[var(--color-text-primary)]">
              Practice Console
            </h1>
          </Link>

          <nav className="mt-8 grid gap-1">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-[rgba(255,193,7,0.12)] text-[var(--color-text-primary)] font-semibold"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">
              Admin workspace
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
              Manage appointments, enquiries, blog content, and testimonials
              from one controlled workspace.
            </p>
          </div>

          <form action="/api/auth/logout" className="mt-6" method="post">
            <button className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </button>
          </form>
        </aside>

        <section className="rounded-[2rem] border border-[var(--color-border)] bg-white/92 p-8 shadow-[0_24px_60px_rgba(44,62,80,0.08)] sm:p-10">
          <div className="border-b border-[var(--color-border)] pb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              Admin Workspace
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
              {title}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--color-text-secondary)]">
              {description}
            </p>
          </div>
          <div className="mt-8">{children}</div>
        </section>
      </div>
    </div>
  );
}
