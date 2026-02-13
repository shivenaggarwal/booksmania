"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, GitCompareArrows } from "lucide-react";
import { ComparisonArticle } from "@/lib/types";

interface ComparisonCardProps {
  article: ComparisonArticle;
  index?: number;
}

export default function ComparisonCard({
  article,
  index = 0,
}: ComparisonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/compare/${article.slug}`} className="group block hover-lift">
        <div className="bg-surface-warm/50 rounded-sm overflow-hidden border border-border">
          {/* Book covers side by side */}
          <div className="relative flex items-center justify-center gap-6 py-8 px-6 bg-gradient-to-br from-surface-warm to-surface">
            {article.books.slice(0, 2).map((book, i) => (
              <div key={book.bookId} className="relative">
                <div
                  className={`relative w-[100px] md:w-[120px] aspect-[2/3] rounded-sm overflow-hidden book-shadow transition-transform duration-500 ${
                    i === 0
                      ? "group-hover:-rotate-3 group-hover:-translate-x-2"
                      : "group-hover:rotate-3 group-hover:translate-x-2"
                  }`}
                >
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
              </div>
            ))}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border border-border-dark flex items-center justify-center z-10">
              <GitCompareArrows size={16} className="text-accent" />
            </div>
          </div>

          {/* Info */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs tracking-wider uppercase text-accent font-medium">
                {article.category}
              </span>
              <span className="text-text-muted text-xs">·</span>
              <span className="flex items-center gap-1 text-text-muted text-xs">
                <Clock size={11} />
                {article.readTime} min
              </span>
            </div>
            <h3 className="heading-serif text-xl text-text-primary group-hover:text-accent transition-colors duration-300 mb-2">
              {article.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
              {article.excerpt}
            </p>
            <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-accent group-hover:gap-3 transition-all duration-300">
              Read Comparison
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
