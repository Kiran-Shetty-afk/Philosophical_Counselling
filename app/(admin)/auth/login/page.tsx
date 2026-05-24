import Link from "next/link";

import { LoginForm } from "@/components/forms/login-form";

type AdminLoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;

  return (
    <section className="min-h-screen bg-[linear-gradient(180deg,#f7f4ec_0%,#f5efe4_100%)] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(145deg,rgba(255,248,225,0.94),rgba(255,255,255,0.96))] p-8 shadow-[0_24px_64px_rgba(44,62,80,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
            Admin Access
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Separate management space for the full practice website
          </h1>
          <p className="mt-5 text-base leading-8 text-[var(--color-text-secondary)]">
            This side is where blog publishing, appointment review, enquiries,
            testimonials, and future CMS controls will live independently from
            the public-facing site.
          </p>
          <Link
            href="/admin/dashboard"
            className="mt-8 inline-flex rounded-full border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:-translate-y-0.5"
          >
            Preview admin dashboard
          </Link>
        </div>

        <div className="rounded-[2rem] border border-[var(--color-border)] bg-white/92 p-8 shadow-[0_24px_64px_rgba(44,62,80,0.08)]">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            Sign in to the practice console
          </h2>
          <p className="mt-3 text-base leading-8 text-[var(--color-text-secondary)]">
            Use the admin interface to manage content and practice operations from one controlled workspace.
          </p>
          <div className="mt-6 rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-4 text-sm leading-7 text-[var(--color-text-secondary)]">
            Demo admin credentials:
            <br />
            <span className="font-semibold text-[var(--color-text-primary)]">
              admin@benna-philosophy.com
            </span>
            <br />
            <span className="font-semibold text-[var(--color-text-primary)]">
              Admin@12345
            </span>
          </div>
          <div className="mt-8">
            <LoginForm nextPath={params.next} />
          </div>
        </div>
      </div>
    </section>
  );
}
