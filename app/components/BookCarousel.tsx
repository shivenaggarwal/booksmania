"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import BookCard from "./BookCard";
import { Book } from "@/lib/types";

interface BookCarouselProps {
  title: string;
  subtitle?: string;
  books: Book[];
  href?: string;
}

export default function BookCarousel({ title, subtitle, books, href }: BookCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section ref={containerRef} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          style={{ opacity, y }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            {subtitle && (
              <p className="label-uppercase mb-3">{subtitle}</p>
            )}
            <h2 className="heading-serif text-3xl md:text-4xl text-text-primary">
              {title}
            </h2>
          </div>
          {href && (
            <Link
              href={href}
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-text-secondary hover:text-accent transition-colors"
            >
              View all
              <ArrowRight size={13} />
            </Link>
          )}
        </motion.div>

        {/* Horizontal scroll */}
        <div className="overflow-x-auto no-scrollbar -mx-6 px-6">
          <div className="flex gap-6 md:gap-8" style={{ width: "max-content" }}>
            {books.map((book, i) => (
              <div key={book.id} className="w-[200px] md:w-[220px] flex-shrink-0">
                <BookCard book={book} index={i} />
              </div>
            ))}
          </div>
        </div>

        {href && (
          <div className="md:hidden mt-8 text-center">
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-text-secondary hover:text-accent transition-colors"
            >
              View all
              <ArrowRight size={13} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
