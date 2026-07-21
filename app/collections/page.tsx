import type { Metadata } from "next";
import { CollectionsList } from "@/components/collections/CollectionsList";

export const metadata: Metadata = {
  title: "The Resin Collections",
  description: "Browse our handcrafted collections including Initial, Couple, Friendship, Wedding, Arabic Calligraphy, and Luxury themes.",
};

export default function CollectionsPage() {
  return <CollectionsList />;
}
