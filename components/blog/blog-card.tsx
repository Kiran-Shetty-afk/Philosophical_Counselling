import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BlogPost } from "@/lib/blog";

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={
        featured
          ? "group overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(145deg,rgba(255,248,225,0.94),rgba(255,255,255,0.96))] shadow-[0_24px_64px_rgba(44,62,80,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_72px_rgba(44,62,80,0.12)]"
          : "group overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white/88 shadow-[0_16px_40px_rgba(44,62,80,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(44,62,80,0.10)]"
      }
    >
      <div className="overflow-hidden">
        <Image
          alt={post.coverAlt}
          className={`w-full object-cover transition duration-500 group-hover:scale-[1.02] ${featured ? "h-72" : "h-56"}`}
          height={featured ? 720 : 560}
          src={post.coverImage}
          width={1600}
        />
      </div>

      <div className={featured ? "p-8" : "p-7"}>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
          <span className="rounded-full border border-[var(--color-border)] bg-white/80 px-3 py-1 font-semibold uppercase tracking-[0.14em]">
            {post.category}
          </span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readTime}</span>
        </div>

        <h2
          className={
            featured
              ? "mt-6 text-4xl font-semibold tracking-tight text-[var(--color-text-primary)]"
              : "mt-5 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]"
          }
        >
          <Link
            href={`/blog/${post.slug}`}
            className="transition hover:text-[var(--color-accent)]"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)]">
          {post.excerpt}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            By {post.author}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)] transition hover:gap-2 hover:text-[var(--color-text-primary)]"
          >
            Read article
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
