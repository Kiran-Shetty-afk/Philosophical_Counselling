import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-2xl text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-surface-highlight)]">
          <Compass className="h-10 w-10 text-[var(--color-accent)]" />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
          404 — Page not found
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
          This path does not exist yet
        </h1>

        <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
          The page you are looking for may have moved, or the address may be
          slightly off. Let&apos;s find a steadier way forward.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return home
          </Link>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
          >
            Contact the practice
          </Link>
        </div>
      </div>
    </section>
  );
}
