PRP — Part 2
Website Experience, UI System & Animation Blueprint
2. Website Experience Philosophy

The website should not behave like a traditional website.

It should feel like a premium interactive brand experience where every section unfolds naturally, almost like a cinematic story.

The user should never feel overwhelmed with content.

Instead, information should appear gradually as they scroll, maintaining curiosity and anticipation.

The experience should be slow, elegant, and emotionally engaging.

Every section should answer one question before leading to the next.

Design Principles

The interface should follow these principles throughout:

Large whitespace with generous breathing room.
Clear visual hierarchy.
Editorial-inspired layouts.
Premium product photography.
Smooth and intentional animations.
Minimal UI chrome.
Focus on the product rather than decorative effects.
Consistent spacing rhythm.
Mobile-first responsiveness without sacrificing desktop richness.

Avoid visual clutter.

Avoid unnecessary gradients.

Avoid excessive glassmorphism.

Use motion and typography as the primary tools for elegance.

UI Component Libraries

The implementation may selectively use components inspired by or adapted from:

shadcn/ui for foundational UI elements.
Aceternity UI for premium hero and motion patterns.
Magic UI for tasteful interactive effects.
React Bits for utility animations.
Motion Primitives where suitable.

Do not combine component libraries in a way that creates inconsistent styling. Every imported component must be visually unified through the project's design system.

Motion Stack

Use:

GSAP for advanced scroll-triggered storytelling.
Framer Motion for page transitions and component animations.
Lenis (or an equivalent smooth scrolling library) for refined scroll behavior.

Motion should support the narrative, never distract from it.

Page Structure

The website will include:

Home
Collections
Pricing
Your Resin Preview
About
FAQ
Contact
Home Page

The homepage is the emotional centerpiece of the website.

Recommended section order:

Hero
Featured Collections
Why Handmade
Craftsmanship Timeline
Featured Products
Pricing Preview
Testimonials
Your Resin Preview CTA
Instagram Showcase
FAQ
Contact & WhatsApp
Footer
Hero Section

Purpose:

Immediately communicate luxury, craftsmanship, personalization, and warmth.

Background:

/public/videos/hero-loop.mp4

Requirements:

Autoplay
Muted
Loop
Plays inline
Responsive cropping
Poster fallback
Subtle overlay (25–35%) for text readability

Layout:

Desktop:

Left: headline, supporting copy, CTAs.
Right: unobstructed view of the looping video.

Mobile:

Full-width video with centered content overlay.

Animations:

Headline fades upward.
Subtitle appears after a slight delay.
CTA buttons stagger into view.
Background video subtly scales over time (1–2% over several seconds).
Soft floating particles may overlay the hero.
Collections Section

Purpose:

Present curated collections, not individual products.

Collections:

Initial Collection
Couple Collection
Friendship Collection
Wedding Collection
Arabic Calligraphy Collection
Luxury Collection
Floral Collection
Pastel Collection
Ocean Collection
Minimal Collection
Custom Collection

Presentation:

Each collection appears as a premium editorial card with:

Large hero image.
Collection title.
Short emotional description.
Hover interaction.
Smooth image zoom.
Gentle shadow enhancement.
Soft border glow on hover.

No rigid product grids.

Instead, use staggered masonry or editorial layouts with varied image sizes.

Image Asset Convention

Each collection will have a corresponding folder inside /public/collections/.

Example:

public/
└── collections/
    ├── initials/
    │   ├── image-1.webp
    │   ├── image-2.webp
    │   └── image-3.webp
    ├── couples/
    ├── friendship/
    ├── wedding/
    ├── arabic-calligraphy/
    ├── floral/
    ├── luxury/
    ├── pastel/
    ├── ocean/
    ├── minimal/
    └── custom/

Naming convention:

image-1.webp
image-2.webp
image-3.webp

The application should automatically iterate through available images.

If a specific image is missing, skip it gracefully rather than displaying a broken placeholder.

The AI-assisted asset preparation workflow may populate these folders before deployment by downloading, curating, and renaming images according to this convention.

Featured Product Showcase

Instead of a static carousel:

Create a horizontally scrolling showcase with gentle parallax.

Each featured piece should:

Float slightly.
Rotate subtly (1–2°).
Cast soft shadows.
Reveal glossy reflections during scroll.

Spacing should feel luxurious.

Why Handmade Section

Purpose:

Explain the value of handcrafted resin art.

Content should focus on:

Every piece made individually.
No mass production.
Thoughtful craftsmanship.
Personalized details.
Premium materials.

Visuals:

Macro product photography.
Resin textures.
Gold flakes.
Preserved flowers.
Polished edges.

Animation:

Images fade in sequentially as text appears.

Craftsmanship Timeline

Display the process as four elegant steps:

Share Your Idea
Preview Your Design
Handcrafted with Resin
Delivered to Your Door

Each step should animate into view as the user scrolls.

Use connecting lines with subtle motion to indicate progression.

Pricing Section

Purpose:

Communicate affordability while maintaining premium positioning.

Headline:

"Handcrafted Just for You"

Display:

Starting from ₹250

Do not present a rigid pricing table.

Instead, create elegant pricing cards grouped by category.

Example:

Initial Keychains
Couple Sets
Wedding Favors
Premium Collections
Custom Orders

Each card includes:

Starting price.
Short description.
"Customize Yours" CTA.
Testimonials

Display customer reviews in elegant floating cards.

Cards should:

Fade into view.
Gently lift on hover.
Maintain readable typography.

Support optional customer photos.

Future integration with Instagram reviews should be considered.

Your Resin Preview CTA

This section promotes the separate preview page.

Headline:

"See Your Personalized Design Before Ordering"

Supporting text:

Invite users to visualize their custom resin creation.

CTA:

"Create Your Preview"

Do not embed the generator here.

Instagram Showcase

Integrate the brand's Instagram profile:

resinart_byzainyy_

Display:

Latest posts.
Grid layout.
Hover interactions.
CTA linking to Instagram.

If the API is unavailable, gracefully fall back to locally stored promotional images.

FAQ

Use an accordion layout.

Questions include:

How long does it take?
Can I choose colors?
Can I preview before ordering?
Are custom requests accepted?
Is gift packaging available?

Animations:

Accordion opens smoothly without abrupt jumps.

Contact Section

Include:

WhatsApp CTA.
Instagram link.
Contact number.

Primary CTA:

"Start Your Order on WhatsApp"

Opening WhatsApp should prepare a pre-filled message (details specified in Part 3).

Footer

Minimal and elegant.

Include:

Logo.
Quick navigation.
Social links.
Copyright.
Handmade with ❤️ by Zainy.
Animation Principles

Animations must remain subtle.

Avoid:

Large bounce effects.
Aggressive scaling.
Excessive rotation.
Flashy transitions.

Preferred effects:

Fade.
Slide.
Gentle scaling.
Slow parallax.
Progressive reveal.
Layered depth.

Motion duration:

Approximately 300–800 ms depending on interaction.

Use easing curves that feel natural and refined.

Responsive Design

Desktop:

Rich editorial layouts.
Larger typography.
More whitespace.
Multi-column sections.

Tablet:

Simplified grids.
Adjusted spacing.

Mobile:

Single-column layout.
Touch-friendly interactions.
Optimized media.
Full-width CTAs.

No content should feel cramped on smaller screens.

Performance Guidelines
Lazy-load non-critical images.
Optimize videos.
Use modern image formats (WebP/AVIF where supported).
Defer animations until elements enter the viewport.
Minimize layout shifts.
Maintain fast initial page load.
Accessibility
Sufficient color contrast.
Keyboard navigation.
Screen reader labels.
Reduced motion support for users who prefer minimal animations.
Semantic HTML structure.