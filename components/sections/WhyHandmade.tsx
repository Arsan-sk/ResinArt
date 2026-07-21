"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * Why Handmade — Explains the value of handcrafted resin art.
 * Focus: every piece made individually, no mass production,
 * thoughtful craftsmanship, personalized details, premium materials.
 * Per PRP2 specification.
 */
export function WhyHandmade() {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      title: "Every Piece, Made Individually",
      description:
        "No molds, no mass production. Each keychain is poured, shaped, and polished by hand — making every piece uniquely yours.",
    },
    {
      title: "Premium Materials Only",
      description:
        "Crystal-clear epoxy resin, genuine gold leaf, preserved flowers, and pigments sourced for depth and brilliance.",
    },
    {
      title: "Personalized to the Detail",
      description:
        "Your name, your colors, your vision — embedded in resin and sealed forever. This isn't a product. It's a keepsake.",
    },
    {
      title: "Crafted with Patience",
      description:
        "Each piece takes hours to cure, layers to build, and care to finish. The result is something that feels precious to hold.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section bg-warm-beige/30"
      id="why-handmade"
    >
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text Content */}
          <div>
            <ScrollReveal>
              <h2
                className="mb-6"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Why <span className="italic">Handmade</span> Matters
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p
                className="text-muted-foreground mb-12 max-w-md"
                style={{ fontSize: "var(--text-lg)" }}
              >
                In a world of mass-produced goods, we choose to craft every
                single piece by hand. Because some things deserve that kind
                of care.
              </p>
            </ScrollReveal>

            <div className="space-y-8">
              {features.map((feature, i) => (
                <ScrollReveal key={feature.title} delay={0.15 + i * 0.08}>
                  <div className="flex gap-4">
                    {/* Decorative line */}
                    <div className="flex-shrink-0 w-px bg-soft-gold/40 mt-1" />
                    <div>
                      <h4
                        className="text-lg font-medium mb-2"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right — Macro product photography */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="relative">
              {/* Stacked image cards showing craftsmanship */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative aspect-[3/4] rounded-lg overflow-hidden border border-border bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Image
                    src="/about/resin-texture.webp"
                    alt="Handcrafted Resin Texture Swirls"
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-300 animate-pulse" />
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-charcoal bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                      Resin Texture
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                    <Image
                      src="/about/gold-leaf.webp"
                      alt="Gold Leaf Foil Flakes in Resin"
                      fill
                      sizes="(max-width: 768px) 50vw, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-300 animate-pulse" />
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-charcoal bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                        Gold Leaf
                      </span>
                    </div>
                  </div>

                  <div className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                    <Image
                      src="/about/polished-edge.webp"
                      alt="Polished Glossy Edge"
                      fill
                      sizes="(max-width: 768px) 50vw, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-300 animate-pulse" />
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-charcoal bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                        Polished Edge
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative gold dot */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-soft-gold/20" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
