"use client";

import { GitCompareArrows } from "lucide-react";
import ComparisonCard from "@/app/components/ComparisonCard";
import FadeIn from "@/app/components/FadeIn";
import { comparisonArticles } from "@/lib/comparisons";

export default function CompareListingClient() {
  return (
    <div className="min-h-screen pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GitCompareArrows size={16} className="text-accent" />
              <p className="label-uppercase">Book Comparisons</p>
            </div>
            <h1 className="heading-serif text-4xl md:text-6xl text-text-primary mb-4">
              Compare. Decide. Read.
            </h1>
            <p className="text-text-secondary text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              In-depth side-by-side comparisons to help you choose between
              similar books. Pros, cons, and our honest verdict.
            </p>
          </div>
        </FadeIn>

        {/* Comparison cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {comparisonArticles.map((article, i) => (
            <ComparisonCard key={article.slug} article={article} index={i} />
          ))}
        </div>

        {/* SEO Footer Text */}
        <FadeIn>
          <div className="mt-20 pt-12 border-t border-border text-center">
            <p className="text-text-muted text-xs leading-relaxed max-w-2xl mx-auto">
              Our comparison pages provide detailed, unbiased analysis of
              popular books. We evaluate writing style, actionability, depth,
              and value to help you make informed reading decisions. All
              recommendations include affiliate links — we earn a small
              commission at no extra cost to you.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
