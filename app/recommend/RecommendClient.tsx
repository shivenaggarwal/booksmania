"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  Star,
  ExternalLink,
  ArrowRight,
  RotateCcw,
  Brain,
  Target,
  BookOpen,
} from "lucide-react";
import { moods, goals, getRecommendations } from "@/lib/recommendations";
import { getAffiliateUrl } from "@/lib/affiliate";
import { RecommendationResult } from "@/lib/types";
import FadeIn from "@/app/components/FadeIn";

type Step = "mood" | "goal" | "lastbook" | "results";

export default function RecommendClient() {
  const [step, setStep] = useState<Step>("mood");
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [lastBook, setLastBook] = useState("");
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setStep("goal");
  };

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
    setStep("lastbook");
  };

  const handleGetRecommendations = () => {
    setIsAnalyzing(true);
    // Simulate AI processing delay for UX
    setTimeout(() => {
      const recs = getRecommendations(selectedMood, selectedGoal, lastBook);
      setResults(recs);
      setIsAnalyzing(false);
      setStep("results");
    }, 1500);
  };

  const reset = () => {
    setStep("mood");
    setSelectedMood("");
    setSelectedGoal("");
    setLastBook("");
    setResults([]);
  };

  const stepNumber =
    step === "mood" ? 1 : step === "goal" ? 2 : step === "lastbook" ? 3 : 4;

  return (
    <div className="min-h-screen pt-36 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles size={16} className="text-accent" />
              <p className="label-uppercase">AI Book Recommender</p>
            </div>
            <h1 className="heading-serif text-4xl md:text-6xl text-text-primary mb-4">
              Find Your Perfect Read
            </h1>
            <p className="text-text-secondary text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Tell us your mood, your goal, and the last book you read. Our
              recommendation engine will find your perfect match.
            </p>
          </div>
        </FadeIn>

        {/* Progress bar */}
        <FadeIn>
          <div className="max-w-md mx-auto mb-12">
            <div className="flex items-center justify-between mb-3">
              {[
                { label: "Mood", icon: Brain, num: 1 },
                { label: "Goal", icon: Target, num: 2 },
                { label: "Last Read", icon: BookOpen, num: 3 },
                { label: "Results", icon: Sparkles, num: 4 },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-500 ${
                      stepNumber >= s.num
                        ? "bg-accent text-white"
                        : "bg-surface-warm text-text-muted border border-border"
                    }`}
                  >
                    <s.icon size={14} />
                  </div>
                  <span
                    className={`text-xs hidden sm:inline transition-colors ${
                      stepNumber >= s.num
                        ? "text-text-primary"
                        : "text-text-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < 3 && (
                    <div
                      className={`w-6 md:w-12 h-px transition-colors duration-500 ${
                        stepNumber > s.num ? "bg-accent" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {/* Step 1: Mood */}
          {step === "mood" && (
            <motion.div
              key="mood"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-center mb-8">
                <h2 className="heading-serif text-2xl md:text-3xl text-text-primary mb-2">
                  How are you feeling right now?
                </h2>
                <p className="text-text-secondary text-sm">
                  Your mood helps us match the right tone and energy.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {moods.map((mood, i) => (
                  <motion.button
                    key={mood.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleMoodSelect(mood.value)}
                    className="group p-6 bg-surface border border-border rounded-sm hover:border-accent hover:bg-accent-light transition-all duration-300 text-center"
                  >
                    <span className="text-3xl block mb-3">{mood.emoji}</span>
                    <span className="text-sm text-text-primary group-hover:text-accent transition-colors">
                      {mood.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Goal */}
          {step === "goal" && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-center mb-8">
                <h2 className="heading-serif text-2xl md:text-3xl text-text-primary mb-2">
                  What do you want from this book?
                </h2>
                <p className="text-text-secondary text-sm">
                  Your reading goal helps us find the perfect content.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {goals.map((goal, i) => (
                  <motion.button
                    key={goal.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleGoalSelect(goal.value)}
                    className="group p-6 bg-surface border border-border rounded-sm hover:border-accent hover:bg-accent-light transition-all duration-300 text-center"
                  >
                    <span className="text-3xl block mb-3">{goal.emoji}</span>
                    <span className="text-sm text-text-primary group-hover:text-accent transition-colors">
                      {goal.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => setStep("mood")}
                  className="text-xs text-text-muted hover:text-accent transition-colors"
                >
                  ← Back to mood
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Last book */}
          {step === "lastbook" && (
            <motion.div
              key="lastbook"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="heading-serif text-2xl md:text-3xl text-text-primary mb-2">
                  What was the last book you read?
                </h2>
                <p className="text-text-secondary text-sm">
                  This helps us avoid suggesting what you&apos;ve already read
                  and find similar vibes.
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={lastBook}
                  onChange={(e) => setLastBook(e.target.value)}
                  placeholder="e.g., Atomic Habits, Dune, Harry Potter..."
                  className="w-full px-5 py-4 bg-surface border border-border-dark rounded-sm text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleGetRecommendations();
                  }}
                />

                <button
                  onClick={handleGetRecommendations}
                  className="w-full flex items-center justify-center gap-3 bg-text-primary text-surface px-7 py-4 text-xs tracking-[0.2em] uppercase hover:bg-accent transition-colors duration-300"
                >
                  <Sparkles size={14} />
                  Get My Recommendations
                </button>

                <button
                  onClick={() => {
                    setLastBook("");
                    handleGetRecommendations();
                  }}
                  className="w-full text-center text-xs text-text-muted hover:text-accent transition-colors py-2"
                >
                  Skip — I don&apos;t remember
                </button>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => setStep("goal")}
                  className="text-xs text-text-muted hover:text-accent transition-colors"
                >
                  ← Back to goal
                </button>
              </div>
            </motion.div>
          )}

          {/* Analyzing */}
          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-2 border-border border-t-accent rounded-full mx-auto mb-6"
              />
              <h3 className="heading-serif text-2xl text-text-primary mb-2">
                Analyzing your preferences...
              </h3>
              <p className="text-text-secondary text-sm">
                Our AI is finding your perfect book matches
              </p>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === "results" && !isAnalyzing && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-center mb-10">
                <h2 className="heading-serif text-2xl md:text-3xl text-text-primary mb-2">
                  Your Perfect Book Matches
                </h2>
                <p className="text-text-secondary text-sm">
                  Based on your mood, goal, and reading history — here are our
                  top picks for you.
                </p>
              </div>

              {/* Selected preferences summary */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {selectedMood && (
                  <span className="px-3 py-1.5 bg-accent-light border border-accent/20 rounded-sm text-xs text-accent">
                    {moods.find((m) => m.value === selectedMood)?.emoji}{" "}
                    {moods.find((m) => m.value === selectedMood)?.label}
                  </span>
                )}
                {selectedGoal && (
                  <span className="px-3 py-1.5 bg-accent-light border border-accent/20 rounded-sm text-xs text-accent">
                    {goals.find((g) => g.value === selectedGoal)?.emoji}{" "}
                    {goals.find((g) => g.value === selectedGoal)?.label}
                  </span>
                )}
                {lastBook && (
                  <span className="px-3 py-1.5 bg-surface-warm border border-border rounded-sm text-xs text-text-secondary">
                    📖 Last read: {lastBook}
                  </span>
                )}
              </div>

              {/* Results */}
              <div className="space-y-6">
                {results.map((result, i) => (
                  <motion.div
                    key={result.book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex gap-5 md:gap-8 p-6 md:p-8 bg-surface border border-border rounded-sm hover:border-accent/30 transition-colors group"
                  >
                    {/* Rank */}
                    <div className="hidden md:flex flex-col items-center justify-start pt-2">
                      <span className="heading-serif text-3xl text-accent/30 group-hover:text-accent transition-colors">
                        #{i + 1}
                      </span>
                      <div className="mt-2 px-2 py-1 bg-accent-light rounded-sm">
                        <span className="text-[10px] text-accent font-medium tracking-wider uppercase">
                          {result.matchScore}% match
                        </span>
                      </div>
                    </div>

                    {/* Cover */}
                    <div className="relative w-[80px] md:w-[100px] aspect-[2/3] rounded-sm overflow-hidden shrink-0 book-shadow">
                      <Image
                        src={result.book.coverImage}
                        alt={result.book.title}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="heading-serif text-xl md:text-2xl text-text-primary group-hover:text-accent transition-colors">
                            {result.book.title}
                          </h3>
                          <p className="text-text-muted text-xs mt-1">
                            by {result.book.author}
                          </p>
                        </div>
                        <div className="md:hidden px-2 py-1 bg-accent-light rounded-sm shrink-0">
                          <span className="text-[10px] text-accent font-medium">
                            #{i + 1}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <Star
                          size={11}
                          className="fill-accent text-accent"
                        />
                        <span className="text-xs text-text-secondary">
                          {result.book.rating}
                        </span>
                        <span className="text-text-muted text-xs">·</span>
                        <span className="text-xs text-text-muted">
                          {result.book.genre}
                        </span>
                        {result.book.price && (
                          <>
                            <span className="text-text-muted text-xs">·</span>
                            <span className="text-xs text-accent font-medium">
                              ${result.book.price}
                            </span>
                          </>
                        )}
                      </div>

                      <p className="text-sm text-text-secondary leading-relaxed mt-3">
                        {result.reason}
                      </p>

                      <div className="flex items-center gap-4 mt-4">
                        <a
                          href={getAffiliateUrl(result.book.isbn)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-text-primary text-surface px-5 py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-accent transition-colors duration-300"
                        >
                          Buy on Amazon
                          <ExternalLink size={11} />
                        </a>
                        <a
                          href={`/books/${result.book.id}`}
                          className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-text-muted hover:text-accent transition-colors"
                        >
                          Learn More
                          <ArrowRight size={11} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Try again */}
              <div className="text-center mt-12">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
                >
                  <RotateCcw size={14} />
                  Try different preferences
                </button>
              </div>

              {/* Affiliate disclaimer */}
              <p className="text-text-muted text-[10px] mt-8 text-center">
                As an Amazon Associate, Booksmania earns from qualifying
                purchases. Recommendations are generated by our matching
                algorithm.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
