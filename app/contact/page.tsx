"use client";

import { Contact } from "@/components/sections/Contact";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function ContactPage() {
  return (
    <div className="pt-24 pb-12">
      <div className="section-inner px-6 lg:px-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-4">
            <span className="text-xs uppercase tracking-widest text-soft-gold font-semibold mb-3 block">
              Contact us
            </span>
            <h1 className="text-4xl lg:text-5xl font-light mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
              Get In Touch
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              We'd love to hear from you. Reach out on WhatsApp or Instagram for any custom orders, questions, or ideas.
            </p>
          </div>
        </ScrollReveal>
      </div>
      <Contact />
    </div>
  );
}
