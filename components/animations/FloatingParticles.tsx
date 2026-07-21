"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
}

/**
 * Floating Shimmer Particles for luxury backdrop aesthetics.
 * Uses canvas for high performance.
 * Respects prefers-reduced-motion.
 */
export function FloatingParticles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Particle[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create a particle
    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: height + Math.random() * 20,
      size: 0.8 + Math.random() * 1.5,
      speedY: -0.2 - Math.random() * 0.4,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: 0.1 + Math.random() * 0.5,
      fadeSpeed: 0.001 + Math.random() * 0.003,
    });

    // Populate initial particles
    for (let i = 0; i < 40; i++) {
      const p = createParticle();
      p.y = Math.random() * height; // scatter initial particles
      particles.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Gold particles color
      ctx.fillStyle = "rgba(197, 168, 128, 0.4)";

      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity -= p.fadeSpeed;

        // Reset particle if it drifts off screen or fades out
        if (p.y < 0 || p.opacity <= 0) {
          particles[index] = createParticle();
          return;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 168, 128, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
}
