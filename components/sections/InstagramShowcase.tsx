"use client";

import { motion, useReducedMotion } from "framer-motion";
import { InstagramIcon } from "@/components/common/SocialIcons";
import { siteConfig } from "@/lib/config/site";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const mockPosts = [
  { id: "post-1", aspect: "aspect-square", label: "Gold foil lettering detail" },
  { id: "post-2", aspect: "aspect-square", label: "Curing process layer 1" },
  { id: "post-3", aspect: "aspect-square", label: "Preserved rose petals" },
  { id: "post-4", aspect: "aspect-square", label: "Matching couple set keychains" },
  { id: "post-5", aspect: "aspect-square", label: "Sanding edges craft detail" },
  { id: "post-6", aspect: "aspect-square", label: "Completed premium orders package" },
];

/**
 * Instagram Showcase section.
 * Integrates Instagram brand visual grid per PRP2.
 * Falls back gracefully to beautiful placeholder tiles.
 */
export function InstagramShowcase() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section" id="instagram-showcase">
      <div className="section-inner">
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <h2
              className="mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Follow Our <span className="italic text-soft-gold">Journey</span>
            </h2>
            <p className="text-muted-foreground mx-auto mb-6" style={{ fontSize: "var(--text-lg)" }}>
              See what we are crafting daily in the studio.
            </p>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-soft-gold hover:text-charcoal transition-colors duration-300"
            >
              <InstagramIcon size={16} />
              @{siteConfig.instagram.username}
            </a>
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockPosts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.05}>
              <motion.a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square rounded-lg overflow-hidden bg-warm-beige/30 border border-border/30"
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
              >
                {/* Visual Placeholder for posts with subtle gold tones */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--warm-beige) 0%, var(--ivory) 100%)`,
                  }}
                />

                {/* Cover glass style overlay with label */}
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center z-10">
                  <InstagramIcon size={20} className="text-pearl-white mb-2" />
                  <span className="text-[10px] text-pearl-white/80 uppercase tracking-wider leading-relaxed">
                    {post.label}
                  </span>
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
