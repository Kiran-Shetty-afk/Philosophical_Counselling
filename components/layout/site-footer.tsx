export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-[var(--color-text-secondary)] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="font-semibold text-[var(--color-text-primary)]">
            Benna Philosophical Counselling
          </p>
          <p className="mt-2 max-w-xl leading-7">
            Reflective, confidential, and human-centered support for people
            seeking clarity, resilience, and grounded decision-making.
          </p>
        </div>
        <div className="space-y-2">
          <p>hello@benna-philosophy.com</p>
          <p>Mon to Sat, by appointment</p>
        </div>
      </div>
    </footer>
  );
}
