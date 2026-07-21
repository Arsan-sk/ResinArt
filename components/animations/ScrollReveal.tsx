"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Distance to translate from (in px) */
  distance?: number;
  /** Direction of reveal */
  direction?: "up" | "down" | "left" | "right";
  /** Only animate once */
  once?: boolean;
  /** Duration in seconds */
  duration?: number;
}

/**
 * Reusable scroll-triggered reveal animation.
 * Uses Framer Motion whileInView for lightweight scroll reveals.
 * Honors prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  distance = 40,
  direction = "up",
  once = true,
  duration = 0.7,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const directionMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const offset = directionMap[direction];

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

/**
 * Container for staggered child reveals.
 * Wrap multiple ScrollReveal children with increasing delays.
 */
export function StaggerContainer({
  children,
  className = "",
}: StaggerContainerProps) {
  return <div className={className}>{children}</div>;
}
