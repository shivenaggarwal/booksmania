"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  variant?: "default" | "featured";
}

export default function BlogCard({
  post,
  index = 0,
  variant = "default",
}: BlogCardProps) {
  if (variant === "featured") {
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
        <Link href={`/blog/${post.slug}`} className="group block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-surface-warm/50 rounded-sm overflow-hidden hover-lift">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs tracking-wider uppercase text-accent font-medium">
                  {post.category}
                </span>
                <span className="text-text-muted text-xs">·</span>
                <span className="flex items-center gap-1 text-text-muted text-xs">
                  <Clock size={11} />
                  {post.readTime} min read
                </span>
              </div>
              <h2 className="heading-serif text-2xl md:text-3xl text-text-primary group-hover:text-accent transition-colors duration-300 mb-4">
                {post.title}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-accent group-hover:gap-3 transition-all duration-300">
                Read Article
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

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
      <Link href={`/blog/${post.slug}`} className="group block hover-lift">
        <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden mb-4">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs tracking-wider uppercase text-accent font-medium">
            {post.category}
          </span>
          <span className="text-text-muted text-xs">·</span>
          <span className="flex items-center gap-1 text-text-muted text-xs">
            <Clock size={11} />
            {post.readTime} min
          </span>
        </div>
        <h3 className="heading-serif text-xl text-text-primary group-hover:text-accent transition-colors duration-300 mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </Link>
    </motion.div>
  );
}
