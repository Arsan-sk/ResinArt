import { ImageProvider } from "../providerRouter";

/**
 * Gemini Imagen provider using Google Developer API.
 */
export class GeminiProvider implements ImageProvider {
  public name = "gemini";
  private apiKey = process.env.GEMINI_KEY;

  public async generate(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error("GEMINI_KEY environment variable is not set.");
    }

    // Call Google Imagen 3 API endpoint directly
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:generateImages?key=${this.apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numberOfImages: 1,
        prompt: prompt,
        aspectRatio: "1:1",
        outputMimeType: "image/jpeg",
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API failed with status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const base64Image = data.generatedImages?.[0]?.image?.imageBytes;

    if (!base64Image) {
      throw new Error("No image data found in Gemini response.");
    }

    return `data:image/jpeg;base64,${base64Image}`;
  }
}
