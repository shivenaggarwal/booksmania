"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import BookCard from "@/app/components/BookCard";
import CategoryPill from "@/app/components/CategoryPill";
import Reveal from "@/app/components/Reveal";
import { featuredBooks, categories } from "@/lib/books";

function BooksContent() {
  const searchParams = useSearchParams();
  const genreFilter = searchParams.get("genre") || "all";
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "title" | "price">("rating");

  const filteredBooks = useMemo(() => {
    let books = [...featuredBooks];

    if (genreFilter !== "all") {
      books = books.filter(
        (b) => b.genre.toLowerCase() === genreFilter.toLowerCase()
      );
    }

    if (query) {
      const q = query.toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "title":
        books.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "price":
        books.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "rating":
      default:
        books.sort((a, b) => b.rating - a.rating);
    }

    return books;
  }, [genreFilter, query, sortBy]);

  return (
    <div className="min-h-screen pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Page header */}
        <Reveal>
          <div className="mb-12">
            <p className="label-uppercase mb-3">Browse Collection</p>
            <h1 className="heading-serif text-4xl md:text-5xl text-text-primary">
              All Books
            </h1>
          </div>
        </Reveal>

        {/* Filters bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          {/* Search */}
          <div className="relative mb-6">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or author..."
              className="w-full pl-11 pr-5 py-3.5 bg-surface border border-border-dark rounded-sm text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Genre pills + sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <CategoryPill
                label="All"
                href="/books"
                active={genreFilter === "all"}
              />
              {categories.map((cat) => (
                <CategoryPill
                  key={cat.slug}
                  label={cat.name}
                  href={`/books?genre=${cat.slug}`}
                  active={genreFilter === cat.slug}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal size={13} className="text-text-muted" />
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "rating" | "title" | "price")
                }
                className="bg-surface border border-border-dark rounded-sm px-3 py-2 text-xs text-text-secondary focus:outline-none focus:border-accent"
              >
                <option value="rating">Top Rated</option>
                <option value="title">Title A-Z</option>
                <option value="price">Price Low-High</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Books grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            {filteredBooks.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="heading-serif text-2xl text-text-muted mb-2">
              No books found
            </p>
            <p className="text-text-muted text-sm">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-36 flex items-start justify-center">
          <p className="text-text-muted text-sm">Loading...</p>
        </div>
      }
    >
      <BooksContent />
    </Suspense>
  );
}
