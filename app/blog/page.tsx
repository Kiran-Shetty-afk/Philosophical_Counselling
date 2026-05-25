import type { Metadata } from "next";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { BlogCard } from "@/components/blog/blog-card";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated-section";
import { getAllBlogPosts, getFeaturedBlogPost } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughtful writing on meaning, resilience, and reflective living — essays from Benna Philosophical Counselling.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const featuredPost = getFeaturedBlogPost();
  const remainingPosts = posts.filter((post) => post.slug !== featuredPost.slug);
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Thoughtful writing on meaning, resilience, and reflective living"
        description="A growing collection of essays designed to make philosophical counselling feel practical, human, and relevant to everyday life."
      />

      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8">
          {/* Featured post */}
          <AnimatedSection>
            <BlogCard featured post={featuredPost} />
          </AnimatedSection>

          {/* Category pills */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-[var(--color-border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
                >
                  {category}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* Remaining posts */}
          <StaggerContainer className="grid gap-6 lg:grid-cols-2">
            {remainingPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaBanner
        title="Ready to explore these ideas in a session?"
        description="Reading is a start. A reflective conversation can take these questions further — with care, attention, and no pressure."
        primaryLabel="Book a Session"
        primaryHref="/book-session"
        secondaryLabel="Send an enquiry"
        secondaryHref="/contact"
      />
    </>
  );
}
