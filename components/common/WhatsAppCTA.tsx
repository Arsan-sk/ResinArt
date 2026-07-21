"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { cn } from "@/lib/utils";

interface WhatsAppCTAProps {
  message?: string;
  className?: string;
  label?: string;
  variant?: "primary" | "secondary" | "gold";
}

/**
 * Reusable WhatsApp CTA Button.
 * Pre-fills conversion text and triggers WhatsApp chat.
 * Per PRP1, PRP2, and PRP3 specs.
 */
export function WhatsAppCTA({
  message,
  className = "",
  label = "Start Order on WhatsApp",
  variant = "primary",
}: WhatsAppCTAProps) {
  const url = getWhatsAppUrl(message);

  const variantClass = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    gold: "btn-gold",
  }[variant];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2",
        variantClass,
        className
      )}
    >
      <MessageCircle size={18} strokeWidth={1.5} />
      {label}
    </a>
  );
}
