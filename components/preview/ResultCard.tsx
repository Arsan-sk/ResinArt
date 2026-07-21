"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, RefreshCw, MessageCircle, Copy, Check } from "lucide-react";
import { getWhatsAppOrderMessage, getWhatsAppUrl } from "@/lib/config/site";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface ResultCardProps {
  name: string;
  shape: string;
  theme: string;
  colors: string;
  elements: string;
  imageUrl: string;
  prompt: string;
  isFallback: boolean;
  onReset: () => void;
}

/**
 * Result Card showing the generated AI preview image.
 * Provides Download, Regenerate, and WhatsApp Order buttons.
 * Per PRP3 specifications.
 */
export function ResultCard({
  name,
  shape,
  theme,
  colors,
  elements,
  imageUrl,
  prompt,
  isFallback,
  onReset,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy prompt: ", err);
    }
  };
  
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `preview-${name.toLowerCase().replace(/[^a-z0-9]/g, "") || "keepsake"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab if cors issues
      window.open(imageUrl, "_blank");
    }
  };

  const orderMessage = getWhatsAppOrderMessage({
    name,
    shape,
    theme,
    colors,
    elements,
    previewId: imageUrl.includes("id=") ? imageUrl.split("id=")[1] : undefined,
  });

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        {/* Left: Image Container & AI Prompt */}
        <ScrollReveal>
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border border-border bg-white p-4">
              <div className="relative h-full w-full rounded-xl overflow-hidden bg-warm-beige/30">
                <Image
                  src={imageUrl}
                  alt={`Your Resin Preview for ${name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
              </div>
            </div>

            {/* AI Design Prompt copy block */}
            <div className="p-5 rounded-xl border border-border/60 bg-surface shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  AI Design Prompt
                </span>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1 text-xs text-soft-gold hover:text-charcoal font-semibold transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={12} strokeWidth={2.5} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} strokeWidth={2.5} />
                      Copy Prompt
                    </>
                  )}
                </button>
              </div>
              <div className="text-xs text-muted-foreground bg-warm-beige/10 p-3 rounded-lg border border-border/30 max-h-[100px] overflow-y-auto font-mono select-all leading-normal whitespace-pre-wrap">
                {prompt}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Info and Actions */}
        <ScrollReveal delay={0.15}>
          <div className="space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-soft-gold font-semibold mb-2 block">
                {isFallback ? "Design Showcase" : "Preview Ready"}
              </span>
              <h2 className="text-3xl font-light mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
                {isFallback ? "Premium Example Design" : "Your Keepsake Design"}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {isFallback ? (
                  "We are experiencing high demand on our instant preview rendering servers. The image shown is a premium handcrafted example of this style. You can copy the exact AI prompt below to generate your custom design on any standard AI image platform."
                ) : (
                  "This preview represents the handcrafted direction for your order. Each piece is poured and layered individually to match this vision."
                )}
              </p>
            </div>

            {/* Selection Summary */}
            <div className="p-6 rounded-xl bg-warm-beige/20 border border-border/40 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-semibold">{name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shape:</span>
                <span className="font-semibold">{shape}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Theme:</span>
                <span className="font-semibold">{theme}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Colors:</span>
                <span className="font-semibold">{colors}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Decorative Elements:</span>
                <span className="font-semibold">{elements}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={getWhatsAppUrl(orderMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2 flex-1"
              >
                <MessageCircle size={18} />
                Order on WhatsApp
              </a>

              <button
                onClick={handleDownload}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download
              </button>

              <button
                onClick={onReset}
                className="btn-secondary flex items-center justify-center gap-2 !border-dashed hover:!border-soft-gold"
              >
                <RefreshCw size={18} />
                New Design
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
