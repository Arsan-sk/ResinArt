import type { Metadata } from "next";
import { PreviewStudio } from "@/components/preview/PreviewStudio";

export const metadata: Metadata = {
  title: "Your Resin Preview Studio",
  description: "Visualize your personalized resin keychain before placing an order. Customize name, shapes, colors, and embedded decorations.",
};

export default function PreviewPage() {
  return <PreviewStudio />;
}
