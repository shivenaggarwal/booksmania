"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import { Book } from "@/lib/types";

interface BookCardProps {
  book: Book;
  index?: number;
  variant?: "default" | "featured";
}

export default function BookCard({ book, index = 0, variant = "default" }: BookCardProps) {
  const isFeatured = variant === "featured";

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
      <Link
        href={`/books/${book.id}`}
        className={`group block ${isFeatured ? "" : ""}`}
      >
        {/* Cover */}
        <div
          className={`relative overflow-hidden bg-surface-muted rounded-sm mb-4 ${
            isFeatured ? "aspect-[2/3] w-full" : "aspect-[2/3] w-full"
          }`}
        >
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 250px"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

          {/* Quick view button */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="w-9 h-9 rounded-full bg-surface flex items-center justify-center shadow-md">
              <ArrowUpRight size={14} className="text-text-primary" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <h3 className="heading-serif text-lg text-text-primary group-hover:text-accent transition-colors duration-300 line-clamp-1">
            {book.title}
          </h3>
          <p className="text-text-muted text-xs mt-1">{book.author}</p>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <Star size={11} className="fill-accent text-accent" />
              <span className="text-xs text-text-secondary">{book.rating}</span>
            </div>
            {book.price && (
              <>
                <span className="text-text-muted text-xs">·</span>
                <span className="text-xs text-accent font-medium">${book.price}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
