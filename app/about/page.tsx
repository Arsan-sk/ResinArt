import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "Our Story & Craftsmanship",
  description: "Learn about the patience, care, and attention to detail behind our premium handcrafted resin art.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-inner px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-16 lg:mb-24">
            <span className="text-xs uppercase tracking-widest text-soft-gold font-semibold mb-3 block">
              Our Story
            </span>
            <h1 className="text-4xl lg:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
              Care, Patience & <span className="italic">Craftsmanship</span>
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg">
              Behind every letter keyring is a story of slow, meticulous work, premium materials, and a heart for creating memories.
            </p>
          </div>
        </ScrollReveal>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <ScrollReveal>
            <div className="space-y-6 text-sm lg:text-base text-muted-foreground leading-relaxed">
              <p>
                Welcome to Zainy Resin Art. What began as a personal passion for creating handcrafted art pieces has grown into a small luxury boutique brand dedicated to turning names into lasting memories.
              </p>
              <p>
                We do not believe in mass production. We do not believe in rushing. In a world where items are produced by machines in seconds, we stand for slow, intentional patience. Each keychain is prepared, mixed, poured, and hand-finished individually.
              </p>
              <p>
                Why resin? Because resin allows us to capture dynamic depth, embedding delicate gold leaf foil, custom-selected color pigments, and preserved botanicals that stay beautiful forever. It turns a simple everyday utility into an emotional keepsakes you carry with you.
              </p>
            </div>
          </ScrollReveal>

          {/* Fallback frame representation of our studio layout */}
          <ScrollReveal delay={0.15}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-warm-beige/30 border border-border/40 p-4">
              <div className="relative h-full w-full rounded-xl overflow-hidden bg-surface flex flex-col justify-center items-center text-center p-6">
                <Heart size={36} className="text-soft-gold/30 mb-4" />
                <h4 className="text-lg font-medium mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
                  Handcrafted with Care
                </h4>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Every pour is unique. Each keychain goes through a multi-stage curing, sanding, and polishing lifecycle.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Brand Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: Sparkles,
              title: "Attention to Detail",
              desc: "From ensuring clear bubbles to perfect bezel-level sanding, we inspect every piece under studio light before packaging.",
            },
            {
              icon: Heart,
              title: "Designed to Gift",
              desc: "We treat every keychain order like it's a gift. Premium packaging ensures a beautiful presentation, ready for special days.",
            },
            {
              icon: MessageCircle,
              title: "Personal Collaboration",
              desc: "You collaborate with the artisan. We review color specs, shapes, and inclusions together to assure confidence.",
            },
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} delay={i * 0.08}>
                <div className="p-8 rounded-xl bg-surface border border-border/50">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-soft-gold/10 mb-6">
                    <Icon size={20} className="text-soft-gold" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-cormorant)" }}>
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="text-center">
            <h3 className="text-2xl font-light mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
              Ready to begin your keepsake?
            </h3>
            <div className="flex justify-center gap-4">
              <Link href="/preview" className="btn-gold">
                Preview Design
              </Link>
              <a
                href={getWhatsAppUrl("Hello Zainy! I read your story and want to discuss custom keychains.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <MessageCircle size={16} />
                Let's Chat
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
