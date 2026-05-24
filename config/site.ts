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
    { label: "Book", href: "/book-session" },
    { label: "Blog", href: "/blog" },
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

export const appointmentServices = [
  {
    value: "personal",
    label: "Personal Counselling",
    description: "For identity questions, life transitions, burnout, and decision clarity.",
  },
  {
    value: "family",
    label: "Family Counselling",
    description: "For family communication, tension, and shared values work.",
  },
  {
    value: "meaning",
    label: "Meaning and Direction Session",
    description: "For purpose, uncertainty, and deeper reflective questions.",
  },
] as const;

export const sessionPackages = [
  {
    name: "Single Session",
    price: "$120",
    note: "A focused 60-minute conversation for immediate clarity.",
  },
  {
    name: "5-Session Path",
    price: "$560",
    note: "Ideal for sustained reflection and meaningful forward movement.",
  },
  {
    name: "10-Session Deep Work",
    price: "$1,050",
    note: "Best for layered personal work, family dialogue, or long transitions.",
  },
] as const;

export const appointmentSlots = [
  {
    day: "Monday",
    times: ["09:00 AM", "11:30 AM", "03:00 PM"],
  },
  {
    day: "Wednesday",
    times: ["10:00 AM", "01:00 PM", "05:30 PM"],
  },
  {
    day: "Friday",
    times: ["09:30 AM", "12:00 PM", "04:00 PM"],
  },
  {
    day: "Saturday",
    times: ["10:00 AM", "12:30 PM"],
  },
] as const;
