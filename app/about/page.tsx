"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Users, Globe, Award } from "lucide-react";
import Reveal from "@/app/components/Reveal";
import Logo from "@/app/components/Logo";

const stats = [
  { icon: <BookOpen size={20} />, value: "10,000+", label: "Books Curated" },
  { icon: <Users size={20} />, value: "50K+", label: "Happy Readers" },
  { icon: <Globe size={20} />, value: "120+", label: "Countries Reached" },
  { icon: <Award size={20} />, value: "4.9", label: "Average Rating" },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div ref={heroRef} className="relative pt-36 pb-20 overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="max-w-7xl mx-auto px-6 lg:px-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="label-uppercase mb-4">About Us</p>
            <h1 className="heading-serif text-4xl md:text-6xl text-text-primary mb-6">
              Stories Connect <em className="text-accent">Us</em>
            </h1>
            <p className="text-text-secondary leading-relaxed">
              Booksmania was born from a simple belief: the right book at the right time
              can change everything. We&apos;re building the most beautiful way to discover
              your next great read.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Mission sections */}
      <section className="py-16 md:py-24 bg-surface-warm/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <p className="text-accent text-xs tracking-wider mb-3">01</p>
                <h2 className="heading-serif text-2xl md:text-3xl text-text-primary mb-4">
                  Our Mission
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  We believe everyone deserves access to exceptional literature. Our platform
                  connects passionate readers with carefully curated books through affiliate
                  partnerships with the world&apos;s best bookstores — making it easy, beautiful,
                  and trustworthy to find your next favorite read.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <p className="text-accent text-xs tracking-wider mb-3">02</p>
                <h2 className="heading-serif text-2xl md:text-3xl text-text-primary mb-4">
                  Our Vision
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  A world where discovering books is as delightful as reading them. We&apos;re
                  crafting an experience that respects your time, values quality over quantity,
                  and celebrates the transformative power of stories.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center mb-14">
              <p className="label-uppercase mb-3">By The Numbers</p>
              <h2 className="heading-serif text-3xl md:text-4xl text-text-primary">
                Growing Together
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center py-8 px-4 bg-surface border border-border rounded-sm"
              >
                <div className="w-10 h-10 rounded-full border border-border-dark flex items-center justify-center mx-auto mb-4 text-accent">
                  {stat.icon}
                </div>
                <p className="heading-serif text-2xl md:text-3xl text-text-primary">
                  {stat.value}
                </p>
                <p className="text-text-muted text-xs mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / CTA */}
      <section className="py-16 md:py-24 bg-surface-warm/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="max-w-xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Logo size="lg" showText={false} />
              </div>
              <h2 className="heading-serif text-2xl md:text-3xl text-text-primary mb-4">
                Join the Community
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-8">
                Follow along as we build the future of book discovery.
                Every recommendation supports independent booksellers
                through our affiliate partnerships.
              </p>
              <a
                href="/books"
                className="inline-flex items-center gap-3 bg-text-primary text-surface px-8 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-accent transition-colors duration-500"
              >
                Start Exploring
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Affiliate disclosure */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-text-muted text-xs leading-relaxed">
              <strong className="text-text-secondary">Affiliate Disclosure:</strong>{" "}
              Booksmania participates in affiliate programs with Amazon and Bookshop.org.
              When you purchase through our links, we earn a small commission at no
              extra cost to you. This helps us maintain the site and continue curating
              great book recommendations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
