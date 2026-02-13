"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/books", label: "SHOP" },
  { href: "/blog", label: "BLOG" },
  { href: "/compare", label: "COMPARE" },
  { href: "/recommend", label: "AI PICKS" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top bar */}
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "glass-warm shadow-sm"
              : "bg-transparent"
          }`}
        >
          {/* Upper row: social + utility */}
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="flex items-center gap-4 text-text-muted">
                <a href="#" className="hover:text-accent transition-colors text-xs">Fb</a>
                <a href="#" className="hover:text-accent transition-colors text-xs">Ig</a>
                <a href="#" className="hover:text-accent transition-colors text-xs">Tw</a>
                <a href="#" className="hover:text-accent transition-colors text-xs">Pt</a>
              </div>
              <div className="flex items-center gap-5 text-text-secondary">
                <button className="flex items-center gap-1.5 text-xs tracking-wider uppercase hover:text-accent transition-colors">
                  <User size={13} />
                  <span className="hidden sm:inline">Account</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs tracking-wider uppercase hover:text-accent transition-colors">
                  <ShoppingBag size={13} />
                  <span className="hidden sm:inline">Cart (0)</span>
                </button>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-1.5 text-xs tracking-wider uppercase hover:text-accent transition-colors"
                >
                  <Search size={13} />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>

            {/* Lower row: logo + navigation */}
            <div className="flex items-center justify-between py-4">
              <Link href="/">
                <Logo size="md" />
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs tracking-[0.15em] transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-accent font-medium"
                        : "text-text-secondary hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-text-primary"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-warm border-b border-border"
            >
              <nav className="flex flex-col px-6 py-4 gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-xs tracking-[0.15em] py-2 ${
                      pathname === link.href
                        ? "text-accent font-medium"
                        : "text-text-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-start justify-center pt-[20vh]"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl px-6"
            >
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search for books, authors..."
                  className="w-full pl-8 pr-4 py-4 bg-transparent border-b-2 border-border-dark text-2xl heading-serif text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <p className="text-text-muted text-xs mt-4 tracking-wider uppercase">
                Press ESC to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
