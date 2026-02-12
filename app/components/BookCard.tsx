"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Book } from "@/lib/types";

interface BookCardProps {
  book: Book;
  index?: number;
  variant?: "default" | "featured";
}

export default function BookCard({ book, index = 0 }: BookCardProps) {
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
      <Link href={`/books/${book.id}`} className="group block">
        {/* Cover */}
        <div className="relative mb-4 aspect-[2/3] w-full rounded-sm overflow-hidden book-shadow">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 250px"
          />
          {/* Spine edge */}
          <div
            className="absolute left-0 top-0 bottom-0 w-2 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 100%)",
            }}
          />
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
                <span className="text-xs text-accent font-medium">
                  ${book.price}
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

