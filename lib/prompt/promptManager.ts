import fs from "fs";
import path from "path";

export interface PromptVariables {
  name: string;
  shape: string;
  theme: string;
  colors: string;
  elements: string;
}

/**
 * PromptManager - Handles reading the prompt.txt template and replacing placeholders.
 * The master prompt.txt template file is NEVER modified directly.
 * Per PRP3 and PRP4 specifications.
 */
export class PromptManager {
  private static templatePath = path.join(process.cwd(), "prompt.txt");

  /**
   * Reads prompt.txt, replaces placeholders with user selections, and returns the final prompt.
   */
  public static generatePrompt(vars: PromptVariables): string {
    if (!fs.existsSync(this.templatePath)) {
      throw new Error(`Master template not found at ${this.templatePath}`);
    }

    const template = fs.readFileSync(this.templatePath, "utf-8");

    // Compute derived variables
    const initial = vars.name ? vars.name.charAt(0).toUpperCase() : "";
    const displayText = vars.name || "";
    const language = this.detectLanguage(vars.name);

    // Replace placeholders
    let prompt = template
      .replace(/\{\{NAME\}\}/g, vars.name)
      .replace(/\{\{DISPLAY_TEXT\}\}/g, displayText)
      .replace(/\{\{INITIAL\}\}/g, initial)
      .replace(/\{\{LANGUAGE\}\}/g, language)
      .replace(/\{\{SHAPE_MODE\}\}/g, vars.shape)
      .replace(/\{\{THEME\}\}/g, vars.theme)
      .replace(/\{\{COLOR_PREFERENCE\}\}/g, vars.colors === "Auto" ? "Intelligently choose matching palette" : vars.colors)
      .replace(/\{\{SPECIAL_ELEMENTS\}\}/g, vars.elements === "Auto" ? "Auto selected elements matching theme" : vars.elements)
      .replace(/\{\{METAL_FINISH\}\}/g, "Auto")
      .replace(/\{\{BACKGROUND\}\}/g, "Auto");

    return prompt;
  }

  /**
   * Intelligently detects writing language based on character blocks.
   * Supports English, Arabic/Urdu, Hindi, etc.
   */
  private static detectLanguage(text: string): string {
    if (!text) return "English";

    // Arabic / Persian / Urdu script ranges
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    // Hindi Devanagari range
    const hindiRegex = /[\u0900-\u097F]/;

    if (arabicRegex.test(text)) return "Arabic";
    if (hindiRegex.test(text)) return "Hindi";

    return "English";
  }
}
