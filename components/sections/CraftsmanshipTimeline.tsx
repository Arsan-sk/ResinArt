"use client";

import { MessageSquare, Palette, Gem, Truck } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const steps = [
  {
    icon: MessageSquare,
    title: "Share Your Idea",
    description:
      "Tell us your name, favorite colors, and the vibe you love. We'll take it from there.",
  },
  {
    icon: Palette,
    title: "Preview Your Design",
    description:
      "Use our AI-powered preview to visualize your personalized resin creation before we begin.",
  },
  {
    icon: Gem,
    title: "Handcrafted with Resin",
    description:
      "We pour, layer, embed, and polish every piece by hand — taking hours to bring your vision to life.",
  },
  {
    icon: Truck,
    title: "Delivered to Your Door",
    description:
      "Carefully packaged and shipped with love, ready to become a cherished keepsake.",
  },
];

/**
 * Craftsmanship Timeline — Four elegant steps showing the process.
 * Each step animates into view as the user scrolls.
 * Connecting lines with subtle motion indicate progression.
 * Per PRP2 specification.
 */
export function CraftsmanshipTimeline() {
  return (
    <section className="section" id="craftsmanship">
      <div className="section-inner">
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <h2
              className="mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              How It's <span className="italic">Made</span>
            </h2>
            <p
              className="text-muted-foreground mx-auto"
              style={{ fontSize: "var(--text-lg)" }}
            >
              From your idea to your doorstep — in four careful steps.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line (desktop) */}
          <div
            className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-border"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.title} delay={i * 0.12}>
                  <div className="relative text-center lg:text-center group cursor-default transition-all duration-300 hover:-translate-y-1.5">
                    {/* Step Number + Icon */}
                    <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 mx-auto">
                      {/* Circle background */}
                      <div className="absolute inset-0 rounded-full bg-ivory border border-border group-hover:border-soft-gold group-hover:bg-soft-gold/5 transition-all duration-300" />

                      {/* Icon */}
                      <Icon
                        size={28}
                        strokeWidth={1.2}
                        className="relative z-10 text-soft-gold group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Step number badge */}
                      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-soft-gold text-pearl-white text-[10px] font-semibold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>

                    {/* Connecting Line (mobile) */}
                    {i < steps.length - 1 && (
                      <div
                        className="lg:hidden w-px h-8 bg-border mx-auto -mt-3 mb-3"
                        aria-hidden="true"
                      />
                    )}

                    {/* Text */}
                    <h4
                      className="text-xl mb-3 group-hover:text-soft-gold transition-colors duration-300"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
