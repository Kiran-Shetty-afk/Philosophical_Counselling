"use client";

import { useState, useRef, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "already" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = inputRef.current?.value.trim() ?? "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }

      if (data.alreadySubscribed) {
        setStatus("already");
        setMessage(data.message);
      } else {
        setStatus("success");
        setMessage(data.message);
        if (inputRef.current) inputRef.current.value = "";
      }

      // Reset after 5s
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const isDisabled = status === "loading" || status === "success";

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="email"
            name="email"
            id="newsletter-email"
            placeholder="Your email address"
            aria-label="Email address for newsletter"
            disabled={isDisabled}
            className="h-12 w-full rounded-full border border-[var(--color-border)] bg-white/90 px-5 pr-12 text-sm text-[var(--color-text-primary)] shadow-[0_8px_20px_rgba(44,62,80,0.04)] outline-none transition duration-300 placeholder:text-[var(--color-text-secondary)]/60 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[rgba(255,193,7,0.14)] disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-transparent bg-[var(--gradient-brand)] px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(255,152,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(255,152,0,0.28)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {status === "loading"
            ? "Subscribing…"
            : status === "success"
              ? "Subscribed!"
              : "Subscribe"}
        </button>
      </form>

      {/* Feedback message */}
      {message && (
        <div
          className={`mt-3 flex items-start gap-2 rounded-2xl px-4 py-3 text-sm transition-all duration-300 ${
            status === "success"
              ? "border border-green-200 bg-green-50/80 text-green-700"
              : status === "already"
                ? "border border-amber-200 bg-amber-50/80 text-amber-700"
                : "border border-red-200 bg-red-50/80 text-red-700"
          }`}
          role="alert"
        >
          {status === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : status === "already" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
