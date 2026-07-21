import { Hero } from "@/components/hero/Hero";
import { FeaturedCollections } from "@/components/collections/FeaturedCollections";
import { WhyHandmade } from "@/components/sections/WhyHandmade";
import { CraftsmanshipTimeline } from "@/components/sections/CraftsmanshipTimeline";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { PricingPreview } from "@/components/pricing/PricingPreview";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { PreviewCTA } from "@/components/sections/PreviewCTA";
import { InstagramShowcase } from "@/components/sections/InstagramShowcase";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

/**
 * Homepage — The emotional centerpiece of the website.
 *
 * Section order per PRP2:
 * 1. Hero
 * 2. Featured Collections
 * 3. Why Handmade
 * 4. Craftsmanship Timeline
 * 5. Featured Products (horizontal scroll)
 * 6. Pricing Preview
 * 7. Testimonials
 * 8. Your Resin Preview CTA
 * 9. Instagram Showcase
 * 10. FAQ
 * 11. Contact & WhatsApp
 */
export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      <Hero />
      <FeaturedCollections />
      <WhyHandmade />
      <CraftsmanshipTimeline />
      <FeaturedProducts />
      <PricingPreview />
      <Testimonials />
      <PreviewCTA />
      <InstagramShowcase />
      <FAQ />
      <Contact />
    </div>
  );
}
