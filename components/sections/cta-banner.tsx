import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaBannerProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBanner({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CtaBannerProps) {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 rounded-[2rem] border border-[var(--color-border)] bg-[var(--gradient-brand)] px-8 py-10 text-white shadow-[0_24px_64px_rgba(255,152,0,0.24)] sm:px-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-8 text-white/88 sm:text-lg">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={primaryHref}
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "border-white/65 bg-white text-[var(--color-text-primary)] hover:border-white",
            )}
          >
            {primaryLabel}
          </a>
          {secondaryLabel && secondaryHref ? (
            <a
              href={secondaryHref}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "border border-white/45 px-6 py-3 text-white hover:bg-white/10 hover:text-white",
              )}
            >
              {secondaryLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
