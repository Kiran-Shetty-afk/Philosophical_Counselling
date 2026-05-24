import { PageHero } from "@/components/sections/page-hero";
import { BlogCard } from "@/components/blog/blog-card";
import { getAllBlogPosts, getFeaturedBlogPost } from "@/lib/blog";

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
          <BlogCard featured post={featuredPost} />

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-[var(--color-border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)]"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {remainingPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
