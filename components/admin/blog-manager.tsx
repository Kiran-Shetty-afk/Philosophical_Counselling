"use client";

import { useMemo, useState } from "react";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BlogPost } from "@/lib/blog";

type EditablePost = BlogPost & {
  status: "Draft" | "Published";
};

type BlogManagerProps = {
  initialPosts: BlogPost[];
};

export function BlogManager({ initialPosts }: BlogManagerProps) {
  const [posts, setPosts] = useState<EditablePost[]>(
    initialPosts.map((post) => ({
      ...post,
      status: "Published",
    })),
  );
  const [selectedSlug, setSelectedSlug] = useState(posts[0]?.slug ?? "");
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  const selectedPost = useMemo(
    () => posts.find((post) => post.slug === selectedSlug) ?? posts[0],
    [posts, selectedSlug],
  );

  function updateSelected(field: keyof EditablePost, value: string | boolean) {
    if (!selectedPost) {
      return;
    }

    setPosts((current) =>
      current.map((post) =>
        post.slug === selectedPost.slug ? { ...post, [field]: value } : post,
      ),
    );
  }

  function updateContent(value: string) {
    if (!selectedPost) {
      return;
    }

    setPosts((current) =>
      current.map((post) =>
        post.slug === selectedPost.slug
          ? { ...post, content: value.split("\n\n").filter(Boolean) }
          : post,
      ),
    );
  }

  function saveAsDraft() {
    updateSelected("status", "Draft");
    setFlashMessage("Post saved as draft in the admin workspace.");
  }

  function publishPost() {
    updateSelected("status", "Published");
    setFlashMessage("Post marked as published in the admin workspace.");
  }

  function toggleFeatured() {
    if (!selectedPost) {
      return;
    }

    setPosts((current) =>
      current.map((post) =>
        post.slug === selectedPost.slug
          ? { ...post, featured: !post.featured }
          : { ...post, featured: false },
      ),
    );
    setFlashMessage("Featured article selection updated.");
  }

  if (!selectedPost) {
    return null;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <aside className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_14px_30px_rgba(44,62,80,0.04)]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Posts
          </h3>
          <StatusBadge label={`${posts.length} total`} tone="neutral" />
        </div>

        <div className="mt-5 grid gap-3">
          {posts.map((post) => (
            <button
              key={post.slug}
              className={`rounded-[1.25rem] border px-4 py-4 text-left transition ${
                selectedSlug === post.slug
                  ? "border-[var(--color-accent)] bg-[rgba(255,193,7,0.08)]"
                  : "border-[var(--color-border)] bg-white hover:border-[var(--color-border-strong)]"
              }`}
              onClick={() => setSelectedSlug(post.slug)}
              type="button"
            >
              <p className="font-semibold text-[var(--color-text-primary)]">
                {post.title}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge
                  label={post.status}
                  tone={post.status === "Published" ? "success" : "accent"}
                />
                {post.featured ? (
                  <StatusBadge label="Featured" tone="warning" />
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_14px_30px_rgba(44,62,80,0.04)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-[var(--color-text-primary)]">
              Edit article
            </h3>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
              This is the exact place where create, edit, draft, and publish flows belong.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={saveAsDraft} variant="secondary">
              Save draft
            </Button>
            <Button onClick={publishPost} variant="primary">
              Publish
            </Button>
            <Button onClick={toggleFeatured} variant="ghost">
              Toggle featured
            </Button>
          </div>
        </div>

        {flashMessage ? (
          <div className="mt-5 rounded-[1.5rem] border border-[rgba(217,119,6,0.22)] bg-[rgba(255,152,0,0.08)] px-5 py-4 text-sm text-[var(--color-text-primary)]">
            {flashMessage}
          </div>
        ) : null}

        <div className="mt-6 grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">
              Title
            </span>
            <Input
              value={selectedPost.title}
              onChange={(event) => updateSelected("title", event.target.value)}
            />
          </label>

          <div className="grid gap-5 md:grid-cols-3">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                Category
              </span>
              <Input
                value={selectedPost.category}
                onChange={(event) =>
                  updateSelected("category", event.target.value)
                }
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                Published date
              </span>
              <Input
                value={selectedPost.publishedAt}
                onChange={(event) =>
                  updateSelected("publishedAt", event.target.value)
                }
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                Read time
              </span>
              <Input
                value={selectedPost.readTime}
                onChange={(event) =>
                  updateSelected("readTime", event.target.value)
                }
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">
              Excerpt
            </span>
            <Textarea
              className="min-h-28"
              value={selectedPost.excerpt}
              onChange={(event) => updateSelected("excerpt", event.target.value)}
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                Cover image path
              </span>
              <Input
                value={selectedPost.coverImage}
                onChange={(event) =>
                  updateSelected("coverImage", event.target.value)
                }
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                Cover image alt text
              </span>
              <Input
                value={selectedPost.coverAlt}
                onChange={(event) =>
                  updateSelected("coverAlt", event.target.value)
                }
              />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                YouTube URL
              </span>
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={selectedPost.youtubeUrl ?? ""}
                onChange={(event) =>
                  updateSelected("youtubeUrl", event.target.value)
                }
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                Video title
              </span>
              <Input
                placeholder="Reflective introduction video"
                value={selectedPost.youtubeTitle ?? ""}
                onChange={(event) =>
                  updateSelected("youtubeTitle", event.target.value)
                }
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">
              Body content
            </span>
            <Textarea
              className="min-h-64"
              value={selectedPost.content.join("\n\n")}
              onChange={(event) => updateContent(event.target.value)}
            />
          </label>
        </div>
      </section>
    </div>
  );
}
