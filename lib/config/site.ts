/**
 * Centralized brand configuration for Zainy Resin Art.
 * All editable business information lives here.
 * Changing any value here propagates across the entire website.
 */

export const siteConfig = {
  name: "Zainy Resin Art",
  tagline: "Handmade by Zainy. Made Just For You.",
  description:
    "Premium handcrafted resin art — personalized keychains, keepsakes, and gifts made with love and care.",
  url: "https://zainyresinart.com",

  // Contact — hardcoded to prevent server/client hydration mismatch
  whatsapp: {
    number: "+918329439152",
    defaultMessage:
      "Hello Zainy! I'd like to order a personalized resin keychain.",
  },
  instagram: {
    username: "resinart_byzainyy_",
    url: "https://instagram.com/resinart_byzainyy_",
  },
  phone: "+91XXXXXXXXXX",
  email: "zainyresinart@gmail.com",

  // Pricing
  pricing: {
    startingFrom: 250,
    currency: "₹",
    categories: [
      {
        name: "Initial Keychains",
        startingPrice: 250,
        description: "Personalized letter keychains with your initial",
      },
      {
        name: "Couple Sets",
        startingPrice: 450,
        description: "Matching keychains for couples, crafted with love",
      },
      {
        name: "Wedding Favors",
        startingPrice: 200,
        description: "Elegant bulk orders for your special day",
      },
      {
        name: "Premium Collections",
        startingPrice: 500,
        description: "Luxury finishes with gold leaf and premium materials",
      },
      {
        name: "Custom Orders",
        startingPrice: 350,
        description: "Fully personalized designs crafted to your vision",
      },
    ],
  },

  // Social links
  social: {
    instagram: "https://instagram.com/resinart_byzainyy_",
    whatsapp: "",
  },

  // Navigation
  nav: [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: "Pricing", href: "/pricing" },
    { label: "Your Resin Preview", href: "/preview" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  // SEO
  seo: {
    keywords: [
      "personalized resin keychains",
      "handmade resin gifts",
      "custom keychains",
      "personalized gifts",
      "resin art India",
      "handmade keepsakes",
      "wedding resin favors",
      "couple keychains",
      "customized resin name tags",
    ],
  },

  // Footer
  footer: {
    tagline: "Handmade with ❤️ by Zainy.",
    copyright: "© 2025 Zainy Resin Art. All rights reserved.",
  },
} as const;

/** Generate a WhatsApp URL with pre-filled message */
export function getWhatsAppUrl(message?: string): string {
  const phone = siteConfig.whatsapp.number.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(
    message || siteConfig.whatsapp.defaultMessage
  );
  return `https://wa.me/${phone}?text=${text}`;
}

/** Generate a WhatsApp order message from preview selections */
export function getWhatsAppOrderMessage(details: {
  name: string;
  shape: string;
  theme: string;
  colors: string;
  elements: string;
  previewId?: string;
}): string {
  return `Hello Zainy!

I'd like to order a personalized resin keychain.

Name: ${details.name}
Shape: ${details.shape}
Theme: ${details.theme}
Colors: ${details.colors}
Decorative Elements: ${details.elements}

I've generated a preview and would like to proceed with the order.${
    details.previewId ? `\n\nPreview ID: ${details.previewId}` : ""
  }`;
}
