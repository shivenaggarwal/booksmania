"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import BookCard from "@/app/components/BookCard";
import Reveal from "@/app/components/Reveal";
import { getCategoryBySlug, getBooksByGenre, categories } from "@/lib/books";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug);
  const books = category
    ? getBooksByGenre(category.name)
    : [];

  if (!category) {
    return (
      <div className="min-h-screen pt-36 flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-serif text-3xl text-text-primary mb-4">
            Category not found
          </h1>
          <Link href="/books" className="text-accent text-sm hover:underline">
            ← Browse all books
          </Link>
        </div>
      </div>
    );
  }

  const otherCategories = categories.filter((c) => c.slug !== slug);

  return (
    <div className="min-h-screen pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <Reveal>
          <div className="mb-14">
            <p className="label-uppercase mb-3">{category.bookCount} books</p>
            <h1 className="heading-serif text-4xl md:text-5xl text-text-primary mb-3">
              {category.name}
            </h1>
            <p className="text-text-secondary text-sm max-w-lg">
              {category.description}
            </p>
          </div>
        </Reveal>

        {/* Books grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 mb-20">
            {books.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 mb-20">
            <p className="heading-serif text-2xl text-text-muted mb-2">
              No books in this category yet
            </p>
            <Link href="/books" className="text-accent text-sm hover:underline">
              Browse all books
            </Link>
          </div>
        )}

        {/* Other genres */}
        <Reveal>
          <div className="border-t border-border pt-14">
            <p className="label-uppercase mb-4">More Genres</p>
            <div className="flex flex-wrap gap-3">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="px-5 py-2.5 border border-border-dark text-text-secondary text-xs tracking-[0.1em] uppercase hover:border-accent hover:text-accent transition-all duration-300 rounded-sm"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
