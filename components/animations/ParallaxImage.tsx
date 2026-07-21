"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Distance to shift in scroll direction (in pixels) */
  yOffset?: number;
}

/**
 * Image component with gentle scroll parallax effect.
 * Uses Framer Motion's useScroll and useTransform for high-performance scroll values.
 * Respects prefers-reduced-motion.
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  yOffset = 40,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Shift image vertically as parent scroll container moves through viewport
  const y = useTransform(scrollYProgress, [0, 1], [-yOffset, yOffset]);

  if (reduce) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 500px"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute -inset-y-10 w-full h-[calc(100%+80px)]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 500px"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </motion.div>
    </div>
  );
}
