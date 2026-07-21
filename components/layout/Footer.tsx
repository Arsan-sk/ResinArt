import Link from "next/link";
import { MessageCircle, Heart } from "lucide-react";
import { InstagramIcon } from "@/components/common/SocialIcons";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";

/**
 * Minimal and elegant footer per PRP2 spec.
 * Logo, quick navigation, social links, copyright.
 */
export function Footer() {
  return (
    <footer className="bg-charcoal text-pearl-white/80">
      <div className="section-inner px-6 lg:px-10 py-16 lg:py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Brand */}
          <div className="space-y-4">
            <h3
              className="text-2xl font-light text-pearl-white tracking-wide"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {siteConfig.name}
            </h3>
            <p className="text-sm leading-relaxed text-pearl-white/60 max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className="text-sm font-semibold uppercase tracking-widest text-pearl-white/40"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-pearl-white/60 hover:text-soft-gold transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4
              className="text-sm font-semibold uppercase tracking-widest text-pearl-white/40"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-pearl-white/60 hover:text-soft-gold transition-colors duration-300"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                Order on WhatsApp
              </a>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-pearl-white/60 hover:text-soft-gold transition-colors duration-300"
              >
                <InstagramIcon size={16} strokeWidth={1.5} />
                @{siteConfig.instagram.username}
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-pearl-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-pearl-white/40">
              {siteConfig.footer.copyright}
            </p>
            <p className="flex items-center gap-1 text-xs text-pearl-white/40">
              Handmade with{" "}
              <Heart
                size={12}
                strokeWidth={1.5}
                className="text-soft-gold fill-soft-gold"
              />{" "}
              by Zainy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
