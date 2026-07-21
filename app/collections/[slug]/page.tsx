"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles, MessageCircle } from "lucide-react";
import { getCollectionBySlug, getCollectionImagePaths } from "@/lib/config/collections";
import { getWhatsAppUrl } from "@/lib/config/site";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function CollectionDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const collection = getCollectionBySlug(slug);

  const [activeImages, setActiveImages] = useState<string[]>([]);
  
  useEffect(() => {
    if (collection) {
      // Pre-populate candidate image paths based on available counts
      const candidates = getCollectionImagePaths(collection.folder, collection.imageCount);
      setActiveImages(candidates);
    }
  }, [collection]);

  if (!collection) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-3xl font-light mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
          Collection Not Found
        </h1>
        <Link href="/collections" className="text-soft-gold hover:underline">
          Return to all collections
        </Link>
      </div>
    );
  }

  // Handle image load error to dynamically filter out missing images
  const handleImageError = (path: string) => {
    setActiveImages((prev) => prev.filter((img) => img !== path));
  };

  return (
    <div className="pt-24 pb-20">
      <div className="section-inner px-6 lg:px-10">
        {/* Back Link */}
        <ScrollReveal>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-soft-gold mb-10 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Collections
          </Link>
        </ScrollReveal>

        {/* Collection Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-16 lg:mb-24">
          <ScrollReveal>
            <div>
              <span
                className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full text-pearl-white inline-block mb-4"
                style={{ backgroundColor: collection.accentColor }}
              >
                Collection
              </span>
              <h1 className="text-4xl lg:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
                {collection.name}
              </h1>
              <p className="text-muted-foreground text-base lg:text-lg">
                {collection.description}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link href={`/preview?theme=${encodeURIComponent(collection.name)}`} className="btn-gold">
                <Sparkles size={16} />
                Preview in Studio
              </Link>
              <a
                href={getWhatsAppUrl(`Hello Zainy! I am interested in ordering a piece from the ${collection.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <MessageCircle size={16} />
                Order on WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Showcase Gallery — Masonry Layout */}
        {activeImages.length > 0 ? (
          <div className="masonry-container">
            {activeImages.map((path, i) => (
              <div
                key={path}
                className="masonry-item group relative rounded-xl overflow-hidden shadow-sm hover:shadow-[0_15px_35px_var(--hover-glow)] border border-border/40 transition-all duration-500 animate-fade-in"
                style={{
                  backgroundColor: collection.accentColorLight,
                  '--hover-glow': `${collection.accentColor}60`,
                  animationDelay: `${i * 80}ms`,
                } as React.CSSProperties}
              >
                <img
                  src={path}
                  alt={`${collection.name} photo ${i + 1}`}
                  className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={() => handleImageError(path)}
                />

                {/* Soft overlay */}
                <div className="absolute inset-0 bg-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        ) : (
          /* Fallback when no custom images are populated in folders */
          <ScrollReveal>
            <div
              className="rounded-2xl p-12 text-center border border-dashed border-border/80 max-w-2xl mx-auto"
              style={{ backgroundColor: collection.accentColorLight + "40" }}
            >
              <Sparkles className="text-soft-gold/30 mx-auto mb-4" size={28} />
              <h3 className="text-xl font-light mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
                Beautiful Handcrafted Design Underway
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                Every piece in this collection is individually handcrafted. Populate images in `/public/collections/${collection.folder}/` to display them here.
              </p>
              <Link href="/preview" className="btn-secondary !text-xs">
                Launch Preview Studio
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
