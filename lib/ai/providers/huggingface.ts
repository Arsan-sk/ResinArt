import { InferenceClient } from "@huggingface/inference";
import { ImageProvider } from "../providerRouter";

/**
 * Hugging Face Free Inference API Provider.
 * Uses black-forest-labs/FLUX.1-dev model via official InferenceClient SDK.
 */
export class HuggingFaceProvider implements ImageProvider {
  public name = "huggingface";
  private apiKey = process.env.HUGGINGFACE_KEY;

  public async generate(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error("HUGGINGFACE_KEY environment variable is not set.");
    }

    console.log("[Hugging Face] Sending generation request to FLUX.1-dev via SDK...");
    const hf = new InferenceClient(this.apiKey);

    const dataUrl = await hf.textToImage(
      {
        model: "black-forest-labs/FLUX.1-dev",
        inputs: prompt,
        provider: "replicate",
      },
      {
        outputType: "dataUrl",
      }
    );

    return dataUrl;
  }
}

