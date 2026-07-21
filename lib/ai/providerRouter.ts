export interface ImageProvider {
  name: string;
  generate(prompt: string): Promise<string>;
}

/**
 * Provider Router implementing fallback chain execution.
 * Tries primary provider, falls back sequentially on failure.
 * Per PRP3 and PRP4 specifications.
 */
export class ProviderRouter {
  private providers: ImageProvider[] = [];

  constructor() {
    // We will initialize concrete providers dynamically or based on env config
  }

  public registerProvider(provider: ImageProvider) {
    this.providers.push(provider);
  }

  /**
   * Generates image by attempting registered providers sequentially.
   * If a provider fails, it logs error and tries next.
   */
  public async generateImage(prompt: string): Promise<string> {
    if (this.providers.length === 0) {
      throw new Error("No image generation providers registered.");
    }

    let lastError: Error | null = null;

    for (const provider of this.providers) {
      try {
        console.log(`[AI Router] Attempting generation with provider: ${provider.name}`);
        const url = await provider.generate(prompt);
        console.log(`[AI Router] Success with provider: ${provider.name}`);
        return url;
      } catch (err) {
        console.warn(`[AI Router] Provider ${provider.name} failed:`, err);
        lastError = err as Error;
      }
    }

    throw new Error(
      `All image generation providers failed. Last error: ${lastError?.message || "Unknown error"}`
    );
  }
}
