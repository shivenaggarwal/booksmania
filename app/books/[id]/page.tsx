"use client";

import { useParams } from "next/navigation";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, ArrowLeft, BookOpen, Calendar, Layers, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BookCard from "@/app/components/BookCard";
import { getBookById, featuredBooks } from "@/lib/books";
import { getAmazonAffiliateUrl, getBookshopAffiliateUrl } from "@/lib/affiliate";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const book = getBookById(id);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [0.2, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  if (!book) {
    return (
      <div className="min-h-screen pt-36 flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-serif text-3xl text-text-primary mb-4">
            Book not found
          </h1>
          <Link
            href="/books"
            className="text-accent text-sm hover:underline"
          >
            ← Back to all books
          </Link>
        </div>
      </div>
    );
  }

  const relatedBooks = featuredBooks
    .filter((b) => b.genre === book.genre && b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Cinematic hero with blurred backdrop */}
      <div ref={heroRef} className="relative h-[65vh] overflow-hidden">
        {/* Blurred background cover */}
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0"
        >
          <Image
            src={book.coverImage}
            alt=""
            fill
            className="object-cover blur-2xl"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-background/70" />
        </motion.div>

        {/* Content overlay */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10 flex items-end pb-16"
        >
          <div className="flex flex-col md:flex-row gap-10 items-end">
            {/* Book cover */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 relative w-[180px] md:w-[220px] aspect-[2/3] rounded-sm overflow-hidden book-shadow"
            >
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                className="object-cover"
                sizes="220px"
                priority
              />
              <div
                className="absolute left-0 top-0 bottom-0 w-2 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 100%)",
                }}
              />
            </motion.div>

            {/* Title + meta */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-2"
            >
              <Link
                href="/books"
                className="inline-flex items-center gap-1.5 text-text-muted text-xs tracking-wider uppercase hover:text-accent transition-colors mb-4"
              >
                <ArrowLeft size={12} />
                Back to books
              </Link>
              <h1 className="heading-serif text-4xl md:text-5xl text-text-primary mb-2">
                {book.title}
              </h1>
              <p className="text-text-secondary text-sm">by {book.author}</p>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(book.rating)
                          ? "fill-accent text-accent"
                          : "text-border-dark"
                      }
                    />
                  ))}
                  <span className="text-text-secondary text-xs ml-1.5">
                    {book.rating} ({book.reviewCount.toLocaleString()})
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Book details */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Description + CTA */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="label-uppercase mb-4">About This Book</h2>
              <p className="text-text-secondary leading-relaxed text-[15px] mb-8">
                {book.description}
              </p>

              {/* Affiliate buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={getAmazonAffiliateUrl(book.isbn)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-text-primary text-surface px-7 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-accent transition-colors duration-500"
                >
                  Buy on Amazon
                  <ExternalLink size={12} />
                </a>
                <a
                  href={getBookshopAffiliateUrl(book.isbn)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-text-primary text-text-primary px-7 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-text-primary hover:text-surface transition-all duration-500"
                >
                  Buy on Bookshop
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Meta sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="label-uppercase mb-4">Details</h2>
            <div className="space-y-4">
              {[
                {
                  icon: <BookOpen size={15} />,
                  label: "Pages",
                  value: book.pageCount,
                },
                {
                  icon: <Calendar size={15} />,
                  label: "Published",
                  value: new Date(book.publishedDate).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  ),
                },
                {
                  icon: <Layers size={15} />,
                  label: "Genre",
                  value: book.genre,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 py-3 border-b border-border"
                >
                  <span className="text-accent">{item.icon}</span>
                  <div>
                    <p className="text-text-muted text-xs">{item.label}</p>
                    <p className="text-text-primary text-sm">{item.value}</p>
                  </div>
                </div>
              ))}

              {book.price && (
                <div className="pt-2">
                  <p className="text-text-muted text-xs">Price</p>
                  <p className="heading-serif text-2xl text-accent mt-1">
                    ${book.price}
                  </p>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="mt-6">
              <p className="label-uppercase mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-surface-warm text-text-secondary text-xs rounded-sm border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related books */}
      {relatedBooks.length > 0 && (
        <section className="py-16 bg-surface-warm/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="label-uppercase mb-3">You Might Also Like</p>
              <h2 className="heading-serif text-2xl md:text-3xl text-text-primary mb-10">
                Similar Books
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {relatedBooks.map((b, i) => (
                <BookCard key={b.id} book={b} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
