"use client";

import { Newspaper, TrendingUp } from "lucide-react";
import BlogCard from "@/app/components/BlogCard";
import FadeIn from "@/app/components/FadeIn";
import { blogPosts } from "@/lib/blog";

export default function BlogListingClient() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Newspaper size={16} className="text-accent" />
              <p className="label-uppercase">The Booksmania Blog</p>
            </div>
            <h1 className="heading-serif text-4xl md:text-6xl text-text-primary mb-4">
              Read. Discover. Grow.
            </h1>
            <p className="text-text-secondary text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Expertly curated book lists, in-depth guides, and recommendations
              to help you find your next great read.
            </p>
          </div>
        </FadeIn>

        {/* Featured post */}
        <div className="mb-16">
          <FadeIn>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={14} className="text-accent" />
              <p className="label-uppercase">Featured</p>
            </div>
          </FadeIn>
          <BlogCard post={featured} variant="featured" />
        </div>

        {/* Posts grid */}
        <FadeIn>
          <div className="flex items-center gap-2 mb-8">
            <p className="label-uppercase">Latest Articles</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {rest.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        {/* SEO Footer Text */}
        <FadeIn>
          <div className="mt-20 pt-12 border-t border-border text-center">
            <p className="text-text-muted text-xs leading-relaxed max-w-2xl mx-auto">
              Our blog features expertly curated book recommendations, reading
              guides, and literary insights. From best books for entrepreneurs
              and psychology readers to must-read sci-fi novels, we help you
              discover your next great read. All recommendations include
              affiliate links — we earn a small commission at no extra cost to
              you.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
