"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { collections } from "@/lib/config/collections";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function CollectionsList() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pt-24 pb-20">
      <div className="section-inner px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-16 lg:mb-24">
            <span className="text-xs uppercase tracking-widest text-soft-gold font-semibold mb-3 block">
              Curated Themes
            </span>
            <h1 className="text-4xl lg:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
              The Collections
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg">
              Explore our handmade collections. Each piece is designed to capture a mood, represent a memory, and last a lifetime.
            </p>
          </div>
        </ScrollReveal>

        {/* Collections Grid — Editorial feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {collections.map((collection, i) => (
            <ScrollReveal key={collection.slug} delay={i % 2 * 0.08}>
              <Link href={`/collections/${collection.slug}`}>
                <motion.article
                  className="group relative overflow-hidden rounded-xl border border-border/40 bg-surface shadow-sm hover:shadow-[0_15px_30px_var(--hover-glow)] transition-all duration-500 cursor-pointer"
                  style={{ "--hover-glow": `${collection.accentColor}40` } as React.CSSProperties}
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                >
                  {/* Image wrapper */}
                  <div
                    className="relative aspect-[16/10] overflow-hidden"
                    style={{ backgroundColor: collection.accentColorLight }}
                  >
                    <Image
                      src={`/collections/${collection.folder}/image-1.webp`}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 600px"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />

                    {/* Accent Tag */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold text-pearl-white"
                      style={{ backgroundColor: collection.accentColor }}
                    >
                      {collection.name}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-60" />
                  </div>

                  {/* Body */}
                  <div className="p-6 lg:p-8">
                    <h3 className="text-2xl font-light mb-3" style={{ fontFamily: "var(--font-cormorant)" }}>
                      {collection.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {collection.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-soft-gold uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                      View Pieces
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.article>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA section */}
        <ScrollReveal>
          <div className="mt-24 p-8 lg:p-12 rounded-2xl bg-warm-beige/30 border border-border/40 text-center max-w-3xl mx-auto">
            <Sparkles className="text-soft-gold/40 mx-auto mb-6" size={32} />
            <h3 className="text-2xl lg:text-3xl font-light mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
              Looking for something completely custom?
            </h3>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              Our preview studio lets you design a keepsake matching your exact name, theme, colors, and layout elements.
            </p>
            <Link href="/preview" className="btn-gold">
              Launch Preview Studio
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
