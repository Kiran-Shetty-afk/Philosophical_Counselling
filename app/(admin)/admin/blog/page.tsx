import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { getAllBlogPosts } from "@/lib/blog";

export default function AdminBlogPage() {
  const posts = getAllBlogPosts();

  return (
    <AdminShell
      title="Blog management"
      description="This separate admin area is exactly where publishing controls should live. Right now it scaffolds the content surface; next it can connect to create, edit, draft, and publish flows."
    >
      <div className="mb-6 flex flex-col gap-4 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-[var(--color-text-primary)]">
            Content publishing workspace
          </p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
            Separate from the public blog and ready to evolve into a real editorial flow.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex rounded-full border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:-translate-y-0.5"
        >
          View public blog
        </Link>
      </div>

      <AdminTable
        columns={["Title", "Category", "Published", "Read Time", "Featured"]}
        rows={posts.map((post) => [
          post.title,
          post.category,
          post.publishedAt,
          post.readTime,
          post.featured ? "Yes" : "No",
        ])}
      />
    </AdminShell>
  );
}
