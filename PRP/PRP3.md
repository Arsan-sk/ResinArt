PRP — Part 3
Your Resin Preview — AI Personalization Studio & Generation System
3. Product Overview

The Your Resin Preview page is not an AI playground.

It is a premium personalization experience that helps customers confidently visualize their handcrafted resin creation before placing an order.

The goal is to reduce uncertainty, increase emotional attachment, and improve conversion into WhatsApp orders.

Users should never feel like they are "prompt engineering" or using an AI tool. The interface should feel like they are collaborating with a designer.

Experience Philosophy

The page should feel like Apple's product configurator combined with a luxury jewelry customization experience.

Avoid:

Technical terminology
Long forms
JSON
Prompt editing
Model selection
API references

Instead, guide the user through a calm, step-by-step experience.

Navigation Entry

Navbar Item:

Your Resin Preview

Alternative future names (keep internal only):

Preview Studio
Design Your Keepsake
Visualize Yours

Public-facing label should remain:

Your Resin Preview

User Journey
Visit Preview Page
        │
        ▼
Introduction
        │
        ▼
Step 1 — Enter Name
        │
        ▼
Step 2 — Choose Shape
        │
        ▼
Step 3 — Choose Theme
        │
        ▼
Step 4 — Colors
        │
        ▼
Step 5 — Decorative Elements
        │
        ▼
Generate Preview
        │
        ▼
Luxury Loading Experience
        │
        ▼
Preview Ready
        │
        ▼
Download (Optional)
        │
        ▼
Order on WhatsApp
Intro Section

Heading:

Create Something That's Truly Yours

Supporting Text:

Visualize your personalized handcrafted resin creation before placing your order.

This preview is designed to help you imagine the final handcrafted piece.

CTA

Start Creating

Step-by-Step Builder

Never present one huge form.

Instead create an animated wizard.

Every step occupies the center of the page.

Transitions should slide horizontally with smooth fade.

Progress indicator should remain visible.

Example

Step 1 of 5
──────────────
Step 1
Your Name

Input

Large premium text field

Placeholder

Enter your name

Example

Arsan

Emma

Sarah

Ahmed

The entered name will later replace the placeholder inside prompt.txt.

Step 2
Choose Your Shape

Display beautiful visual cards.

Examples

○ Initial Letter

○ Full Name Plate

○ Circular

○ Oval

○ Rectangle

○ Heart

○ Hexagon

○ Custom

Hover Animation

Slight lift
Shadow enhancement
Border glow

Selected card receives elegant highlight.

Step 3
Theme

Present as elegant cards.

Examples

Luxury

Cute

Romantic

Minimal

Ocean

Pastel

Floral

Marble

Arabic Calligraphy

Surprise Me ✨

If user selects

Surprise Me

The prompt leaves styling decisions to the LLM.

Step 4
Color Palette

Choices

Auto

Luxury Gold

Pastel

Ocean

Black & Gold

Emerald

Lavender

Rose

Custom

Auto remains default.

Step 5
Decorative Elements

Cards

Gold Flakes

Silver Flakes

Flowers

Butterflies

Stars

Pearl Pigments

Marble Swirls

Ocean Waves

Smoke Effect

Auto

Final Confirmation

Display summary

Example

Name

Arsan

Shape

Initial Letter

Theme

Luxury

Colors

Auto

Elements

Auto

CTA

Generate My Preview

Prompt System

A file exists:

prompt.txt

Location

Project Root

Purpose

Master prompt template.

The application must NEVER modify this file.

Instead

Read prompt.
Copy contents.
Replace placeholders.
Send generated prompt.

Original remains untouched.

Supported Placeholders

Example

{{NAME}}

{{DISPLAY_TEXT}}

{{INITIAL}}

{{LANGUAGE}}

{{THEME}}

{{COLOR_PREFERENCE}}

{{BACKGROUND}}

{{SPECIAL_ELEMENTS}}

{{METAL_FINISH}}

Developer should ensure placeholder replacement is deterministic and safe.

Generation Architecture

The frontend should never know prompt construction.

Flow

User Input

↓

Backend

↓

Read prompt.txt

↓

Replace placeholders

↓

Generate Final Prompt

↓

Send to Model Router

↓

Receive Image

↓

Return Image URL
Model Router

Never depend on a single provider.

Architecture

Generate()

↓

Provider 1

↓

Success?

↓

Return

↓

No

↓

Provider 2

↓

Success?

↓

Return

↓

No

↓

Provider 3

↓

Return

This routing must be transparent to the user.

Model Priority

Configurable through environment variables.

Example order

Gemini
OpenAI Images
FLUX
Imagen

Future providers should be easily added.

Environment Variables

The application should centralize secrets in .env.

Examples

PRIMARY_MODEL=

SECONDARY_MODEL=

TERTIARY_MODEL=

PRIMARY_API_KEY=

SECONDARY_API_KEY=

TERTIARY_API_KEY=

WHATSAPP_NUMBER=

INSTAGRAM_USERNAME=

SITE_URL=

Never hardcode credentials.

Generation Loading Experience

Absolutely NO spinner.

Instead create an immersive handcrafted sequence.

Example Timeline

Mixing Premium Resin...

↓

Blending Colors...

↓

Embedding Gold Leaf...

↓

Polishing Surface...

↓

Adding Gloss Finish...

↓

Preparing Your Preview...

Each message fades smoothly.

Accompany with subtle animated resin blobs, floating particles, and soft shimmer.

Estimated duration should adapt to the actual API response.

Result Screen

Large hero preview.

Elegant card.

Shadow.

Rounded corners.

Download button.

Regenerate button.

Order on WhatsApp button.

Share button (future feature).

Download

Allow downloading the generated preview.

Filename example

preview-arsan.png
WhatsApp Integration

This is the primary conversion action.

Clicking

Order on WhatsApp

opens WhatsApp with a pre-filled message.

Example

Hello Zainy!

I'd like to order a personalized resin keychain.

Name:
Arsan

Shape:
Initial Letter

Theme:
Luxury

Colors:
Auto

Decorative Elements:
Auto

I've generated a preview and would like to proceed with the order.

If technically feasible, include:

preview image URL

or

preview ID

so the owner can reference the generated design.

Error Handling

If generation fails

Display

We're having trouble creating your preview right now.

Please try again in a few moments.

Offer

Retry

Never expose raw API errors.

Never expose provider names.

Rate Limiting

Prevent abuse.

Examples

Max previews per minute.
Session-based limits.
CAPTCHA only if abuse is detected.

Avoid impacting legitimate users.

Asset Management

Generated previews should optionally be cached with a unique ID.

This allows:

Reopening previews.
Referencing designs in WhatsApp.
Analytics.

Storage strategy should be configurable.

Analytics (Future)

Track anonymously:

Most selected themes.
Most popular shapes.
Conversion from preview to WhatsApp.
Average generation time.

Do not collect unnecessary personal data.

Security

Never expose:

API keys
Internal prompts
Backend routes
Provider logic

Prompt construction and model routing must remain server-side.

Configuration

Brand-specific values such as:

WhatsApp number
Instagram username
Base pricing
Logo paths

should come from a centralized configuration rather than being scattered across components.

Future Enhancements

Possible additions:

Side-by-side comparison of two designs.
Multiple preview variations from one prompt.
Save favorites.
Customer accounts.
Seasonal themes.
Gift packaging visualization.
Live inventory of decorative materials.
AI-assisted theme recommendations.
Success Criteria

A first-time visitor should be able to:

Create a preview in under two minutes.
Feel emotionally connected to the design.
Trust the handcrafted quality.
Contact Zainy on WhatsApp with all necessary details.
Complete the transition from curiosity to purchase with minimal friction.