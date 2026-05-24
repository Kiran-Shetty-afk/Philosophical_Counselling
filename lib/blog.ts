export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: string;
  featured: boolean;
  tags: string[];
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-philosophical-counselling-creates-clarity",
    title: "How Philosophical Counselling Creates Clarity in Uncertain Times",
    excerpt:
      "When life feels crowded by competing obligations and inner noise, reflective dialogue helps uncover the values and assumptions shaping your next step.",
    category: "Clarity",
    publishedAt: "2026-05-24",
    readTime: "5 min read",
    author: "Dr. Benna",
    featured: true,
    tags: ["clarity", "reflection", "decision-making"],
    content: [
      "Clarity rarely arrives through urgency. More often, it grows when we slow down enough to notice the ideas, fears, and inherited expectations that are quietly steering us.",
      "Philosophical counselling creates that slower space. Rather than rushing toward advice, it helps uncover the assumptions beneath a dilemma: What am I calling success? Which values are actually mine? What fear is shaping this decision?",
      "This kind of reflection is especially useful when a problem is not simply practical but existential. A career change, a strained relationship, or a sense of disconnection often carries deeper questions about meaning, responsibility, identity, and freedom.",
      "The work is not abstract for its own sake. Insight matters because it changes how a person lives. Once values become clearer, decisions often become steadier. Once language becomes more honest, relationships often become less reactive.",
      "In that sense, clarity is not a sudden revelation. It is the result of careful conversation, patient examination, and a willingness to live more deliberately.",
    ],
  },
  {
    slug: "family-conversations-that-reduce-reactivity",
    title: "Family Conversations That Reduce Reactivity and Restore Respect",
    excerpt:
      "Families often need more than conflict resolution. They need better language for care, boundaries, and responsibility.",
    category: "Family",
    publishedAt: "2026-05-18",
    readTime: "4 min read",
    author: "Dr. Benna",
    featured: false,
    tags: ["family", "communication", "conflict"],
    content: [
      "Many family conflicts repeat not because the topic is impossible, but because the conversation itself has become patterned. People speak from defense, memory, or frustration before they speak from understanding.",
      "A philosophical counselling lens helps families examine the meanings driving those reactions. What counts as respect in this family? Which expectations are spoken, and which are assumed? When does care become control?",
      "These questions change the texture of dialogue. Instead of arguing only about events, families begin to understand the beliefs and interpretations that keep the same tension alive.",
      "That kind of reflective structure can reduce blame and make room for more accurate listening. It helps people speak more responsibly about what they need, and hear more clearly what others are trying to protect.",
    ],
  },
  {
    slug: "why-meaning-matters-in-burnout-recovery",
    title: "Why Meaning Matters in Burnout Recovery",
    excerpt:
      "Burnout is not always solved by rest alone. Sometimes it asks deeper questions about purpose, limits, and the story a person is living inside.",
    category: "Wellbeing",
    publishedAt: "2026-05-10",
    readTime: "6 min read",
    author: "Dr. Benna",
    featured: false,
    tags: ["burnout", "meaning", "wellbeing"],
    content: [
      "Burnout is often described in terms of exhaustion, but exhaustion is only the visible layer. Underneath it, many people are carrying a crisis of meaning, pressure, and self-relationship.",
      "When work or caregiving becomes totalizing, people can lose contact with why they began, what matters now, and what counts as enough. Without those anchors, effort becomes endless and rest becomes guilt-ridden.",
      "Philosophical counselling makes room for a different kind of recovery. It asks not only what needs to stop, but what needs to be re-understood. Which standards have become unlivable? Which obligations are real, and which are inherited performances?",
      "Recovery becomes more durable when a person regains authorship over their values. Boundaries begin to feel ethical rather than selfish, and rest begins to feel restorative rather than undeserved.",
      "Meaning does not remove fatigue instantly, but it can change the way a life is structured around it.",
    ],
  },
];

export function getAllBlogPosts() {
  return [...blogPosts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

export function getFeaturedBlogPost() {
  return getAllBlogPosts().find((post) => post.featured) ?? getAllBlogPosts()[0];
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
