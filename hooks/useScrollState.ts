"use client";

import { useState, useEffect } from "react";

/**
 * Hook to track scroll offset status.
 * Useful for building scroll-responsive headers, navbars, and CTAs.
 */
export function useScrollState(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
