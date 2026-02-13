import { Book, RecommendationResult } from "./types";
import { featuredBooks } from "./books";

// ─── Mood / Goal / Genre Mappings ─────────────────────────

export const moods = [
  { label: "Inspired & Motivated", value: "inspired", emoji: "🔥" },
  { label: "Curious & Intellectual", value: "curious", emoji: "🧠" },
  { label: "Adventurous & Thrilled", value: "adventurous", emoji: "🚀" },
  { label: "Reflective & Calm", value: "reflective", emoji: "🌙" },
  { label: "Romantic & Emotional", value: "romantic", emoji: "💝" },
  { label: "Focused & Determined", value: "focused", emoji: "🎯" },
];

export const goals = [
  { label: "Build Better Habits", value: "habits", emoji: "⚡" },
  { label: "Grow My Career", value: "career", emoji: "📈" },
  { label: "Understand People Better", value: "people", emoji: "🤝" },
  { label: "Escape into Another World", value: "escape", emoji: "🌍" },
  { label: "Learn Something New", value: "learn", emoji: "📚" },
  { label: "Find Meaning & Purpose", value: "meaning", emoji: "✨" },
];

// Book scoring profiles: how well each book matches moods and goals
const bookProfiles: Record<
  string,
  { moods: Record<string, number>; goals: Record<string, number>; keywords: string[] }
> = {
  "1": {
    // The Midnight Library
    moods: { reflective: 10, romantic: 6, curious: 7, inspired: 5, adventurous: 3, focused: 2 },
    goals: { meaning: 10, people: 7, escape: 8, learn: 5, habits: 2, career: 2 },
    keywords: ["midnight library", "matt haig", "fiction", "philosophical", "regret", "parallel lives", "depression", "choices"],
  },
  "2": {
    // Project Hail Mary
    moods: { adventurous: 10, curious: 9, inspired: 7, focused: 5, reflective: 3, romantic: 2 },
    goals: { escape: 10, learn: 8, meaning: 5, career: 3, habits: 2, people: 4 },
    keywords: ["project hail mary", "andy weir", "sci-fi", "space", "survival", "martian", "science", "aliens"],
  },
  "3": {
    // Atomic Habits
    moods: { focused: 10, inspired: 9, curious: 6, reflective: 4, adventurous: 2, romantic: 1 },
    goals: { habits: 10, career: 8, learn: 7, meaning: 4, people: 3, escape: 1 },
    keywords: ["atomic habits", "james clear", "habits", "productivity", "self-help", "systems", "goals", "discipline"],
  },
  "4": {
    // Dune
    moods: { adventurous: 10, curious: 8, reflective: 6, focused: 5, inspired: 4, romantic: 3 },
    goals: { escape: 10, learn: 7, meaning: 6, people: 5, career: 3, habits: 1 },
    keywords: ["dune", "frank herbert", "sci-fi", "desert", "politics", "epic", "fantasy", "world-building"],
  },
  "5": {
    // The Psychology of Money
    moods: { curious: 10, focused: 8, inspired: 7, reflective: 6, adventurous: 2, romantic: 1 },
    goals: { career: 10, learn: 9, habits: 6, meaning: 5, people: 4, escape: 1 },
    keywords: ["psychology of money", "morgan housel", "finance", "investing", "wealth", "money", "behavior"],
  },
  "6": {
    // Klara and the Sun
    moods: { reflective: 10, curious: 8, romantic: 7, inspired: 4, adventurous: 3, focused: 2 },
    goals: { meaning: 9, people: 8, escape: 7, learn: 6, career: 1, habits: 1 },
    keywords: ["klara", "ishiguro", "ai", "literary", "consciousness", "love", "artificial intelligence"],
  },
  "7": {
    // The Song of Achilles
    moods: { romantic: 10, reflective: 8, adventurous: 6, inspired: 5, curious: 4, focused: 2 },
    goals: { escape: 9, meaning: 8, people: 7, learn: 5, career: 1, habits: 1 },
    keywords: ["song of achilles", "madeline miller", "mythology", "romance", "historical", "iliad", "greek"],
  },
  "8": {
    // Educated
    moods: { inspired: 10, reflective: 8, curious: 7, focused: 6, adventurous: 4, romantic: 3 },
    goals: { meaning: 9, learn: 9, career: 6, people: 6, habits: 4, escape: 5 },
    keywords: ["educated", "tara westover", "memoir", "education", "resilience", "family", "coming of age"],
  },
};

// ─── Recommendation Engine ────────────────────────────────

export function getRecommendations(
  mood: string,
  goal: string,
  lastBookRead: string
): RecommendationResult[] {
  const lastBookLower = lastBookRead.toLowerCase().trim();
  const results: RecommendationResult[] = [];

  for (const book of featuredBooks) {
    const profile = bookProfiles[book.id];
    if (!profile) continue;

    let score = 0;

    // Mood matching (0-10)
    score += (profile.moods[mood] || 0) * 3;

    // Goal matching (0-10)
    score += (profile.goals[goal] || 0) * 3;

    // If the user's last book is this book, deprioritize it
    const isLastBook = profile.keywords.some((kw) => lastBookLower.includes(kw));
    if (isLastBook) {
      score -= 50;
    }

    // If user's last book shares keywords with this book, slight boost for similar tastes
    if (lastBookLower.length > 0 && !isLastBook) {
      const overlap = profile.keywords.filter((kw) => lastBookLower.includes(kw)).length;
      score += overlap * 5;
    }

    // Generate reason
    const reason = generateReason(book, mood, goal, isLastBook, lastBookLower);

    results.push({ book, matchScore: Math.max(score, 0), reason });
  }

  // Sort by score descending, return top results
  return results
    .sort((a, b) => b.matchScore - a.matchScore)
    .filter((r) => r.matchScore > 0)
    .slice(0, 5);
}

function generateReason(
  book: Book,
  mood: string,
  goal: string,
  isLastBook: boolean,
  lastBook: string
): string {
  if (isLastBook) {
    return `Since you've already read ${book.title}, we recommend exploring other titles.`;
  }

  const moodReasons: Record<string, Record<string, string>> = {
    inspired: {
      "1": "The Midnight Library's exploration of infinite possibilities will ignite your sense of what's achievable.",
      "2": "Project Hail Mary's never-give-up protagonist will fuel your motivation to tackle any challenge.",
      "3": "Atomic Habits is the ultimate inspiration-to-action manual — transform enthusiasm into lasting change.",
      "4": "Dune's hero journey shows how ordinary people rise to extraordinary challenges.",
      "5": "The Psychology of Money reveals that financial freedom comes from mindset, not just money.",
      "6": "Klara's unwavering dedication shows the power of purpose and belief.",
      "7": "Achilles' quest for glory reminds us what we're willing to sacrifice for greatness.",
      "8": "Educated is one of the most inspiring true stories ever written — proof that anyone can transform their life.",
    },
    curious: {
      "1": "Explore parallel universes and what-if scenarios that will stretch your imagination.",
      "2": "Hard science meets creative problem-solving in the most intellectually satisfying way possible.",
      "3": "Understand the fascinating neuroscience of why we do what we do.",
      "4": "Dune's intricate world-building in politics, ecology, and religion will satisfy every curious mind.",
      "5": "Counter-intuitive insights about money that will challenge everything you think you know.",
      "6": "A Nobel laureate explores consciousness and what it means to be human through AI.",
      "7": "Ancient mythology reimagined with modern emotional intelligence.",
      "8": "A true story so extraordinary it challenges your assumptions about education and family.",
    },
    adventurous: {
      "1": "Travel through countless lives and realities in this imaginative adventure.",
      "2": "An interstellar survival mission with the fate of humanity at stake — pure adrenaline.",
      "3": "Transform your daily life into an adventure of continuous improvement.",
      "4": "The greatest science fiction epic ever written — an entire universe awaits.",
      "5": "Navigate the wild, unpredictable world of wealth and financial decisions.",
      "6": "Explore a near-future world through the eyes of an artificial being.",
      "7": "Battle gods and monsters alongside the greatest warriors of Greek mythology.",
      "8": "Escape a survivalist compound and journey to the world's greatest universities.",
    },
    reflective: {
      "1": "A profound meditation on regret, choice, and the beauty of imperfect lives.",
      "2": "Solitude in space provides the backdrop for deep questions about purpose and sacrifice.",
      "3": "Reflect on who you are versus who you want to become through the lens of identity-based habits.",
      "4": "Herbert's philosophical depth on power, religion, and ecology invites deep contemplation.",
      "5": "Quietly revolutionary insights that will reshape how you think about wealth and life.",
      "6": "A gentle, profound exploration of love, consciousness, and what matters most.",
      "7": "Meditate on love, mortality, and what it means to be remembered through the ages.",
      "8": "A deeply thoughtful memoir about identity, family bonds, and the cost of self-discovery.",
    },
    romantic: {
      "1": "A love letter to the beauty of an imperfect life, full of tender moments.",
      "2": "An unlikely friendship across species that will warm your heart.",
      "3": "Fall in love with becoming the best version of yourself.",
      "4": "Epic romance woven through political intrigue in a desert empire.",
      "5": "Discover the romance of compound interest and shared financial goals.",
      "6": "A beautiful, heartbreaking story about the nature of love itself.",
      "7": "One of the most beautiful love stories ever written, spanning gods and mortals.",
      "8": "A love story about education, self-discovery, and the bonds that define us.",
    },
    focused: {
      "1": "Focus on what matters most by exploring the paths you didn't take.",
      "2": "Watch laser-focused problem-solving save humanity — one equation at a time.",
      "3": "The definitive guide to building unbreakable focus through habit systems.",
      "4": "Paul Atreides' intense focus and training show the power of disciplined preparation.",
      "5": "Sharpen your financial focus with clear-headed insights about money decisions.",
      "6": "Klara's singular focus on her purpose is a study in dedication.",
      "7": "Warriors training for destiny — a story of relentless focus and commitment.",
      "8": "Watch unwavering determination transform a life against impossible odds.",
    },
  };

  const reason = moodReasons[mood]?.[book.id];
  if (reason) return reason;

  // Fallback
  return `Based on your mood and goals, ${book.title} by ${book.author} is a great match.`;
}
