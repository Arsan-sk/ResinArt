PRP — Part 4
Technical Blueprint, Development Standards & AI Implementation Guide
4. Technical Vision

This is not a CRUD website.

It is a premium digital brand experience with an AI-assisted personalization flow.

The implementation should prioritize:

Premium UI
Performance
Scalability
Clean Architecture
Reusability
Accessibility
SEO
Smooth Motion
Mobile Experience

Every implementation decision should preserve the handcrafted luxury feel.

Recommended Tech Stack
Frontend
Next.js (App Router)
TypeScript
Tailwind CSS
shadcn/ui
Motion
GSAP (primary scroll storytelling)
Framer Motion (component/page transitions)
Lenis (smooth scrolling)
Icons
Lucide Icons

Avoid inconsistent icon packs.

Forms
React Hook Form
Zod Validation
Image Optimization
Next/Image
WebP
AVIF where supported
Backend

Use Next.js Route Handlers.

Avoid unnecessary backend frameworks.

AI Layer

Server-side only.

Never expose API keys.

Folder Structure

The application should follow a scalable architecture.

/
│
├── app/
│
├── components/
│   ├── layout/
│   ├── hero/
│   ├── collections/
│   ├── pricing/
│   ├── preview/
│   ├── testimonials/
│   ├── animations/
│   ├── common/
│   └── ui/
│
├── lib/
│   ├── ai/
│   ├── config/
│   ├── router/
│   ├── prompt/
│   └── utils/
│
├── hooks/
│
├── public/
│   ├── videos/
│   │   └── hero-loop.mp4
│   │
│   ├── logo/
│   │   ├── logo.svg
│   │   ├── logo-dark.svg
│   │   └── logo-icon.svg
│   │
│   ├── collections/
│   │
│   └── placeholders/
│
├── styles/
│
├── prompt.txt
│
└── .env
Asset Management Rules

All media should come from predictable locations.

Never hardcode assets into components.

Collections should automatically detect available images.

Naming convention:

image-1.webp

image-2.webp

image-3.webp

Developers should be able to add images without modifying code.

Image Loading Strategy

Priority:

Local assets
AI-populated folders
Elegant placeholder card

Never show

Broken Image

404

Missing Asset

Video Handling

Hero Video

public/videos/hero-loop.mp4

Optional

hero-loop.webm

Implementation

Autoplay

Muted

Loop

playsInline

Poster Image

Lazy loading

Pause when page becomes inactive

Resume automatically

Logo System

Store

logo.svg

logo-dark.svg

logo-icon.svg

Logo should remain SVG.

No raster logos.

Configuration

All editable business information should live inside one configuration layer.

Example

Brand Name

Instagram

WhatsApp

Phone

Email

Address

Pricing

Social Links

Business Hours

Changing business information should never require editing multiple components.

Environment Variables
OPENAI_KEY=

GEMINI_KEY=

FLUX_KEY=

IMAGEN_KEY=

PRIMARY_PROVIDER=

SECONDARY_PROVIDER=

WHATSAPP_NUMBER=

INSTAGRAM_USERNAME=

NEXT_PUBLIC_SITE_URL=

No secrets inside frontend code.

Prompt Management

Never write prompts directly inside source files.

Always read from

prompt.txt

Workflow

Read Prompt

↓

Replace Variables

↓

Generate Prompt

↓

Send To AI

↓

Receive Image

↓

Return URL

Original prompt remains unchanged.

AI Provider Router

Design a provider abstraction.

Every provider should implement the same interface.

Example

Generate()

↓

Provider A

↓

Provider B

↓

Provider C

Changing providers should require configuration changes only.

Component Philosophy

Every component should have one responsibility.

Avoid monolithic files.

Examples

Hero

Navbar

CollectionCard

CollectionGrid

Timeline

PricingCard

FAQAccordion

PreviewWizard

LoadingSequence

ResultCard

WhatsAppCTA

Footer

State Management

Keep global state minimal.

Prefer local component state.

Use context only when necessary.

Avoid overengineering.

Animation Standards

Motion should support storytelling.

Recommended durations

Hover

150–250ms

Cards

300–500ms

Sections

600–900ms

Hero

1200ms

Never animate everything simultaneously.

Stagger reveals.

GSAP Guidelines

Use GSAP for

Hero

Scroll storytelling

Pinned sections

Image reveals

Horizontal scrolling

Parallax

Timeline animations

Avoid GSAP for simple button interactions.

Framer Motion Guidelines

Use for

Cards

Dialogs

Hover

Page transitions

Wizard

Fade animations

Scroll Philosophy

Scrolling should feel luxurious.

No abrupt jumps.

No scroll hijacking.

Smooth but responsive.

Micro-interactions

Every interaction should feel handcrafted.

Examples

Buttons

Soft hover glow

Cards

Gentle elevation

Images

Slight zoom

Links

Elegant underline animation

Inputs

Animated focus rings

Preview Cards

Soft reflections

Loading States

Never use plain spinners.

Loading should communicate craftsmanship.

Examples

Mixing Resin...

↓

Pouring Colors...

↓

Embedding Gold Leaf...

↓

Polishing Surface...

↓

Preparing Preview...

Use subtle animated resin blobs and shimmering particles.

Performance Budget

Largest Contentful Paint under 2.5 seconds.

Use:

Lazy loading

Dynamic imports

Code splitting

Image optimization

Video compression

Preloading hero assets

Avoid unnecessary JavaScript.

SEO Strategy

Each page should have:

Unique title

Meta description

Open Graph image

Twitter Card

Canonical URL

Structured Data

Generate dynamic metadata where appropriate.

Content SEO

Target keywords naturally.

Examples

Personalized resin keychains
Handmade resin gifts
Custom keychains
Personalized gifts
Resin art India
Handmade keepsakes
Wedding resin favors
Couple keychains
Customized resin name tags

Do not keyword stuff.

Accessibility

Support:

Keyboard navigation

Screen readers

Alt text

Reduced motion

Proper focus states

Semantic HTML

Color contrast compliance

Mobile Experience

The mobile experience is equally important.

Use:

Bottom spacing

Large tap targets

Sticky CTA

Optimized media

Responsive typography

Single-column layouts where appropriate

Error Handling

Every failure should feel graceful.

Examples

Missing Images

Generation Failure

Network Issues

API Timeout

Fallback UI should remain elegant.

Future Scalability

The architecture should support future additions without major refactoring.

Potential additions:

Shopping cart

Payments

Customer accounts

Order tracking

Admin dashboard

Inventory management

Blog

Coupons

Multi-language

Dark mode

Gift packaging options

Live order status

Design QA Checklist

Every new page should satisfy:

✓ Premium typography

✓ Consistent spacing

✓ Responsive

✓ Accessible

✓ Smooth motion

✓ Performance optimized

✓ SEO optimized

✓ Elegant loading

✓ Cohesive color palette

✓ Luxury visual hierarchy

AI Coding Instructions

When generating code, the AI assistant should:

Prefer reusable components over duplicated code.
Keep components small and focused.
Maintain consistent naming conventions.
Use TypeScript throughout.
Avoid inline styles unless absolutely necessary.
Favor composition over deeply nested components.
Include comments only where they add meaningful context.
Write code that is easy to extend and maintain.
Definition of Done

The project is complete when:

The website feels like a premium handcrafted brand, not a generic template.
Navigation is intuitive across all devices.
Animations are smooth and purposeful.
The hero video integrates seamlessly.
Collections load dynamically from the defined asset folders.
The AI Preview flow works end-to-end using prompt.txt.
WhatsApp ordering passes all selected customization details.
Performance, accessibility, and SEO meet modern standards.
The entire experience encourages visitors to explore, personalize, and confidently place an order.
Final Creative Direction (Read Before Building)

This is the most important instruction.

Do not optimize only for functionality. Optimize for emotion.

Every design choice, animation, spacing decision, and interaction should reinforce the feeling that each resin piece is handcrafted with care and made specifically for the customer.

If a feature can be implemented in two ways, choose the one that better communicates craftsmanship, elegance, and trust—even if it requires a little more effort.

The end result should feel closer to a luxury boutique experience than a conventional product website. Visitors should leave with the impression that they have interacted with a premium artisan brand, and the transition from inspiration to ordering should feel natural, personal, and delightful.

End of PRP

Together, Parts 1–4 form a complete product requirements package covering:

Brand strategy and positioning
UX and information architecture
Visual design system
Motion and interaction design
Asset conventions and folder structure
AI Preview architecture
Prompt management (prompt.txt)
WhatsApp conversion flow
Technical architecture
Performance, SEO, accessibility
Future scalability
AI implementation guidelines

This PRP is intended to be detailed enough for an AI builder like Lovable while remaining maintainable for a human development team.