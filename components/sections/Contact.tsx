"use client";

import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/common/SocialIcons";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * Contact & WhatsApp section — Primary conversion area.
 * "Start Your Order on WhatsApp" with pre-filled message.
 * Per PRP2 specification.
 */
export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="section-inner">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2
              className="mb-6"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Ready to Create Something{" "}
              <span className="italic text-soft-gold">Beautiful</span>?
            </h2>

            <p
              className="text-muted-foreground mb-12 mx-auto"
              style={{ fontSize: "var(--text-lg)" }}
            >
              Every journey starts with a simple message. Tell us your idea,
              and we'll craft something uniquely yours.
            </p>
          </ScrollReveal>

          {/* Primary CTA */}
          <ScrollReveal delay={0.1}>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 !px-8 !py-4 !text-base group"
            >
              <MessageCircle size={20} strokeWidth={1.5} />
              Start Your Order on WhatsApp
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </ScrollReveal>

          {/* Secondary Contact Options */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-soft-gold transition-colors duration-300"
              >
                <InstagramIcon size={18} strokeWidth={1.5} />
                <span className="text-sm">@{siteConfig.instagram.username}</span>
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-soft-gold transition-colors duration-300"
              >
                <Phone size={18} strokeWidth={1.5} />
                <span className="text-sm">{siteConfig.phone}</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
