"use client";

import { useState } from "react";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";

type TestimonialRecord = {
  name: string;
  role: string;
  quote: string;
  status: string;
};

type TestimonialsPanelProps = {
  initialTestimonials: TestimonialRecord[];
};

export function TestimonialsPanel({
  initialTestimonials,
}: TestimonialsPanelProps) {
  const [items, setItems] = useState(initialTestimonials);

  function updateStatus(name: string, status: string) {
    setItems((current) =>
      current.map((item) => (item.name === name ? { ...item, status } : item)),
    );
  }

  return (
    <div className="grid gap-6">
      {items.map((item) => (
        <article
          key={item.name}
          className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_14px_30px_rgba(44,62,80,0.04)]"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  {item.name}
                </h3>
                <StatusBadge
                  label={item.status}
                  tone={item.status === "Published" ? "success" : "accent"}
                />
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {item.role}
              </p>
              <p className="text-base leading-8 text-[var(--color-text-primary)]">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="default"
                onClick={() => updateStatus(item.name, "Published")}
                variant="primary"
              >
                Approve
              </Button>
              <Button
                size="default"
                onClick={() => updateStatus(item.name, "Pending")}
                variant="secondary"
              >
                Hold
              </Button>
              <Button
                className="border-[rgba(217,119,6,0.28)] text-[#b45309] hover:border-[#b45309]"
                size="default"
                onClick={() => updateStatus(item.name, "Rejected")}
                variant="secondary"
              >
                Reject
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
