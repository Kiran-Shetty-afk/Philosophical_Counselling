import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getYouTubeEmbedUrl,
} from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.title} | Benna Philosophical Counselling`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const embedUrl = getYouTubeEmbedUrl(post.youtubeUrl);

  return (
    <section className="px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white/92 shadow-[0_24px_64px_rgba(44,62,80,0.08)]">
        <Image
          alt={post.coverAlt}
          className="h-72 w-full object-cover sm:h-96"
          height={960}
          src={post.coverImage}
          width={1600}
        />

        <div className="px-8 py-12 sm:px-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1 font-semibold uppercase tracking-[0.14em]">
              {post.category}
            </span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
            {post.excerpt}
          </p>

          {embedUrl ? (
            <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_16px_40px_rgba(44,62,80,0.06)]">
              <div className="aspect-video">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={embedUrl}
                  title={post.youtubeTitle ?? `${post.title} video`}
                />
              </div>
            </div>
          ) : null}

          <div className="mt-10 border-t border-[var(--color-border)] pt-10">
            <div className="prose prose-lg max-w-none prose-p:text-[var(--color-text-secondary)] prose-p:leading-8 prose-headings:text-[var(--color-text-primary)]">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--color-surface-muted)] px-3 py-1 text-sm text-[var(--color-text-secondary)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
