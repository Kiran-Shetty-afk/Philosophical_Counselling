import Link from "next/link";

import { adminNavItems } from "@/lib/admin";

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
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ec_0%,#f5efe4_100%)]">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[260px_1fr] lg:px-10">
        <aside className="rounded-[2rem] border border-[var(--color-border)] bg-white/88 p-6 shadow-[0_24px_60px_rgba(44,62,80,0.08)]">
          <Link href="/" className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              Benna Admin
            </span>
            <h1 className="mt-3 text-2xl font-semibold text-[var(--color-text-primary)]">
              Practice Console
            </h1>
          </Link>

          <nav className="mt-8 grid gap-2">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">
              Phase 1 scaffold
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
              Layout and management surfaces are ready. Auth and database wiring
              can connect here next without reworking the structure.
            </p>
          </div>
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
