"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginFormProps = {
  nextPath?: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = (await response.json()) as { error?: string; success?: boolean };

    if (!response.ok) {
      setLoading(false);
      setError(data.error ?? "Unable to sign in.");
      return;
    }

    setLoading(false);
    setSuccess(true);
    router.push(nextPath ?? "/admin/dashboard");
    router.refresh();
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          Admin email
        </span>
        <Input
          autoComplete="email"
          name="email"
          placeholder="admin@benna-philosophy.com"
          type="email"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          Password
        </span>
        <Input
          autoComplete="current-password"
          name="password"
          placeholder="Enter your password"
          type="password"
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
          Default scaffold credentials are ready for local use and can be moved to environment variables next.
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
        <div className="flex items-start gap-3 rounded-[1.5rem] border border-[rgba(217,119,6,0.22)] bg-[rgba(255,152,0,0.08)] px-5 py-4 text-sm text-[var(--color-text-primary)]">
          <LockKeyhole className="mt-0.5 h-5 w-5 text-[var(--color-success)]" />
          <p>
            Signed in successfully. Redirecting to the admin workspace.
          </p>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-[1.5rem] border border-[rgba(207,91,76,0.2)] bg-[rgba(207,91,76,0.08)] px-5 py-4 text-sm text-[#b14638]">
          {error}
        </div>
      ) : null}
    </form>
  );
}
