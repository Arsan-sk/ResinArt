"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * Pricing Preview — Elegant pricing cards grouped by category.
 * Not a rigid pricing table. Communicates affordability while maintaining premium positioning.
 * Per PRP2 specification.
 */
export function PricingPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section bg-warm-beige/20" id="pricing-preview">
      <div className="section-inner">
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <h2
              className="mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Handcrafted Just for You
            </h2>
            <p className="text-muted-foreground mx-auto" style={{ fontSize: "var(--text-lg)" }}>
              Premium craftsmanship, thoughtful pricing.
            </p>
            <p
              className="mx-auto mt-4 text-soft-gold font-medium"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "var(--text-2xl)",
              }}
            >
              Starting from {siteConfig.pricing.currency}
              {siteConfig.pricing.startingFrom}
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {siteConfig.pricing.categories.map((category, i) => (
            <ScrollReveal key={category.name} delay={i * 0.08}>
              <motion.div
                className="group relative p-8 rounded-lg bg-surface border border-border/50 hover:border-soft-gold/30 transition-colors duration-500"
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -6,
                        boxShadow:
                          "0 20px 50px rgba(44, 44, 44, 0.08)",
                        transition: { duration: 0.3 },
                      }
                }
              >
                {/* Price */}
                <div className="mb-4">
                  <span
                    className="text-3xl font-light text-charcoal"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {siteConfig.pricing.currency}{category.startingPrice}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    starting
                  </span>
                </div>

                {/* Name */}
                <h4
                  className="text-xl mb-3"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {category.name}
                </h4>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* CTA */}
                <Link
                  href="/preview"
                  className="inline-flex items-center gap-2 text-sm font-medium text-soft-gold group-hover:gap-3 transition-all duration-300"
                >
                  Customize Yours
                  <ArrowRight
                    size={14}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
