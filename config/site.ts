export const siteConfig = {
  name: "Benna Philosophical Counselling",
  description:
    "A modern philosophical counselling practice helping people find clarity, resilience, and meaning through reflective conversation.",
  url: "https://github.com/Kiran-Shetty-afk/Philosophical_Counselling",
  navItems: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
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
