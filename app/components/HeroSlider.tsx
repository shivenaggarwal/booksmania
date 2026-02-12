"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { featuredBooks } from "@/lib/books";

const heroBooks = featuredBooks.slice(0, 4);

/* ─── 3D Book Component ─────────────────────────────────── */
function OpenableBook({
  coverImage,
  title,
  author,
  quote,
  onHoverChange,
}: {
  coverImage: string;
  title: string;
  author: string;
  quote?: string;
  onHoverChange?: (hovered: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-[280px] md:w-[320px] cursor-pointer"
      style={{ perspective: "1600px" }}
      onMouseEnter={() => { setHovered(true); onHoverChange?.(true); }}
      onMouseLeave={() => { setHovered(false); onHoverChange?.(false); }}
    >
      {/* Whole book wrapper */}
      <div
        className="relative aspect-[2/3]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── INNER PAGE (quote page, revealed when cover opens) ── */}
        <motion.div
          className="absolute inset-0 rounded-sm overflow-hidden"
          initial={false}
          animate={{
            boxShadow: hovered
              ? "4px 8px 40px rgba(0,0,0,0.15)"
              : "2px 4px 20px rgba(0,0,0,0.08)",
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Page background */}
          <div className="absolute inset-0 bg-[#faf6f1] border border-border-dark/30 rounded-sm" />

          {/* Faint ruled lines */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 27px, #1a1a1a 28px)",
            }}
          />

          {/* Spine shadow on left */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 100%)",
            }}
          />

          {/* Quote content */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center h-full px-10 md:px-14 py-10"
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 12,
            }}
            transition={{
              duration: 0.5,
              delay: hovered ? 0.3 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Quote size={24} className="text-accent/40 mb-5 rotate-180" />
            <p className="heading-serif text-lg md:text-xl text-text-primary/80 text-center leading-relaxed italic">
              {quote || "A beautiful story awaits within these pages."}
            </p>
            <div className="mt-6 w-10 h-[1px] bg-accent/30" />
            <p className="mt-3 text-[10px] tracking-[0.2em] uppercase text-text-muted">
              {author}
            </p>
          </motion.div>
        </motion.div>

        {/* ── FRONT COVER (swings fully open behind the book) ── */}
        <motion.div
          className="absolute inset-0 rounded-sm book-shadow"
          style={{
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
          }}
          initial={false}
          animate={{
            rotateY: hovered ? -160 : 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Front face — the cover image */}
          <div className="absolute inset-0 rounded-sm overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              sizes="320px"
              priority
            />

            {/* Spine edge highlight */}
            <div
              className="absolute left-0 top-0 bottom-0 w-3 pointer-events-none"
              style={{
                background: "linear-gradient(to right, rgba(0,0,0,0.2) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* Back face of the cover (visible as it swings open) */}
          <div
            className="absolute inset-0 rounded-sm bg-white"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          />
        </motion.div>

        {/* ── BOOK SPINE ── */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[6px] bg-[#d4ccc2] rounded-l-[2px]"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Hint text below */}
      <motion.p
        className="text-center mt-4 text-text-muted text-[10px] tracking-[0.15em] uppercase"
        initial={false}
        animate={{
          opacity: hovered ? 0 : 0.6,
          y: hovered ? -4 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        Hover to peek inside
      </motion.p>

      {/* Author caption — visible when open */}
      <motion.p
        className="text-right mt-1 text-text-muted text-xs italic"
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 6,
        }}
        transition={{ duration: 0.4, delay: hovered ? 0.25 : 0 }}
      >
        — {author}
      </motion.p>
    </div>
  );
}

/* ─── Hero Slider ────────────────────────────────────────── */
export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const pausedRef = useRef(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % heroBooks.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + heroBooks.length) % heroBooks.length);
  }, []);

  // Auto-advance (pauses when book is hovered)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) next();
    }, 6000);
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

  const bookEnterVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.92,
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

          {/* Right: openable book */}
          <div className="relative flex items-center justify-center">
            {/* Decorative rings behind book */}
            <div className="absolute -top-16 -right-16 w-64 h-64 border border-border-dark rounded-full opacity-40" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 border border-border rounded-full opacity-30" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={bookEnterVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <OpenableBook
                  coverImage={book.coverImage}
                  title={book.title}
                  author={book.author}
                  quote={book.quote}
                  onHoverChange={(h) => { pausedRef.current = h; }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
