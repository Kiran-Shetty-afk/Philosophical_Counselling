"use client";

import { useState } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 700));

    setLoading(false);
    setSuccess(true);
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          Admin email
        </span>
        <Input autoComplete="email" placeholder="admin@benna-philosophy.com" type="email" />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          Password
        </span>
        <Input autoComplete="current-password" placeholder="Enter your password" type="password" />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
          This is UI scaffolding for the admin entry point. Secure auth wiring comes next.
        </p>
        <Button className="min-w-40" disabled={loading} type="submit">
          {loading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Signing in
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </div>

      {success ? (
        <div className="flex items-start gap-3 rounded-[1.5rem] border border-[rgba(76,175,80,0.24)] bg-[rgba(76,175,80,0.08)] px-5 py-4 text-sm text-[var(--color-text-primary)]">
          <LockKeyhole className="mt-0.5 h-5 w-5 text-[var(--color-success)]" />
          <p>
            Admin login UI is ready. The next step is wiring this form to real auth and protected routes.
          </p>
        </div>
      ) : null}
    </form>
  );
}
