"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  StarOff,
  Eye,
  EyeOff,
  LoaderCircle,
  X,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/admin/status-badge";

type WisdomCategory =
  | "Stoicism"
  | "Philosophy"
  | "Mindfulness"
  | "Self-Reflection"
  | "Motivation"
  | "Existentialism"
  | "Ethics";

const CATEGORIES: WisdomCategory[] = [
  "Stoicism",
  "Philosophy",
  "Mindfulness",
  "Self-Reflection",
  "Motivation",
  "Existentialism",
  "Ethics",
];

type WisdomQuote = {
  id: string;
  quote: string;
  author: string;
  source?: string;
  category: WisdomCategory;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  quote: string;
  author: string;
  source: string;
  category: WisdomCategory;
  isActive: boolean;
  isFeatured: boolean;
};

const EMPTY_FORM: FormState = {
  quote: "",
  author: "",
  source: "",
  category: "Philosophy",
  isActive: true,
  isFeatured: false,
};

export function WisdomPanel() {
  const [quotes, setQuotes] = useState<WisdomQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/daily-wisdom?admin=true")
      .then((r) => r.json())
      .then((d: { quotes?: WisdomQuote[] }) => {
        setQuotes(d.quotes ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return quotes.filter((q) => {
      if (categoryFilter !== "All" && q.category !== categoryFilter) return false;
      if (statusFilter === "Active" && !q.isActive) return false;
      if (statusFilter === "Inactive" && q.isActive) return false;
      if (statusFilter === "Featured" && !q.isFeatured) return false;
      if (search && !q.quote.toLowerCase().includes(search.toLowerCase()) &&
          !q.author.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [quotes, categoryFilter, statusFilter, search]);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
    setMessage(null);
  }

  function openEdit(q: WisdomQuote) {
    setEditingId(q.id);
    setForm({ quote: q.quote, author: q.author, source: q.source ?? "", category: q.category, isActive: q.isActive, isFeatured: q.isFeatured });
    setShowForm(true);
    setMessage(null);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSave() {
    if (!form.quote.trim() || !form.author.trim()) {
      setMessage({ type: "error", text: "Quote and author are required." });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const body = { ...form, source: form.source || undefined };
      const url = editingId ? `/api/daily-wisdom/${editingId}` : "/api/daily-wisdom";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json() as { quote?: WisdomQuote; error?: string };
      if (!res.ok) { setMessage({ type: "error", text: data.error ?? "Failed to save." }); return; }
      if (data.quote) {
        if (editingId) {
          // If featured, unfeature others in local state
          setQuotes((prev) => prev.map((q) =>
            q.id === editingId ? data.quote! : (data.quote!.isFeatured ? { ...q, isFeatured: false } : q)
          ));
        } else {
          setQuotes((prev) => [data.quote!, ...(data.quote!.isFeatured ? prev.map(q => ({ ...q, isFeatured: false })) : prev)]);
        }
      }
      setMessage({ type: "success", text: editingId ? "Quote updated." : "Quote created." });
      closeForm();
    } catch {
      setMessage({ type: "error", text: "Failed to save. Please try again." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/daily-wisdom/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQuotes((prev) => prev.filter((q) => q.id !== id));
        setMessage({ type: "success", text: "Quote deleted." });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to delete." });
    } finally {
      setDeletingId(null);
    }
  }

  async function quickToggle(id: string, field: "isActive" | "isFeatured", value: boolean) {
    const body = field === "isFeatured" && value
      ? { isFeatured: true }
      : { [field]: value };
    try {
      const res = await fetch(`/api/daily-wisdom/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json() as { quote?: WisdomQuote };
      if (res.ok && data.quote) {
        setQuotes((prev) => prev.map((q) => {
          if (q.id === id) return data.quote!;
          if (field === "isFeatured" && value) return { ...q, isFeatured: false };
          return q;
        }));
      }
    } catch { /* silent */ }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-10 text-[var(--color-text-secondary)]">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        <span>Loading wisdom quotes…</span>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {message && (
        <div className={`rounded-[1.5rem] border px-5 py-4 text-sm ${
          message.type === "success"
            ? "border-[rgba(22,163,74,0.2)] bg-[rgba(22,163,74,0.08)] text-[#15803d]"
            : "border-[rgba(207,91,76,0.2)] bg-[rgba(207,91,76,0.08)] text-[#b14638]"
        }`}>
          {message.text}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <Input placeholder="Search quotes or authors…" value={search}
          onChange={(e) => setSearch(e.target.value)} className="w-56" />
        <div className="flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} type="button" onClick={() => setCategoryFilter(c)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                categoryFilter === c
                  ? "bg-[var(--color-text-primary)] text-white"
                  : "border border-[var(--color-border)] bg-white/80 text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
              }`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {["All", "Active", "Inactive", "Featured"].map((s) => (
            <button key={s} type="button" onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                statusFilter === s
                  ? "bg-[var(--color-accent)] text-white"
                  : "border border-[var(--color-border)] bg-white/80 text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
              }`}>
              {s}
            </button>
          ))}
        </div>
        <span className="ml-auto text-sm text-[var(--color-text-secondary)]">
          {filtered.length} of {quotes.length}
        </span>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" />Add quote
        </Button>
      </div>

      {/* Create / Edit form */}
      {showForm && (
        <div className="rounded-[1.5rem] border border-[var(--color-accent)] bg-[rgba(255,193,7,0.04)] p-6 shadow-[0_14px_30px_rgba(44,62,80,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold text-[var(--color-text-primary)]">
              {editingId ? "Edit quote" : "New quote"}
            </h3>
            <button onClick={closeForm} type="button"
              className="text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">Quote *</span>
              <Textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })}
                placeholder="Enter the wisdom quote…" className="min-h-28" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">Author *</span>
                <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="e.g. Marcus Aurelius" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">Source (optional)</span>
                <Input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}
                  placeholder="e.g. Meditations" />
              </label>
            </div>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">Category</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button key={c} type="button" onClick={() => setForm({ ...form, category: c })}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      form.category === c
                        ? "bg-[var(--color-text-primary)] text-white"
                        : "border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
                    }`}>
                    {c}
                  </button>
                ))}
              </div>
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="h-4 w-4 rounded accent-[var(--color-accent)]" />
                <span className="text-sm font-medium text-[var(--color-text-primary)]">Active</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="h-4 w-4 rounded accent-[var(--color-accent)]" />
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  Featured (overrides random rotation)
                </span>
              </label>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={closeForm} disabled={saving}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Saving…</> : <><Save className="mr-2 h-4 w-4" />Save quote</>}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quote list */}
      {filtered.length === 0 && (
        <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-6 py-10 text-center text-sm text-[var(--color-text-secondary)]">
          No quotes match the current filters.
        </div>
      )}

      <div className="grid gap-4">
        {filtered.map((q) => (
          <article key={q.id}
            className={`rounded-[1.5rem] border p-5 shadow-[0_10px_24px_rgba(44,62,80,0.04)] transition ${
              q.isFeatured
                ? "border-[var(--color-accent)] bg-[rgba(255,193,7,0.04)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)]"
            } ${!q.isActive ? "opacity-55" : ""}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge label={q.category} tone="neutral" />
                  {q.isFeatured && <StatusBadge label="Featured" tone="warning" />}
                  {!q.isActive && <StatusBadge label="Inactive" tone="error" />}
                </div>
                <p className="text-base font-medium leading-7 text-[var(--color-text-primary)]">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  — {q.author}{q.source ? `, ${q.source}` : ""}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <button onClick={() => quickToggle(q.id, "isFeatured", !q.isFeatured)} type="button"
                  title={q.isFeatured ? "Unpin featured" : "Pin as featured"}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] bg-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
                  {q.isFeatured ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                </button>
                <button onClick={() => quickToggle(q.id, "isActive", !q.isActive)} type="button"
                  title={q.isActive ? "Deactivate" : "Activate"}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] bg-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
                  {q.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button onClick={() => openEdit(q)} type="button" title="Edit"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] bg-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(q.id)} type="button" title="Delete"
                  disabled={deletingId === q.id}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] transition hover:border-[#b14638] hover:text-[#b14638]">
                  {deletingId === q.id
                    ? <LoaderCircle className="h-4 w-4 animate-spin" />
                    : <Trash2 className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
