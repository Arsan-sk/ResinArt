"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PreviewWizard } from "@/components/preview/PreviewWizard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function PreviewStudio() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <PreviewWizard />;
  }

  return (
    <div className="pt-24 pb-20 min-h-[90dvh] flex items-center">
      <div className="section-inner px-6 lg:px-10 text-center max-w-2xl mx-auto">
        <ScrollReveal>
          {/* Sparkle badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-soft-gold/10 mb-8">
            <Sparkles size={28} className="text-soft-gold" />
          </div>

          <h1 className="text-4xl lg:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
            Create Something That's <span className="italic">Truly Yours</span>
          </h1>

          <p className="text-muted-foreground text-base lg:text-lg mb-10 leading-relaxed">
            Visualize your personalized handcrafted resin creation before placing your order.
            Our preview studio is designed to help you imagine the final handmade piece.
          </p>

          <button onClick={() => setStarted(true)} className="btn-gold !px-8 !py-4 text-sm font-semibold tracking-wider">
            Start Creating
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
