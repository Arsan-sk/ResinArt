"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Hero Section — The first screen visitors see.
 *
 * Cinematic looping video background with:
 * - Dark overlay (25–35%) for text readability
 * - Left-aligned headline + subheadline + CTAs (desktop)
 * - Full-width centered content (mobile)
 * - GSAP entrance animations: headline fades up, subtitle delays, CTAs stagger
 * - Video subtly scales 1–2% over several seconds
 *
 * Per PRP1 & PRP2 specification.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Headline fades upward
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2 }
      );

      // Subtitle appears after slight delay
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.6"
      );

      // CTA buttons stagger into view
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
        "-=0.4"
      );

      // Video subtly scales 1–2% over several seconds
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { scale: 1 },
          {
            scale: 1.02,
            duration: 20,
            ease: "none",
            repeat: -1,
            yoyo: true,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-charcoal"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>

        {/* Base dark veil over entire video — ensures minimum readability */}
        <div
          className="absolute inset-0 bg-charcoal/40 z-10"
          aria-hidden="true"
        />

        {/* Left-to-right overlay — heavy on the text side, fades right */}
        <div
          className="absolute inset-y-0 left-0 w-full sm:w-[70%] bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent z-20"
          aria-hidden="true"
        />

        {/* Top gradient — for transparent navbar link readability */}
        <div
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/70 to-transparent z-20"
          aria-hidden="true"
        />
      </div>

      {/* Content — must be above all overlay layers */}
      <div className="relative z-30 section-inner w-full px-6 lg:px-10">
        <div className="max-w-2xl">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-white leading-[1.1] tracking-tight opacity-0"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "var(--text-5xl)",
              color: "#FFFFFF", // Bulletproof visibility override
            }}
          >
            Handmade by Zainy.
            <br />
            <span className="text-soft-gold" style={{ color: "var(--soft-gold)" }}>Made Just For You.</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subtitleRef}
            className="mt-6 text-white/80 leading-relaxed max-w-lg opacity-0"
            style={{ 
              fontSize: "var(--text-lg)",
              color: "rgba(255, 255, 255, 0.8)", // Bulletproof visibility override
            }}
          >
            Every letter holds a story. Premium handcrafted resin keepsakes,
            personalized with care and delivered with love.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="mt-10 flex flex-col sm:flex-row items-start gap-4"
          >
            <Link href="/preview" className="btn-gold group">
              <Sparkles size={16} strokeWidth={1.5} />
              Create Yours
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link 
              href="/collections" 
              className="btn-secondary !border-white/30 hover:!border-soft-gold"
              style={{ color: "#FFFFFF" }} // Bulletproof visibility override
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
