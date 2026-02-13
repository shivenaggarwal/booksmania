"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroSlider from "@/app/components/HeroSlider";
import BookCarousel from "@/app/components/BookCarousel";
import CategoryGrid from "@/app/components/CategoryGrid";
import BookCard from "@/app/components/BookCard";
import BlogCard from "@/app/components/BlogCard";
import ComparisonCard from "@/app/components/ComparisonCard";
import Reveal from "@/app/components/Reveal";
import { trendingBooks, staffPicks, featuredBooks } from "@/lib/books";
import { blogPosts } from "@/lib/blog";
import { comparisonArticles } from "@/lib/comparisons";
import {
  BookOpen,
  Sparkles,
  Heart,
  Newspaper,
  GitCompareArrows,
  ArrowRight,
  Brain,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ThreeBackground = dynamic(
  () => import("@/app/components/ThreeBackground"),
  { ssr: false }
);

function FeaturedBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const book = featuredBooks[3]; // Dune

  return (
    <section ref={ref} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-sm bg-surface-warm p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Parallax BG elements */}
            <motion.div
              style={{ y: bgY }}
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-border opacity-30"
            />
            <motion.div
              style={{ y: bgY }}
              className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full border border-border opacity-20"
            />

            <div className="relative z-10">
              <p className="label-uppercase mb-4">Editor&apos;s Choice</p>
              <h2 className="heading-serif text-3xl md:text-5xl text-text-primary mb-4">
                {book.title}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-md">
                {book.description}
              </p>
              <p className="text-text-muted text-xs mb-6">by {book.author}</p>
              <a
                href={`/books/${book.id}`}
                className="inline-flex items-center gap-3 bg-text-primary text-surface px-7 py-3 text-xs tracking-[0.2em] uppercase hover:bg-accent transition-colors duration-500"
              >
                Discover
                <Sparkles size={13} />
              </a>
            </div>

            <div className="relative z-10 flex justify-center">
              <div className="relative w-[200px] md:w-[240px] aspect-[2/3] rounded-sm overflow-hidden book-shadow">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="240px"
                />
                <div
                  className="absolute left-0 top-0 bottom-0 w-2 pointer-events-none"
                  style={{
                    background: "linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StaffPicksSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="text-center mb-14">
            <p className="label-uppercase mb-3">Curated for You</p>
            <h2 className="heading-serif text-3xl md:text-4xl text-text-primary">
              Staff Picks
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {staffPicks.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyBooksmania() {
  const features = [
    {
      icon: <BookOpen size={22} />,
      number: "01",
      title: "Curated Collections",
      description:
        "Every book is handpicked by our team of passionate readers and literary experts.",
    },
    {
      icon: <Sparkles size={22} />,
      number: "02",
      title: "Trusted Reviews",
      description:
        "Real ratings from a community of thousands of dedicated book lovers.",
    },
    {
      icon: <Heart size={22} />,
      number: "03",
      title: "Made for Readers",
      description:
        "A beautiful, distraction-free experience designed around the joy of discovery.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-surface-warm/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="text-center mb-16">
            <p className="label-uppercase mb-3">Why Booksmania</p>
            <h2 className="heading-serif text-3xl md:text-4xl text-text-primary">
              Built for Book Lovers
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feat, i) => (
            <motion.div
              key={feat.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full border border-border-dark flex items-center justify-center mx-auto mb-5 text-accent">
                {feat.icon}
              </div>
              <p className="text-accent text-xs tracking-wider mb-2">{feat.number}</p>
              <h3 className="heading-serif text-xl text-text-primary mb-3">
                {feat.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <ThreeBackground />
      <HeroSlider />
      <BookCarousel
        title="Trending Now"
        subtitle="Popular This Week"
        books={trendingBooks}
        href="/books"
      />
      <CategoryGrid />
      <FeaturedBanner />

      {/* AI Recommender CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/10 p-10 md:p-16 text-center">
              <motion.div
                className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-accent/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Brain size={28} className="text-accent" />
                </div>
                <p className="label-uppercase mb-3 text-accent">
                  AI-Powered
                </p>
                <h2 className="heading-serif text-3xl md:text-5xl text-text-primary mb-4">
                  Not sure what to read next?
                </h2>
                <p className="text-text-secondary text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
                  Tell us your mood, your goal, and what you last read. Our
                  AI recommender will find your perfect book match in
                  seconds.
                </p>
                <Link
                  href="/recommend"
                  className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-500"
                >
                  <Sparkles size={14} />
                  Get Recommendations
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <StaffPicksSection />

      {/* Blog Preview */}
      <section className="py-20 md:py-28 bg-surface-warm/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Newspaper size={14} className="text-accent" />
                  <p className="label-uppercase">From the Blog</p>
                </div>
                <h2 className="heading-serif text-3xl md:text-4xl text-text-primary">
                  Latest Reading Guides
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden md:flex items-center gap-2 text-xs tracking-wider uppercase text-accent hover:text-accent-hover transition-colors"
              >
                View All
                <ArrowRight size={13} />
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-accent"
            >
              View All Articles
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Comparisons Preview */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <GitCompareArrows size={14} className="text-accent" />
                  <p className="label-uppercase">Book Comparisons</p>
                </div>
                <h2 className="heading-serif text-3xl md:text-4xl text-text-primary">
                  Which Book Should You Read?
                </h2>
              </div>
              <Link
                href="/compare"
                className="hidden md:flex items-center gap-2 text-xs tracking-wider uppercase text-accent hover:text-accent-hover transition-colors"
              >
                View All
                <ArrowRight size={13} />
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comparisonArticles.slice(0, 2).map((article, i) => (
              <ComparisonCard
                key={article.slug}
                article={article}
                index={i}
              />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-accent"
            >
              View All Comparisons
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <WhyBooksmania />
    </>
  );
}
