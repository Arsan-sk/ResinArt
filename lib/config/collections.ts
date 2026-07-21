/**
 * Collection metadata for Zainy Resin Art.
 * Each collection has its own identity, colors, and presentation
 * while remaining inside one cohesive design system.
 */

export interface Collection {
  name: string;
  slug: string;
  description: string;
  accentColor: string;
  accentColorLight: string;
  folder: string;
  featured: boolean;
  imageCount: number;
}

export const collections: Collection[] = [
  {
    name: "Initial Collection",
    slug: "initials",
    description: "Your letter, your identity — cast in premium resin.",
    accentColor: "#C5A880",
    accentColorLight: "#F5EDE0",
    folder: "initials",
    featured: true,
    imageCount: 1,
  },
  {
    name: "Couple Collection",
    slug: "couples",
    description: "Two names, one keepsake — handcrafted for love stories.",
    accentColor: "#D4848C",
    accentColorLight: "#FBEAEC",
    folder: "couples",
    featured: true,
    imageCount: 1,
  },
  {
    name: "Friendship Collection",
    slug: "friendship",
    description: "Carry your bond everywhere — made for kindred spirits.",
    accentColor: "#7BA7C2",
    accentColorLight: "#E8F1F7",
    folder: "friendship",
    featured: true,
    imageCount: 1,
  },
  {
    name: "Wedding Collection",
    slug: "wedding",
    description: "Elegant favors for your special day — each one unique.",
    accentColor: "#E8DCC8",
    accentColorLight: "#FAF7F2",
    folder: "wedding",
    featured: true,
    imageCount: 1,
  },
  {
    name: "Arabic Calligraphy",
    slug: "arabic-calligraphy",
    description: "Beautiful Arabic script preserved in handcrafted resin.",
    accentColor: "#2D6B4F",
    accentColorLight: "#E6F2EC",
    folder: "arabic-calligraphy",
    featured: true,
    imageCount: 1,
  },
  {
    name: "Luxury Collection",
    slug: "luxury",
    description: "Gold leaf, premium finishes — crafted for those who appreciate the finest.",
    accentColor: "#1A1A1A",
    accentColorLight: "#F0ECE4",
    folder: "luxury",
    featured: true,
    imageCount: 1,
  },
  {
    name: "Floral Collection",
    slug: "floral",
    description: "Preserved flowers forever captured in crystalline resin.",
    accentColor: "#B5838D",
    accentColorLight: "#F9EFF1",
    folder: "floral",
    featured: true,
    imageCount: 1,
  },
  {
    name: "Pastel Collection",
    slug: "pastel",
    description: "Soft tones, gentle beauty — dreamy keepsakes in pastel hues.",
    accentColor: "#B8A9C9",
    accentColorLight: "#F3EFF8",
    folder: "pastel",
    featured: true,
    imageCount: 1,
  },
  {
    name: "Ocean Collection",
    slug: "ocean",
    description: "Waves, depth, and sea — the ocean captured in your palm.",
    accentColor: "#4A9BAD",
    accentColorLight: "#E4F3F6",
    folder: "ocean",
    featured: false,
    imageCount: 1,
  },
  {
    name: "Minimal Collection",
    slug: "minimal",
    description: "Clean lines, pure elegance — beauty in simplicity.",
    accentColor: "#8C8C8C",
    accentColorLight: "#F2F2F2",
    folder: "minimal",
    featured: false,
    imageCount: 1,
  },
  {
    name: "Custom Collection",
    slug: "custom",
    description: "Your vision, our craft — fully personalized designs.",
    accentColor: "#C5A880",
    accentColorLight: "#F5EDE0",
    folder: "custom",
    featured: false,
    imageCount: 1,
  },
];

/** Get featured collections for homepage display */
export function getFeaturedCollections(): Collection[] {
  return collections.filter((c) => c.featured);
}

/** Get a single collection by slug */
export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

/**
 * Generate image paths for a collection.
 * Images follow the convention: /collections/{folder}/image-{n}.webp
 */
export function getCollectionImagePaths(
  folder: string,
  imageCount: number
): string[] {
  return Array.from({ length: imageCount }, (_, i) => 
    `/collections/${folder}/image-${i + 1}.webp`
  );
}

