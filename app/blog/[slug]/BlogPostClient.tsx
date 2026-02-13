"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Calendar,
  ArrowLeft,
  Star,
  ExternalLink,
  Share2,
} from "lucide-react";
import { BlogPost } from "@/lib/types";
import { getBookById } from "@/lib/books";
import { getAffiliateUrl } from "@/lib/affiliate";
import FadeIn from "@/app/components/FadeIn";

interface BlogPostClientProps {
  post: BlogPost;
}

function MarkdownContent({ content }: { content: string }) {
  // Simple markdown-like rendering
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="heading-serif text-2xl md:text-3xl text-text-primary mt-10 mb-4"
        >
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="text-text-primary font-medium text-sm mt-4 mb-2">
          {line.replace(/\*\*/g, "")}
        </p>
      );
    } else if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-2 border-accent pl-5 my-6 text-text-secondary italic text-sm leading-relaxed"
        >
          {line.replace(/^\*"|"\*$/g, "").replace(/\*/g, "")}
        </blockquote>
      );
    } else if (line.startsWith("**") && line.includes(":**")) {
      const [label, ...rest] = line.split(":**");
      elements.push(
        <p key={i} className="text-sm text-text-secondary leading-relaxed mb-2">
          <strong className="text-text-primary">
            {label.replace(/\*\*/g, "")}:
          </strong>{" "}
          {rest.join(":").replace(/\*\*/g, "")}
        </p>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-3" />);
    } else {
      elements.push(
        <p key={i} className="text-sm text-text-secondary leading-relaxed mb-2">
          {line}
        </p>
      );
    }
  }

  return <>{elements}</>;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const books = post.bookIds
    .map((id) => getBookById(id))
    .filter((b) => b !== undefined);

  const formattedDate = new Date(post.publishedDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen pt-36 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        {/* Back link */}
        <FadeIn>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-text-muted hover:text-accent transition-colors mb-10"
          >
            <ArrowLeft size={13} />
            Back to Blog
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs tracking-wider uppercase text-accent font-medium">
                {post.category}
              </span>
              <span className="text-text-muted text-xs">·</span>
              <span className="flex items-center gap-1 text-text-muted text-xs">
                <Clock size={11} />
                {post.readTime} min read
              </span>
              <span className="text-text-muted text-xs">·</span>
              <span className="flex items-center gap-1 text-text-muted text-xs">
                <Calendar size={11} />
                {formattedDate}
              </span>
            </div>

            <h1 className="heading-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-5 leading-tight">
              {post.title}
            </h1>

            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
              <p className="text-text-muted text-xs">
                By{" "}
                <span className="text-text-secondary">{post.author}</span>
              </p>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    });
                  }
                }}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent transition-colors ml-auto"
              >
                <Share2 size={12} />
                Share
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Cover Image */}
        <FadeIn>
          <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden mb-12">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        </FadeIn>

        {/* Content */}
        <FadeIn>
          <article className="prose-custom max-w-3xl mx-auto">
            <MarkdownContent content={post.content} />
          </article>
        </FadeIn>

        {/* Books mentioned – Affiliate section */}
        {books.length > 0 && (
          <FadeIn>
            <div className="mt-16 pt-12 border-t border-border">
              <p className="label-uppercase mb-2">Books Mentioned</p>
              <h3 className="heading-serif text-2xl text-text-primary mb-8">
                Get These Books
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {books.map((book) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-4 bg-surface-warm/50 rounded-sm border border-border hover:border-border-dark transition-colors"
                  >
                    <div className="relative w-[60px] aspect-[2/3] rounded-sm overflow-hidden shrink-0 book-shadow">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="heading-serif text-base text-text-primary line-clamp-1">
                        {book.title}
                      </h4>
                      <p className="text-text-muted text-xs mt-0.5">
                        {book.author}
                      </p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Star
                          size={10}
                          className="fill-accent text-accent"
                        />
                        <span className="text-xs text-text-secondary">
                          {book.rating}
                        </span>
                        {book.price && (
                          <>
                            <span className="text-text-muted text-xs mx-1">
                              ·
                            </span>
                            <span className="text-xs text-accent font-medium">
                              ${book.price}
                            </span>
                          </>
                        )}
                      </div>
                      <a
                        href={getAffiliateUrl(book.isbn)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-xs tracking-wider uppercase text-accent hover:text-accent-hover transition-colors"
                      >
                        Buy on Amazon
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="text-text-muted text-[10px] mt-6 text-center">
                As an Amazon Associate, Booksmania earns from qualifying
                purchases. Prices may vary.
              </p>
            </div>
          </FadeIn>
        )}

        {/* Tags */}
        <FadeIn>
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-surface-warm rounded-sm text-xs text-text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
