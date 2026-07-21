import { ImageProvider } from "../providerRouter";

/**
 * OpenAI DALL-E 3 Image Generation Provider.
 */
export class OpenAIProvider implements ImageProvider {
  public name = "openai";
  private apiKey = process.env.OPENAI_KEY;

  public async generate(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error("OPENAI_KEY environment variable is not set.");
    }

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: "url", // or b64_json
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI API failed with status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const url = data.data?.[0]?.url;

    if (!url) {
      throw new Error("No image URL found in OpenAI response.");
    }

    return url;
  }
}
