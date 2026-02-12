"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { featuredBooks } from "@/lib/books";

const heroBooks = featuredBooks.slice(0, 4);

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % heroBooks.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + heroBooks.length) % heroBooks.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const book = heroBooks[current];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  const bookVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      rotateY: dir > 0 ? 15 : -15,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      rotateY: -8,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      rotateY: dir > 0 ? -15 : 15,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-36 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text content */}
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.h1
                  className="heading-serif text-5xl md:text-6xl lg:text-7xl text-text-primary mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {book.title.split(" ").map((word, i) => (
                    <span key={i}>
                      {i === Math.floor(book.title.split(" ").length / 2) ? (
                        <em className="text-accent">{word}</em>
                      ) : (
                        word
                      )}
                      {" "}
                    </span>
                  ))}
                </motion.h1>

                <motion.p
                  className="text-text-secondary text-sm leading-relaxed max-w-md mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {book.description}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/books/${book.id}`}
                    className="inline-flex items-center gap-3 border border-text-primary text-text-primary px-7 py-3 text-xs tracking-[0.2em] uppercase hover:bg-text-primary hover:text-surface transition-all duration-500"
                  >
                    Read More
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            <div className="flex items-center gap-6 mt-12">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-border-dark flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all duration-300"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-border-dark flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all duration-300"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2 mt-6">
              {heroBooks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    i === current
                      ? "bg-accent w-6"
                      : "bg-border-dark hover:bg-text-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: book cover */}
          <div className="relative flex items-center justify-center" style={{ perspective: "1200px" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={bookVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Decorative rings behind book */}
                <div className="absolute -top-16 -right-16 w-64 h-64 border border-border-dark rounded-full opacity-40" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 border border-border rounded-full opacity-30" />

                <div className="relative w-[280px] md:w-[320px] aspect-[2/3] book-shadow rounded-sm overflow-hidden">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="320px"
                    priority
                  />
                </div>

                {/* Author caption */}
                <motion.p
                  className="text-right mt-4 text-text-muted text-xs italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  — {book.author}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
