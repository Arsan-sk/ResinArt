"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    question: "How long does it take to receive my order?",
    answer:
      "Each piece is handcrafted individually, so it takes 5–7 working days to create your keychain. Shipping typically adds 2–3 days depending on your location.",
  },
  {
    question: "Can I choose my own colors?",
    answer:
      "Absolutely! You can specify your preferred colors when placing your order. If you'd like help choosing, our AI preview tool lets you visualize different color combinations before you order.",
  },
  {
    question: "Can I preview my design before ordering?",
    answer:
      "Yes! Visit our \"Your Resin Preview\" page to create an AI-powered visualization of your personalized keychain. Choose your name, shape, colors, and theme to see a preview.",
  },
  {
    question: "Are custom requests accepted?",
    answer:
      "Of course. We love bringing unique ideas to life. Send us your vision on WhatsApp and we'll work with you to create something truly special.",
  },
  {
    question: "Is gift packaging available?",
    answer:
      "Yes, we offer premium gift packaging for a small additional charge. Your keychain will arrive beautifully presented and ready to gift.",
  },
];

/**
 * FAQ Section — Accordion layout with smooth animations.
 * Opens smoothly without abrupt jumps.
 * Per PRP2 specification.
 */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section bg-warm-beige/20" id="faq">
      <div className="section-inner max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <h2
              className="mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Common Questions
            </h2>
            <p className="text-muted-foreground mx-auto" style={{ fontSize: "var(--text-lg)" }}>
              Everything you need to know about your personalized resin art.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="rounded-lg border border-border/50 bg-surface overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-warm-beige/20"
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                  aria-expanded={openIndex === i}
                >
                  <span
                    className="text-base font-medium pr-4"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "var(--text-lg)" }}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    strokeWidth={1.5}
                    className={cn(
                      "flex-shrink-0 text-muted transition-transform duration-300",
                      openIndex === i && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
