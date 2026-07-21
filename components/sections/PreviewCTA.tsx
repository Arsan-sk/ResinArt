"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * Preview CTA — Promotes the AI preview page.
 * "See Your Personalized Design Before Ordering"
 * Does NOT embed the generator. Promotion only.
 * Per PRP2 specification.
 */
export function PreviewCTA() {
  return (
    <section className="section bg-charcoal text-pearl-white" id="preview-cta">
      <div className="section-inner text-center">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            {/* Sparkle Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-soft-gold/10 mb-8">
              <Sparkles size={28} strokeWidth={1.2} className="text-soft-gold" />
            </div>

            <h2
              className="text-pearl-white mb-6"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              See Your Personalized Design{" "}
              <span className="text-soft-gold italic">Before Ordering</span>
            </h2>

            <p
              className="text-pearl-white/60 mx-auto mb-10 max-w-lg"
              style={{ fontSize: "var(--text-lg)" }}
            >
              Visualize your custom resin creation with our AI-powered preview.
              Choose your name, colors, and style — see the result instantly.
            </p>

            <Link href="/preview" className="btn-gold group inline-flex">
              <Sparkles size={16} strokeWidth={1.5} />
              Create Your Preview
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
