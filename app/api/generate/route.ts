import { NextRequest, NextResponse } from "next/server";
import { PromptManager } from "@/lib/prompt/promptManager";
import { ProviderRouter } from "@/lib/ai/providerRouter";
import { HuggingFaceProvider } from "@/lib/ai/providers/huggingface";
import { GeminiProvider } from "@/lib/ai/providers/gemini";
import { rateLimit } from "@/lib/utils/rateLimit";

const FALLBACK_IMAGES = [
  "/collections/arabic-calligraphy/image-1.webp",
  "/collections/couples/image-1.webp",
  "/collections/custom/image-1.webp",
  "/collections/floral/image-1.webp",
  "/collections/friendship/image-1.webp",
  "/collections/initials/image-1.webp",
  "/collections/luxury/image-1.webp",
  "/collections/minimal/image-1.webp",
  "/collections/ocean/image-1.webp",
  "/collections/pastel/image-1.webp",
  "/collections/wedding/image-1.webp"
];

function getRandomFallbackImage(): string {
  const index = Math.floor(Math.random() * FALLBACK_IMAGES.length);
  return FALLBACK_IMAGES[index];
}

/**
 * AI Generation Endpoint.
 * Resolves prompt variables, replaces placeholders in prompt.txt template,
 * executes provider fallback routing.
 * Per PRP3 and PRP4.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!rateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { error: "Too many design preview requests. Please wait a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, shape, theme, colors, elements } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    // 1. Generate Prompt using prompt template
    const finalPrompt = PromptManager.generatePrompt({
      name,
      shape,
      theme,
      colors,
      elements,
    });

    // 2. Setup Provider Router with fallbacks
    const router = new ProviderRouter();

    // Register Gemini first (Priority)
    router.registerProvider(new GeminiProvider());

    // Register Hugging Face second (Fallback)
    router.registerProvider(new HuggingFaceProvider());

    // 3. Generate Image with fallback mapping
    let imageUrl = "";
    let isFallback = false;

    try {
      imageUrl = await router.generateImage(finalPrompt);
    } catch (err) {
      console.error("[API Image Generation Failed, using fallback]:", err);
      imageUrl = getRandomFallbackImage();
      isFallback = true;
    }

    return NextResponse.json({
      url: imageUrl,
      prompt: finalPrompt,
      fallback: isFallback
    });
  } catch (error: any) {
    console.error("[API Generate Parse/Template Error]:", error);

    // Extreme fallback context: return basic template variables
    return NextResponse.json(
      {
        url: getRandomFallbackImage(),
        prompt: "",
        fallback: true,
        error: "Server processing error"
      }
    );
  }
}

