"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { LoadingSequence } from "./LoadingSequence";
import { ResultCard } from "./ResultCard";
import { cn } from "@/lib/utils";

// Steps: 1 (Name), 2 (Shape), 3 (Theme), 4 (Colors), 5 (Elements), 6 (Confirmation)
type Step = 1 | 2 | 3 | 4 | 5 | 6;

const shapes = [
  { id: "Initial Letter", label: "Initial Letter", desc: "A letter pendant" },
  { id: "Full Name Plate", label: "Full Name Plate", desc: "Elegant nameplate" },
  { id: "Circular", label: "Circular", desc: "Classic round tag" },
  { id: "Oval", label: "Oval", desc: "Soft curved tag" },
  { id: "Rectangle", label: "Rectangle", desc: "Modern rectangle" },
  { id: "Heart", label: "Heart", desc: "Romantic heart tag" },
  { id: "Hexagon", label: "Hexagon", desc: "Geometric hexagon" },
  { id: "Custom", label: "Custom", desc: "Tailored to your ideas" },
];

const themes = [
  { id: "Luxury", label: "Luxury", desc: "Elegant & refined" },
  { id: "Cute", label: "Cute", desc: "Playful & lovely" },
  { id: "Romantic", label: "Romantic", desc: "Soft & emotional" },
  { id: "Minimal", label: "Minimal", desc: "Clean & simple" },
  { id: "Ocean", label: "Ocean", desc: "Sea & beach depth" },
  { id: "Pastel", label: "Pastel", desc: "Gentle pastel tones" },
  { id: "Floral", label: "Floral", desc: "Embedded flower look" },
  { id: "Marble", label: "Marble", desc: "Swirls & stone veins" },
  { id: "Arabic Calligraphy", label: "Arabic Calligraphy", desc: "Traditional script" },
  { id: "Surprise Me ✨", label: "Surprise Me ✨", desc: "Let AI design it" },
];

const colors = [
  { id: "Auto", label: "Auto (Intelligent)", desc: "AI matching theme" },
  { id: "Luxury Gold", label: "Luxury Gold", desc: "Ivory, gold & cream" },
  { id: "Pastel", label: "Pastel Mix", desc: "Pink, blue & lilac" },
  { id: "Ocean", label: "Ocean Blue", desc: "Aqua, turquoise & white" },
  { id: "Black & Gold", label: "Black & Gold", desc: "Classic luxury finish" },
  { id: "Emerald", label: "Emerald Green", desc: "Deep rich green tones" },
  { id: "Lavender", label: "Lavender", desc: "Dreamy violet shades" },
  { id: "Rose", label: "Rose Petal", desc: "Blush pink & gold accents" },
  { id: "Custom", label: "Custom Note", desc: "I will specify later" },
];

const elements = [
  { id: "Gold Flakes", label: "Gold Flakes", desc: "Luxury foil accents" },
  { id: "Silver Flakes", label: "Silver Flakes", desc: "Clean metallic sparks" },
  { id: "Flowers", label: "Pressed Flowers", desc: "Preserved botanicals" },
  { id: "Butterflies", label: "Butterflies", desc: "Mini butterfly inserts" },
  { id: "Stars", label: "Stars & Glitter", desc: "Subtle cosmic shimmer" },
  { id: "Pearl Pigments", label: "Pearl Pigment", desc: "Swirling pearlescent sheen" },
  { id: "Marble Swirls", label: "Marble Swirls", desc: "Classic ink veins" },
  { id: "Ocean Waves", label: "Ocean Waves", desc: "Realistic 3D wave layers" },
  { id: "Smoke Effect", label: "Smoke Effect", desc: "Ethereal translucent flows" },
  { id: "Auto", label: "Auto (AI Choice)", desc: "AI matching elements" },
];

export function PreviewWizard() {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [shape, setShape] = useState("Initial Letter");
  const [theme, setTheme] = useState("Luxury");
  const [colorPalette, setColorPalette] = useState("Auto");
  const [element, setElement] = useState("Auto");
  
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isFallbackImage, setIsFallbackImage] = useState(false);
  
  const reduce = useReducedMotion();

  const handleNext = () => {
    if (step === 1 && !name.trim()) return;
    setStep((prev) => (prev + 1) as Step);
  };

  const handleBack = () => {
    setStep((prev) => (prev - 1) as Step);
  };

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

  const handleGenerate = async () => {
    setLoading(true);
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, shape, theme, colors: colorPalette, elements: element }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.url) {
        setResultImage(data.url);
        setGeneratedPrompt(data.prompt || "");
        setIsFallbackImage(!!data.fallback);
      } else {
        // Construct client-side fallback prompt
        const clientPrompt = `High-end handcrafted resin keychain, shape: ${shape}, theme: ${theme}, color palette: ${colorPalette}, elements: ${element}. Personalization text displays "${name}" in a premium font layout, embedded with gold foil flakes in high-clarity polished crystalline resin. Luxury product photography.`;
        setResultImage(getRandomFallbackImage());
        setGeneratedPrompt(clientPrompt);
        setIsFallbackImage(true);
      }
    } catch {
      const clientPrompt = `High-end handcrafted resin keychain, shape: ${shape}, theme: ${theme}, color palette: ${colorPalette}, elements: ${element}. Personalization text displays "${name}" in a premium font layout, embedded with gold foil flakes in high-clarity polished crystalline resin. Luxury product photography.`;
      setResultImage(getRandomFallbackImage());
      setGeneratedPrompt(clientPrompt);
      setIsFallbackImage(true);
    }
  };

  const handleReset = () => {
    setName("");
    setShape("Initial Letter");
    setTheme("Luxury");
    setColorPalette("Auto");
    setElement("Auto");
    setResultImage(null);
    setGeneratedPrompt("");
    setIsFallbackImage(false);
    setLoading(false);
    setStep(1);
  };

  if (resultImage) {
    return (
      <div className="pt-24 pb-20">
        <div className="section-inner px-6 lg:px-10">
          <ResultCard
            name={name}
            shape={shape}
            theme={theme}
            colors={colorPalette}
            elements={element}
            imageUrl={resultImage}
            prompt={generatedPrompt}
            isFallback={isFallbackImage}
            onReset={handleReset}
          />
        </div>
      </div>
    );
  }

  // Wizard Card Slide Variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="pt-24 pb-20 min-h-[90dvh] flex items-center justify-center bg-ivory">
      {loading && !resultImage && <LoadingSequence />}
      <div className="w-full max-w-3xl px-6">
        {/* Progress header */}
        <div className="mb-10 text-center">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            Step {step} of 6
          </span>
          <div className="w-full h-[2px] bg-border/40 mt-3 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-soft-gold"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 6) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Form area */}
        <div className="relative min-h-[400px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {step === 1 && (
              <motion.div
                key="step1"
                variants={reduce ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
                    What is your name?
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    This will be display text/initials context inside the resin pendant.
                  </p>
                </div>
                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-center p-4 text-xl border-b border-border/80 focus:border-soft-gold outline-none transition-colors bg-transparent uppercase font-heading tracking-wide placeholder:text-muted/40"
                    onKeyDown={(e) => e.key === "Enter" && handleNext()}
                    autoFocus
                  />
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={handleNext}
                      disabled={!name.trim()}
                      className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={reduce ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
                    Choose Your Shape
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Select the foundational layout pendant.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {shapes.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setShape(item.id)}
                      className={cn(
                        "p-4 rounded-xl border text-center transition-all duration-300 relative group flex flex-col justify-center items-center gap-1",
                        shape === item.id
                          ? "border-soft-gold bg-soft-gold/5 shadow-sm"
                          : "border-border/50 bg-surface hover:border-soft-gold/30 hover:-translate-y-0.5"
                      )}
                    >
                      {shape === item.id && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-soft-gold flex items-center justify-center text-pearl-white">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                      <span className="text-sm font-semibold">{item.label}</span>
                      <span className="text-[10px] text-muted-foreground">{item.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button onClick={handleBack} className="btn-secondary !py-2 !px-4 !text-xs">
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button onClick={handleNext} className="btn-gold !py-2 !px-4 !text-xs">
                    Next <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={reduce ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
                    Choose Your Theme
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    This sets the overall artistic design direction.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {themes.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTheme(item.id)}
                      className={cn(
                        "p-4 rounded-xl border text-center transition-all duration-300 relative group flex flex-col justify-center items-center gap-1",
                        theme === item.id
                          ? "border-soft-gold bg-soft-gold/5 shadow-sm"
                          : "border-border/50 bg-surface hover:border-soft-gold/30 hover:-translate-y-0.5"
                      )}
                    >
                      {theme === item.id && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-soft-gold flex items-center justify-center text-pearl-white">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                      <span className="text-sm font-semibold">{item.label}</span>
                      <span className="text-[9px] text-muted-foreground leading-tight">{item.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button onClick={handleBack} className="btn-secondary !py-2 !px-4 !text-xs">
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button onClick={handleNext} className="btn-gold !py-2 !px-4 !text-xs">
                    Next <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={reduce ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
                    Color Preference
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Select your preferred color palette.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {colors.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setColorPalette(item.id)}
                      className={cn(
                        "p-4 rounded-xl border text-center transition-all duration-300 relative group flex flex-col justify-center items-center gap-1",
                        colorPalette === item.id
                          ? "border-soft-gold bg-soft-gold/5 shadow-sm"
                          : "border-border/50 bg-surface hover:border-soft-gold/30 hover:-translate-y-0.5"
                      )}
                    >
                      {colorPalette === item.id && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-soft-gold flex items-center justify-center text-pearl-white">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                      <span className="text-sm font-semibold">{item.label}</span>
                      <span className="text-[10px] text-muted-foreground">{item.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button onClick={handleBack} className="btn-secondary !py-2 !px-4 !text-xs">
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button onClick={handleNext} className="btn-gold !py-2 !px-4 !text-xs">
                    Next <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                variants={reduce ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
                    Decorative Elements
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Select embellishments to embed in the resin.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {elements.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setElement(item.id)}
                      className={cn(
                        "p-4 rounded-xl border text-center transition-all duration-300 relative group flex flex-col justify-center items-center gap-1",
                        element === item.id
                          ? "border-soft-gold bg-soft-gold/5 shadow-sm"
                          : "border-border/50 bg-surface hover:border-soft-gold/30 hover:-translate-y-0.5"
                      )}
                    >
                      {element === item.id && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-soft-gold flex items-center justify-center text-pearl-white">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                      <span className="text-sm font-semibold">{item.label}</span>
                      <span className="text-[9px] text-muted-foreground leading-tight">{item.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button onClick={handleBack} className="btn-secondary !py-2 !px-4 !text-xs">
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button onClick={handleNext} className="btn-gold !py-2 !px-4 !text-xs">
                    Next <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                variants={reduce ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6 max-w-md mx-auto"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
                    Confirm Your Design
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Review your choices before rendering.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-surface border border-border/60 shadow-sm space-y-4">
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Name
                    </span>
                    <span className="text-sm font-semibold">{name}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Shape
                    </span>
                    <span className="text-sm font-semibold">{shape}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Theme
                    </span>
                    <span className="text-sm font-semibold">{theme}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Colors
                    </span>
                    <span className="text-sm font-semibold">{colorPalette}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Elements
                    </span>
                    <span className="text-sm font-semibold">{element}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button onClick={handleBack} className="btn-secondary !py-2 !px-4 !text-xs">
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button onClick={handleGenerate} className="btn-gold flex items-center gap-2">
                    <Sparkles size={16} />
                    Generate My Preview
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
