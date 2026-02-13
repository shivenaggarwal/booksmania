import type { Metadata } from "next";
import BlogListingClient from "./BlogListingClient";

export const metadata: Metadata = {
  title: "Book Blog — Booksmania | Best Book Lists, Guides & Recommendations",
  description:
    "Explore our curated book blog. Best books for entrepreneurs, psychology books for beginners, life-changing reads, and more high-quality book recommendations.",
};

export default function BlogPage() {
  return <BlogListingClient />;
}
