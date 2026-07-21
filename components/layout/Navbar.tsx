"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/common/SocialIcons";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { cn } from "@/lib/utils";

type ScrollState = "transparent" | "glass" | "solid";

/**
 * Premium sticky navbar with three scroll states:
 * Transparent → Glassmorphism → Solid
 * Per PRP1 & PRP2 specifications.
 */
export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [scrollState, setScrollState] = useState<ScrollState>(
    isHome ? "transparent" : "solid"
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(pathname);

  // Sync scrollState and activeSection in render when pathname changes to avoid transparent header on subpages
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setScrollState(pathname === "/" ? "transparent" : "solid");
    setActiveSection(pathname);
  }

  const handleScroll = useCallback(() => {
    if (!isHome) {
      setScrollState("solid");
      return;
    }
    const y = window.scrollY;
    if (y < 50) {
      setScrollState("transparent");
    } else if (y < 300) {
      setScrollState("glass");
    } else {
      setScrollState("solid");
    }
  }, [isHome]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Handle client-side hash scrolling upon navigation (e.g. from subpage to /#featured-collections)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const timer = setTimeout(() => {
          const id = hash.replace("#", "");
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  // Scroll spy to highlight active section on the homepage based on scroll offset position
  useEffect(() => {
    if (!isHome) {
      setActiveSection(pathname);
      return;
    }

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 140; // 140px header offset

      const sections = [
        { id: "hero", href: "/" },
        { id: "featured-collections", href: "/collections" },
        { id: "why-handmade", href: "/about" },
        { id: "pricing-preview", href: "/pricing" },
        { id: "contact", href: "/contact" }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.id === "hero") {
          if (scrollPosition < 300) {
            setActiveSection("/");
            break;
          }
        } else {
          const el = document.getElementById(section.id);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(section.href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [isHome, pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/") {
      let targetId = "";
      if (href === "/pricing") targetId = "pricing-preview";
      if (href === "/about") targetId = "why-handmade";
      if (href === "/contact") targetId = "contact";
      if (href === "/collections" || href === "#featured-collections" || href === "/#featured-collections") {
        targetId = "featured-collections";
      }
      if (href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setMobileOpen(false);
        return;
      }

      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
          setMobileOpen(false);
        }
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrollState === "transparent" && "bg-transparent",
        scrollState === "glass" && "glass",
        scrollState === "solid" && "bg-ivory/95 shadow-sm"
      )}
      style={{ height: "var(--navbar-height)" }}
    >
      <nav
        className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-10"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="relative z-10 flex items-center gap-2"
          aria-label="Zainy Resin Art — Home"
        >
          <span
            className="font-heading text-xl font-semibold tracking-wide transition-colors duration-300"
            style={{ 
              fontFamily: "var(--font-cormorant)",
              color: scrollState === "transparent" ? "#FFFFFF" : "var(--charcoal)"
            }}
          >
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href === "/collections" ? (isHome ? "#featured-collections" : "/#featured-collections") : item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-sm font-medium tracking-wide transition-colors duration-300 hover:text-soft-gold"
                style={{
                  color: activeSection === item.href
                    ? "var(--soft-gold)"
                    : scrollState === "transparent"
                    ? "#FFFFFF"
                    : "var(--charcoal)"
                }}
              >
                {item.label}
                {activeSection === item.href && (
                  <span 
                    className="absolute -bottom-1 left-0 right-0 h-px" 
                    style={{ backgroundColor: "var(--soft-gold)" }} 
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Social + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            className="transition-colors duration-300 hover:text-soft-gold"
            style={{
              color: scrollState === "transparent" ? "#FFFFFF" : "var(--charcoal)"
            }}
          >
            <InstagramIcon size={18} strokeWidth={1.5} />
          </a>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2 !px-5 !text-xs"
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="relative z-10 lg:hidden p-2 transition-colors"
          style={{
            color: mobileOpen || scrollState !== "transparent" ? "var(--charcoal)" : "#FFFFFF"
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X size={24} strokeWidth={1.5} />
          ) : (
            <Menu size={24} strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 bg-ivory transition-all duration-500 lg:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        style={{ paddingTop: "var(--navbar-height)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
          {siteConfig.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href === "/collections" ? (isHome ? "#featured-collections" : "/#featured-collections") : item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={cn(
                "font-heading text-3xl font-light tracking-wide transition-all duration-500",
                "hover:text-soft-gold",
                activeSection === item.href
                  ? "text-soft-gold"
                  : "text-charcoal"
              )}
              style={{
                fontFamily: "var(--font-cormorant)",
                transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen
                  ? "translateY(0)"
                  : "translateY(20px)",
              }}
            >
              {item.label}
            </Link>
          ))}

          <div
            className="flex items-center gap-6 mt-4 transition-all duration-500"
            style={{
              transitionDelay: mobileOpen
                ? `${siteConfig.nav.length * 60}ms`
                : "0ms",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram"
              className="text-charcoal hover:text-soft-gold transition-colors"
            >
              <InstagramIcon size={22} strokeWidth={1.5} />
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
