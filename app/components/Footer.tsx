"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

const footerLinks = {
  Explore: [
    { label: "Books", href: "/books" },
    { label: "Fiction", href: "/categories/fiction" },
    { label: "Sci-Fi", href: "/categories/sci-fi" },
    { label: "Self-Help", href: "/categories/self-help" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "#" },
    { label: "Affiliate Disclosure", href: "/about" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
  ],
};

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "start 0.5"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer ref={containerRef} className="relative z-10 bg-surface-warm/40 border-t border-border">
      {/* Newsletter section */}
      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="max-w-lg">
          <p className="label-uppercase mb-3">Stay Updated</p>
          <h3 className="heading-serif text-2xl md:text-3xl text-text-primary mb-4">
            Get book recommendations in your inbox
          </h3>
          <p className="text-text-secondary text-sm mb-6">
            Join thousands of readers who discover their next favorite book through our curated newsletter.
          </p>

          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 bg-surface border border-border-dark rounded-sm text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <button className="px-5 py-3 bg-text-primary text-surface rounded-sm hover:bg-accent transition-colors duration-300 flex items-center gap-2 text-xs tracking-wider uppercase">
              <Send size={13} />
              <span className="hidden sm:inline">Subscribe</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="border-t border-border" />
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Logo size="sm" />
            </Link>
            <p className="text-text-muted text-xs leading-relaxed max-w-[200px]">
              Your destination for discovering extraordinary books.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="label-uppercase mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-text-secondary text-sm hover:text-accent transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © 2026 Booksmania. All rights reserved.
          </p>
          <p className="text-text-muted text-[10px]">
            As an affiliate, we earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}
