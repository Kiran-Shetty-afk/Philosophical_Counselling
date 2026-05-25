import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";

import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getYouTubeEmbedUrl,
} from "@/lib/blog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const embedUrl = getYouTubeEmbedUrl(post.youtubeUrl);
  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        {/* Article card */}
        <article className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white/92 shadow-[0_24px_64px_rgba(44,62,80,0.08)]">
          <Image
            alt={post.coverAlt}
            className="h-72 w-full object-cover sm:h-96"
            height={960}
            src={post.coverImage}
            width={1600}
            priority
          />

          <div className="px-8 py-12 sm:px-12 sm:py-16">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
              <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1 font-semibold uppercase tracking-[0.14em]">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {post.author}
              </span>
              <span>{formatDate(post.publishedAt)}</span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
              {post.excerpt}
            </p>

            {/* YouTube embed */}
            {embedUrl ? (
              <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] shadow-[0_16px_40px_rgba(44,62,80,0.06)]">
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

            {/* Body */}
            <div className="mt-10 border-t border-[var(--color-border)] pt-10">
              <div className="prose prose-lg max-w-none [&>p]:text-[var(--color-text-secondary)] [&>p]:leading-8 [&>p]:mb-6 [&>p:last-child]:mb-0">
                {post.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--color-surface-muted)] px-3 py-1 text-sm text-[var(--color-text-secondary)]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 rounded-[1.5rem] border border-[rgba(255,193,7,0.3)] bg-[rgba(255,193,7,0.07)] p-6">
              <p className="font-semibold text-[var(--color-text-primary)]">
                Found this useful?
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                A session can take these ideas further — exploring what they
                mean specifically for your situation with care and attention.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book-session"
                  className={cn(buttonVariants())}
                >
                  Book a session
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  Send an enquiry
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 ? (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
              More from the blog
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white/88 shadow-[0_16px_40px_rgba(44,62,80,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(44,62,80,0.10)]"
                >
                  <Image
                    alt={related.coverAlt}
                    className="h-44 w-full object-cover"
                    height={440}
                    src={related.coverImage}
                    width={880}
                  />
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                      {related.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-[var(--color-text-primary)] transition group-hover:text-[var(--color-accent)]">
                      {related.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                      {related.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)]">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
