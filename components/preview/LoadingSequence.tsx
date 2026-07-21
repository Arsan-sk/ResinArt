"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Mixing Premium Resin...",
  "Blending Colors...",
  "Embedding Gold Leaf...",
  "Polishing Surface...",
  "Adding Gloss Finish...",
  "Preparing Your Preview...",
];

interface LoadingSequenceProps {
  onComplete?: () => void;
  /** Custom duration multiplier if needed */
  duration?: number;
}

/**
 * Immersive loading sequence per PRP3 and PRP4 specs.
 * NO generic spinner. Custom resin blobs, floating shimmer particles,
 * and text that transitions smoothly.
 */
export function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (index >= messages.length) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 1800); // 1.8 seconds per step

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  // Keep index clamped for rendering
  const activeIndex = Math.min(index, messages.length - 1);

  return (
    <div className="fixed inset-0 z-50 bg-ivory flex flex-col items-center justify-center overflow-hidden">
      {/* Floating Animated Resin Blobs in Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div
          className="absolute w-[400px] h-[400px] rounded-full filter blur-[80px] animate-blob-1"
          style={{
            background: "radial-gradient(circle, #C5A880 0%, transparent 70%)",
            top: "10%",
            left: "15%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full filter blur-[90px] animate-blob-2"
          style={{
            background: "radial-gradient(circle, #D4848C 0%, transparent 70%)",
            bottom: "10%",
            right: "15%",
          }}
        />
      </div>

      {/* Floating Sparkle Particles (Client-only to avoid Math.random hydration mismatch) */}
      {mounted && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-soft-gold rounded-full opacity-0 animate-sparkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                "--sparkle-duration": `${3 + Math.random() * 4}s`,
                "--sparkle-delay": `${Math.random() * 5}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Center content */}
      <div className="relative z-20 text-center max-w-sm px-6">
        {/* Animated resin container drawing */}
        <div className="relative w-24 h-24 mx-auto mb-10">
          <div className="absolute inset-0 rounded-full border border-soft-gold/30 animate-spin-cw" />
          <div className="absolute inset-4 rounded-full border border-dashed border-soft-gold/50 animate-spin-ccw" />
          <div className="absolute inset-8 rounded-full bg-soft-gold/10 flex items-center justify-center animate-pulse-inner">
            <div className="w-4 h-4 rounded-full bg-soft-gold" />
          </div>
        </div>

        {/* Text transition */}
        <div className="h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
              transition={{ duration: 0.5 }}
              className="text-base tracking-wide text-charcoal/80 font-medium font-body uppercase"
            >
              {messages[activeIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
