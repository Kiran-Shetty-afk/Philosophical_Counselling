import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { LoginForm } from "@/components/forms/login-form";

type AdminLoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;

  return (
    <section className="min-h-screen bg-[linear-gradient(180deg,#f7f4ec_0%,#f5efe4_100%)] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left info panel */}
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(145deg,rgba(255,248,225,0.94),rgba(255,255,255,0.96))] p-8 shadow-[0_24px_64px_rgba(44,62,80,0.08)]">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gradient-brand)] shadow-[0_8px_20px_rgba(255,193,7,0.28)]">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
            Admin Access
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Practice management console
          </h1>
          <p className="mt-5 text-base leading-8 text-[var(--color-text-secondary)]">
            This is where blog publishing, appointment review, enquiries,
            testimonials, and content management live — independently from the
            public-facing site.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-[var(--color-text-secondary)]">
            {[
              "Appointment queue and status management",
              "Enquiry inbox with response drafts",
              "Blog post editor with draft and publish controls",
              "Testimonial moderation workflow",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {item}
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:-translate-y-0.5"
          >
            ← Back to public site
          </Link>
        </div>

        {/* Right login panel */}
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-white/92 p-8 shadow-[0_24px_64px_rgba(44,62,80,0.08)]">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            Sign in to the practice console
          </h2>
          <p className="mt-3 text-base leading-8 text-[var(--color-text-secondary)]">
            Use your admin credentials to access the management workspace.
          </p>
          <div className="mt-8">
            <LoginForm nextPath={params.next} />
          </div>
        </div>
      </div>
    </section>
  );
}
