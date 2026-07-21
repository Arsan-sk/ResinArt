"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/config/site";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  color: string;
  bgGradient: string;
  image: string;
}

const featuredProducts: Product[] = [
  {
    id: "init-gold",
    name: "The Initial Keyring — Ivory & Gold",
    category: "Initial Collection",
    price: "₹250",
    description: "Real gold flakes embedded in premium ivory resin. Hand-polished to a glass finish.",
    color: "#C5A880",
    bgGradient: "linear-gradient(135deg, #FAF8F5 0%, #EDE6DB 100%)",
    image: "/collections/initials/image-1.webp",
  },
  {
    id: "couple-rose",
    name: "Couple Keepsake — Rose Quartz",
    category: "Couple Collection",
    price: "₹450",
    description: "Pressed rose petals and silver foil flakes. The perfect keepsake for love stories.",
    color: "#D4848C",
    bgGradient: "linear-gradient(135deg, #FBEAEC 0%, #F5D6D9 100%)",
    image: "/collections/couples/image-1.webp",
  },
  {
    id: "emerald-calligraphy",
    name: "Arabic Calligraphy — Emerald Tag",
    category: "Arabic Calligraphy",
    price: "₹350",
    description: "Deep emerald resin featuring gold leaf calligraphy script. Timeless and elegant.",
    color: "#2D6B4F",
    bgGradient: "linear-gradient(135deg, #E6F2EC 0%, #C7E2D4 100%)",
    image: "/collections/arabic-calligraphy/image-1.webp",
  },
  {
    id: "ocean-surf",
    name: "Ocean Wave Circle Tag",
    category: "Ocean Collection",
    price: "₹300",
    description: "Layered resin creating realistic 3D ocean waves and sand textures.",
    color: "#4A9BAD",
    bgGradient: "linear-gradient(135deg, #E4F3F6 0%, #C2E2E8 100%)",
    image: "/collections/ocean/image-1.webp",
  },
  {
    id: "luxury-obsidian",
    name: "Luxury Obsidian & Gold Plate",
    category: "Luxury Collection",
    price: "₹500",
    description: "Jet black opaque resin with heavy 24k-style gold foil flakes.",
    color: "#1A1A1A",
    bgGradient: "linear-gradient(135deg, #FAF8F5 0%, #EDE6DB 100%)",
    image: "/collections/luxury/image-1.webp",
  },
];

/**
 * Featured Product Showcase — Horizontally scrolling showcase with gentle parallax.
 * Uses GSAP ScrollTrigger to translate the track.
 * Items float slightly, rotate, and reveal reflections.
 * Per PRP2 specifications.
 */
export function FeaturedProducts() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrapRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const totalWidth = track.scrollWidth;
      const viewWidth = window.innerWidth;
      const distance = totalWidth - viewWidth;

      if (distance <= 0) return;

      // Pin the section and pan the track horizontally
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Subtle parallax shift for images within cards
      const imageEls = gsap.utils.toArray<HTMLElement>(".parallax-image");
      imageEls.forEach((img) => {
        gsap.to(img, {
          x: 40,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: true,
          },
        });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={wrapRef} className="relative z-50 overflow-hidden bg-ivory" id="featured-products">
      <div className="absolute top-12 left-0 right-0 z-10 text-center lg:text-left lg:px-20 max-w-[1400px] mx-auto pointer-events-none">
        <h2 className="text-3xl lg:text-4xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          Featured <span className="italic">Showcase</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          Scroll down to browse our custom keys. Touch or hover to inspect details.
        </p>
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className="flex h-[100dvh] items-center px-10 lg:px-20 gap-12 lg:gap-24 w-max">
        {/* Empty spacing for initial scroll look */}
        <div className="w-[100px] lg:w-[200px]" />

        {featuredProducts.map((product, i) => (
          <article
            key={product.id}
            className="flex-shrink-0 w-[290px] sm:w-[360px] lg:w-[420px] relative group"
          >
            {/* Main Product Card */}
            <div
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 border border-border/40"
              style={{
                transform: `rotate(${i % 2 === 0 ? "1deg" : "-1deg"}) translateY(${i % 2 === 0 ? "10px" : "-10px"})`,
              }}
            >
              {/* Product Background Gradient */}
              <div
                className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ background: product.bgGradient }}
              />

              {/* Product Image */}
              <div className="absolute inset-4 z-10 rounded-xl overflow-hidden bg-white/40 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover parallax-image transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 400px"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />

                {/* Glassy reflection overlay */}
                <div
                  className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    transform: "skewX(-20deg) translateX(-100%)",
                    animation: "shimmer 2s infinite",
                  }}
                />

                {/* If image is missing, elegant styling placeholders show up */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0">
                  <Sparkles size={24} className="text-soft-gold/30 mb-2 animate-pulse" />
                  <span
                    className="text-xs uppercase tracking-widest text-soft-gold"
                    style={{ color: product.color }}
                  >
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent text-pearl-white">
                <span className="text-[10px] uppercase tracking-widest text-soft-gold font-semibold">
                  {product.category}
                </span>
                <h3 className="text-lg lg:text-xl font-light mt-1 mb-2 leading-tight" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold">{product.price}</span>
                  <Link
                    href={`/preview?name=Zainy&shape=${encodeURIComponent(
                      product.category === "Initial Collection" ? "Initial Letter" : "Custom"
                    )}&theme=${encodeURIComponent(
                      product.category.replace(" Collection", "")
                    )}`}
                    className="flex items-center gap-1 text-xs font-semibold text-soft-gold uppercase tracking-wider hover:text-pearl-white transition-colors"
                  >
                    Customize
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Description Text Below Card */}
            <div className="mt-6 px-2 text-center lg:text-left">
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                {product.description}
              </p>
            </div>
          </article>
        ))}

        {/* Ending spacing with CTA */}
        <div className="flex-shrink-0 w-[300px] lg:w-[450px] flex flex-col justify-center items-center lg:items-start px-8">
          <h3 className="text-2xl font-light mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
            Create Your Custom Piece
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs text-center lg:text-left">
            Choose your letters, colors, floral inserts, and hardware finishes.
          </p>
          <Link href="/preview" className="btn-gold">
            <Sparkles size={16} />
            Start Preview Studio
          </Link>
        </div>
      </div>
    </section>
  );
}
