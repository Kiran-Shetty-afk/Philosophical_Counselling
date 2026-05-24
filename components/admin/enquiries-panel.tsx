"use client";

import { useState } from "react";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type EnquiryRecord = {
  name: string;
  subject: string;
  received: string;
  status: string;
};

type EnquiriesPanelProps = {
  initialEnquiries: EnquiryRecord[];
};

export function EnquiriesPanel({ initialEnquiries }: EnquiriesPanelProps) {
  const [enquiries, setEnquiries] = useState(
    initialEnquiries.map((item) => ({ ...item, reply: "" })),
  );
  const [message, setMessage] = useState<string | null>(null);

  function updateStatus(name: string, status: string) {
    setEnquiries((current) =>
      current.map((item) => (item.name === name ? { ...item, status } : item)),
    );
  }

  function updateReply(name: string, reply: string) {
    setEnquiries((current) =>
      current.map((item) => (item.name === name ? { ...item, reply } : item)),
    );
  }

  function markReplied(name: string) {
    updateStatus(name, "Replied");
    setMessage(`Reply draft saved for ${name}.`);
  }

  return (
    <div className="grid gap-6">
      {message ? (
        <div className="rounded-[1.5rem] border border-[rgba(217,119,6,0.22)] bg-[rgba(255,152,0,0.08)] px-5 py-4 text-sm text-[var(--color-text-primary)]">
          {message}
        </div>
      ) : null}

      {enquiries.map((item) => (
        <article
          key={`${item.name}-${item.subject}`}
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
                  tone={
                    item.status === "Unread"
                      ? "warning"
                      : item.status === "Replied"
                        ? "success"
                        : "accent"
                  }
                />
              </div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {item.subject}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Received {item.received}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="default"
                onClick={() => updateStatus(item.name, "In review")}
                variant="secondary"
              >
                In review
              </Button>
              <Button
                size="default"
                onClick={() => markReplied(item.name)}
                variant="primary"
              >
                Mark replied
              </Button>
              <Button
                size="default"
                onClick={() => updateStatus(item.name, "Archived")}
                variant="ghost"
              >
                Archive
              </Button>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">
              Response draft
            </label>
            <Textarea
              className="min-h-28"
              placeholder="Draft a thoughtful response for this enquiry."
              value={item.reply}
              onChange={(event) => updateReply(item.name, event.target.value)}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
