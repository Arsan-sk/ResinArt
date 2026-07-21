import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "Handcrafted Pricing",
  description: "Explore pricing categories for personalized keys, couple sets, and custom orders.",
};

export default function PricingPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-inner px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-16 lg:mb-24">
            <span className="text-xs uppercase tracking-widest text-soft-gold font-semibold mb-3 block">
              Pricing Options
            </span>
            <h1 className="text-4xl lg:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
              Handcrafted, Honest Pricing
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg">
              Each piece is created individually by hand. We believe in keeping custom keepsakes affordable without compromising on luxury materials.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {siteConfig.pricing.categories.map((category, i) => (
            <ScrollReveal key={category.name} delay={i * 0.08}>
              <div className="p-8 rounded-xl bg-surface border border-border/50 flex flex-col justify-between h-full hover:border-soft-gold/30 hover:shadow-md transition-all duration-500">
                <div>
                  <span
                    className="text-4xl font-light text-charcoal block mb-4"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {siteConfig.pricing.currency}{category.startingPrice}
                  </span>
                  <h3 className="text-xl font-light mb-3" style={{ fontFamily: "var(--font-cormorant)" }}>
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/30 flex items-center justify-between">
                  <Link
                    href={`/preview?theme=${encodeURIComponent(category.name)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-soft-gold uppercase tracking-wider hover:gap-2 transition-all duration-300"
                  >
                    Customize
                    <ArrowRight size={12} />
                  </Link>
                  <a
                    href={getWhatsAppUrl(`Hello Zainy! I'd like to order a custom keychain: ${category.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-soft-gold transition-colors"
                    aria-label="Order on WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Custom Order Box */}
        <ScrollReveal>
          <div className="mt-20 p-8 lg:p-12 rounded-2xl bg-warm-beige/30 border border-border/40 max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-md text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-light mb-3" style={{ fontFamily: "var(--font-cormorant)" }}>
                Have a unique design project?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you need custom shapes, specific inclusions (flowers, gold/silver elements), or large corporate/event favors, we will design custom quotes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/preview" className="btn-gold">
                <Sparkles size={16} />
                Try Preview Studio
              </Link>
              <a
                href={getWhatsAppUrl("Hello Zainy! I am looking for a custom bulk/unique request.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Start WhatsApp Chat
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
