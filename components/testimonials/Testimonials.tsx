"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Gifted to her husband",
    text: "The keychain arrived beautifully packaged. The gold detailing is so delicate — it feels truly premium. My husband loved it!",
    rating: 5,
  },
  {
    name: "Ahmed Al-Rashid",
    role: "Arabic calligraphy collection",
    text: "I was amazed by the calligraphy quality. The resin captures every curve perfectly. Zainy truly understands the art.",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    role: "Wedding favor order",
    text: "We ordered 50 keychains for our wedding guests. Every single one was unique and beautiful. Our guests were thrilled!",
    rating: 5,
  },
  {
    name: "Fatima Khan",
    role: "Couple set",
    text: "The couple set we received is gorgeous. The colors are exactly what we asked for, and the personal touch makes it so special.",
    rating: 5,
  },
];

/**
 * Testimonials — Elegant floating cards with customer reviews.
 * Fade into view, gentle lift on hover.
 * Per PRP2 specification.
 */
export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section" id="testimonials">
      <div className="section-inner">
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <h2
              className="mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Words from Our <span className="italic">Customers</span>
            </h2>
            <p className="text-muted-foreground mx-auto" style={{ fontSize: "var(--text-lg)" }}>
              Every piece carries a story. Here are some of theirs.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={testimonial.name} delay={i * 0.1}>
              <motion.blockquote
                className="relative p-8 rounded-lg bg-surface border border-border/30"
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -4,
                        boxShadow: "0 16px 40px rgba(44, 44, 44, 0.06)",
                        transition: { duration: 0.3 },
                      }
                }
              >
                {/* Quote Icon */}
                <Quote
                  size={24}
                  strokeWidth={1}
                  className="text-soft-gold mb-4"
                />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        strokeWidth={0}
                        className="fill-soft-gold text-soft-gold"
                      />
                    )
                  )}
                </div>

                {/* Quote Text */}
                <p className="text-sm leading-relaxed text-charcoal/80 mb-6">
                  \u201C{testimonial.text}\u201D
                </p>

                {/* Attribution */}
                <footer className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-warm-beige flex items-center justify-center">
                    <span
                      className="text-sm font-medium text-soft-gold"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-medium text-charcoal">
                      {testimonial.name}
                    </cite>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
