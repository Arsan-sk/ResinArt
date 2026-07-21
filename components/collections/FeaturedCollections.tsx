"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedCollections } from "@/lib/config/collections";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * Featured Collections — Editorial layout (not rigid grid)
 * Each collection as premium editorial card with hover interactions.
 * Per PRP2: staggered masonry / editorial layouts with varied image sizes.
 */
export function FeaturedCollections() {
  const collections = getFeaturedCollections();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section" id="featured-collections">
      <div className="section-inner">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <h2
              className="mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Our Collections
            </h2>
            <p className="text-muted-foreground mx-auto" style={{ fontSize: "var(--text-lg)" }}>
              Curated themes, each handcrafted with intention and care.
            </p>
          </div>
        </ScrollReveal>

        {/* Editorial Grid — Varied sizes, not rigid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection, i) => (
            <ScrollReveal
              key={collection.slug}
              delay={i * 0.08}
              className={
                // Make first and last items span wider for editorial feel
                i === 0
                  ? "md:col-span-2 lg:col-span-2"
                  : i === collections.length - 1
                  ? "md:col-span-2 lg:col-span-1"
                  : ""
              }
            >
              <Link href={`/collections/${collection.slug}`}>
                <motion.article
                  className="group relative overflow-hidden rounded-lg cursor-pointer hover:shadow-[0_15px_30px_var(--hover-glow)] transition-all duration-500"
                  style={{
                    aspectRatio:
                      i === 0 ? "2/1" : i % 3 === 0 ? "3/4" : "4/3",
                    "--hover-glow": `${collection.accentColor}60`,
                  } as React.CSSProperties}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : { y: -4, transition: { duration: 0.3 } }
                  }
                >
                  {/* Background Image / Placeholder */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundColor: collection.accentColorLight }}
                  >
                    <Image
                      src={`/collections/${collection.folder}/image-1.webp`}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        // Graceful fallback — hide broken image
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />

                  {/* Hover Border Glow */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: `inset 0 0 0 1.5px ${collection.accentColor}40`,
                    }}
                  />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <h3
                      className="text-pearl-white text-2xl lg:text-3xl font-light mb-2"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {collection.name}
                    </h3>
                    <p className="text-pearl-white/70 text-sm max-w-md">
                      {collection.description}
                    </p>

                    {/* Hover Arrow */}
                    <div className="mt-4 flex items-center gap-2 text-soft-gold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Explore
                      </span>
                      <ArrowUpRight size={14} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Shadow Enhancement on Hover */}
                  <div className="absolute inset-0 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.article>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View All CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12 lg:mt-16">
            <Link href="/collections" className="btn-secondary">
              View More Collections
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
