import { ImageProvider } from "../providerRouter";

/**
 * FLUX image provider (Replicate / local / alternative endpoint).
 */
export class FluxProvider implements ImageProvider {
  public name = "flux";
  private apiKey = process.env.FLUX_KEY;

  public async generate(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error("FLUX_KEY environment variable is not set.");
    }

    // Example call to Replicate's FLUX model API
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.apiKey}`,
      },
      body: JSON.stringify({
        version: "schnell", // or flux-schnell model ID
        input: {
          prompt: prompt,
          aspect_ratio: "1:1",
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Flux API prediction start failed: ${errText}`);
    }

    const prediction = await response.json();
    let predictionId = prediction.id;

    // Poll for prediction completion (standard Replicate flow)
    let status = prediction.status;
    let url = "";
    let attempts = 0;

    while (status !== "succeeded" && status !== "failed" && attempts < 20) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          Authorization: `Token ${this.apiKey}`,
        },
      });
      if (pollResponse.ok) {
        const pollData = await pollResponse.json();
        status = pollData.status;
        if (status === "succeeded") {
          url = pollData.output?.[0];
        }
      }
      attempts++;
    }

    if (!url) {
      throw new Error("Flux generation timed out or failed.");
    }

    return url;
  }
}
