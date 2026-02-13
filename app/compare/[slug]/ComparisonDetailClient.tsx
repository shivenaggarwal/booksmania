"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Star,
  Check,
  X,
  ExternalLink,
  Award,
  Share2,
} from "lucide-react";
import { ComparisonArticle } from "@/lib/types";
import { getAffiliateUrl } from "@/lib/affiliate";
import FadeIn from "@/app/components/FadeIn";

interface ComparisonDetailClientProps {
  article: ComparisonArticle;
}

export default function ComparisonDetailClient({
  article,
}: ComparisonDetailClientProps) {
  const formattedDate = new Date(article.publishedDate).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="min-h-screen pt-36 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* Back link */}
        <FadeIn>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-text-muted hover:text-accent transition-colors mb-10"
          >
            <ArrowLeft size={13} />
            All Comparisons
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="text-xs tracking-wider uppercase text-accent font-medium">
                {article.category}
              </span>
              <span className="text-text-muted text-xs">·</span>
              <span className="flex items-center gap-1 text-text-muted text-xs">
                <Clock size={11} />
                {article.readTime} min read
              </span>
              <span className="text-text-muted text-xs">·</span>
              <span className="flex items-center gap-1 text-text-muted text-xs">
                <Calendar size={11} />
                {formattedDate}
              </span>
            </div>

            <h1 className="heading-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              {article.title}
            </h1>

            <p className="text-text-secondary text-base max-w-xl mx-auto">
              {article.excerpt}
            </p>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: article.title,
                    text: article.excerpt,
                    url: window.location.href,
                  });
                }
              }}
              className="inline-flex items-center gap-1.5 mt-6 text-xs text-text-muted hover:text-accent transition-colors"
            >
              <Share2 size={12} />
              Share
            </button>
          </div>
        </FadeIn>

        {/* Book covers comparison banner */}
        <FadeIn>
          <div className="flex items-center justify-center gap-8 md:gap-16 py-10 mb-12">
            {article.books.slice(0, 2).map((book, i) => (
              <motion.div
                key={book.bookId}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="relative w-[140px] md:w-[180px] aspect-[2/3] rounded-sm overflow-hidden book-shadow mx-auto mb-4">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>
                <h3 className="heading-serif text-lg text-text-primary">
                  {book.title}
                </h3>
                <p className="text-text-muted text-xs mt-1">{book.author}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star size={11} className="fill-accent text-accent" />
                  <span className="text-xs text-text-secondary">
                    {book.rating}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Detailed comparison for each book */}
        <div className="space-y-12">
          {article.books.map((book, i) => (
            <FadeIn key={book.bookId}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-warm/40 rounded-sm border border-border p-8 md:p-10"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative w-[70px] aspect-[2/3] rounded-sm overflow-hidden shrink-0 book-shadow">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="70px"
                    />
                  </div>
                  <div>
                    <h2 className="heading-serif text-2xl text-text-primary">
                      {book.title}
                    </h2>
                    <p className="text-text-muted text-sm mt-1">
                      by {book.author}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star size={12} className="fill-accent text-accent" />
                      <span className="text-sm text-text-secondary">
                        {book.rating}/5
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {book.summary}
                </p>

                {/* Best For */}
                <div className="bg-accent-light rounded-sm p-4 mb-6">
                  <p className="text-xs tracking-wider uppercase text-accent font-medium mb-1">
                    Best For
                  </p>
                  <p className="text-sm text-text-primary">{book.bestFor}</p>
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs tracking-wider uppercase text-green-600 font-medium mb-3">
                      Pros
                    </p>
                    <ul className="space-y-2">
                      {book.pros.map((pro) => (
                        <li
                          key={pro}
                          className="flex items-start gap-2 text-sm text-text-secondary"
                        >
                          <Check
                            size={14}
                            className="text-green-500 mt-0.5 shrink-0"
                          />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs tracking-wider uppercase text-red-500 font-medium mb-3">
                      Cons
                    </p>
                    <ul className="space-y-2">
                      {book.cons.map((con) => (
                        <li
                          key={con}
                          className="flex items-start gap-2 text-sm text-text-secondary"
                        >
                          <X
                            size={14}
                            className="text-red-400 mt-0.5 shrink-0"
                          />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Buy link */}
                <a
                  href={getAffiliateUrl(book.isbn)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-text-primary text-surface px-6 py-3 text-xs tracking-[0.15em] uppercase hover:bg-accent transition-colors duration-300"
                >
                  Buy on Amazon
                  <ExternalLink size={12} />
                </a>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Verdict */}
        <FadeIn>
          <div className="mt-14 bg-surface border border-border-dark rounded-sm p-8 md:p-10">
            <div className="flex items-center gap-2 mb-4">
              <Award size={18} className="text-accent" />
              <p className="label-uppercase text-accent">Our Verdict</p>
            </div>
            <p className="text-text-primary text-sm md:text-base leading-relaxed">
              {article.verdict}
            </p>
          </div>
        </FadeIn>

        {/* Tags */}
        <FadeIn>
          <div className="mt-10 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-surface-warm rounded-sm text-xs text-text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Affiliate disclaimer */}
        <FadeIn>
          <p className="text-text-muted text-[10px] mt-8 text-center">
            As an Amazon Associate, Booksmania earns from qualifying
            purchases. Prices may vary.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
