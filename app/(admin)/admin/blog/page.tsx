import Link from "next/link";

import { BlogManager } from "@/components/admin/blog-manager";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAllBlogPosts } from "@/lib/blog";

export default function AdminBlogPage() {
  const posts = getAllBlogPosts();

  return (
    <AdminShell
      title="Blog management"
      description="Create, edit, draft, and publish articles from this workspace. Changes here are reflected on the public blog."
    >
      <div className="mb-6 flex flex-col gap-4 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-[var(--color-text-primary)]">
            Content publishing workspace
          </p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
            Manage all blog posts from one place. Use the editor to draft, update, and publish articles.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex rounded-full border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:-translate-y-0.5"
        >
          View public blog
        </Link>
      </div>

      <BlogManager initialPosts={posts} />
    </AdminShell>
  );
}
