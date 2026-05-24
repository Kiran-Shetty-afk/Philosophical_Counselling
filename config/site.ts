export const siteConfig = {
  name: "Benna Philosophical Counselling",
  description:
    "A modern philosophical counselling practice helping people find clarity, resilience, and meaning through reflective conversation.",
  url: "https://github.com/Kiran-Shetty-afk/Philosophical_Counselling",
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Personal", href: "/personal-counselling" },
    { label: "Family", href: "/family-counselling" },
    { label: "Resources", href: "/resources" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const services = [
  {
    title: "Personal Counselling",
    description:
      "Thoughtful one-to-one sessions for life transitions, decision fatigue, identity questions, and emotional grounding.",
  },
  {
    title: "Family Conversations",
    description:
      "Structured dialogue that helps families navigate conflict, understanding, and shared values with care.",
  },
  {
    title: "Meaning & Direction",
    description:
      "Reflective guidance for purpose, vocation, uncertainty, and the questions that sit underneath everyday stress.",
  },
] as const;

export const pillars = [
  {
    title: "Philosophy With Warmth",
    description:
      "Big questions are explored with human sensitivity, not academic distance.",
  },
  {
    title: "Clarity Through Dialogue",
    description:
      "Sessions create room to slow down, examine assumptions, and move forward with intention.",
  },
  {
    title: "Practical Wisdom",
    description:
      "Insights are translated into grounded choices, healthier boundaries, and sustainable inner balance.",
  },
] as const;

export const testimonials = [
  {
    name: "Asha R.",
    role: "Entrepreneur",
    quote:
      "I came in overwhelmed and left with a calmer way of thinking about decisions, responsibility, and self-worth.",
  },
  {
    name: "Daniel M.",
    role: "Parent",
    quote:
      "The process helped our family have gentler and more honest conversations without blame taking over the room.",
  },
  {
    name: "Priya S.",
    role: "Creative Professional",
    quote:
      "It felt reflective, intelligent, and deeply practical. The sessions gave shape to questions I could never name clearly.",
  },
] as const;

export const wisdomQuotes = [
  {
    quote: "The unexamined life is not worth living.",
    author: "Socrates",
  },
  {
    quote: "No man ever steps in the same river twice.",
    author: "Heraclitus",
  },
  {
    quote: "He who has a why can bear almost any how.",
    author: "Friedrich Nietzsche",
  },
] as const;

export const faqs = [
  {
    question: "What is philosophical counselling?",
    answer:
      "It is a reflective conversation that brings philosophical insight into real personal and relational concerns, helping you understand your values, assumptions, and choices with greater clarity.",
  },
  {
    question: "Is it the same as therapy?",
    answer:
      "There can be overlap in care and depth, but philosophical counselling is especially centered on meaning, ethics, perspective, and the way we interpret our lives and decisions.",
  },
  {
    question: "Who is it for?",
    answer:
      "It is often helpful for people navigating transitions, identity questions, relationship strain, indecision, burnout, or a desire for more intentional living.",
  },
] as const;

export const resources = [
  {
    title: "Stoicism for Daily Resilience",
    description:
      "Practical reflections on discipline, acceptance, and inner steadiness for uncertain seasons.",
    category: "Stoicism",
  },
  {
    title: "Existentialism and Meaning",
    description:
      "A guided starting point for questions of freedom, responsibility, and purpose.",
    category: "Existentialism",
  },
  {
    title: "Family Dialogue Prompts",
    description:
      "Conversation starters that help families speak with more honesty, patience, and mutual respect.",
    category: "Relationships",
  },
] as const;

export const counsellorProfile = {
  name: "Dr. Benna",
  role: "Philosophical Counsellor",
  bio: "Benna works with people seeking clarity, steadiness, and a more meaningful way to navigate life’s complexity. The practice blends careful listening, philosophical reflection, and humane practical insight.",
  qualifications: [
    "MA in Philosophy",
    "Certified Counselling Practitioner",
    "Training in reflective dialogue and family conversations",
  ],
  specializations: [
    "Meaning and direction",
    "Personal transitions",
    "Family dynamics",
    "Values-based decision making",
  ],
} as const;
