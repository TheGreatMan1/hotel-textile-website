export type Language = "en" | "ge";

export type LocalizedText = {
  en: string;
  ge: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Feature = {
  title: string;
  description: string;
};

export type SiteContent = {
  brandName: string;
  tagline: string;
  navLinks: NavLink[];
  hero: {
    isVisible: boolean;
    eyebrow: string;
    headline: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    image: string;
    imageAlt: string;
  };
  about: {
    isVisible: boolean;
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    features: Feature[];
  };
  footer: {
    tagline: string;
    copyright: string;
  };
};

export type Product = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  buttonText: string;
  buttonLink?: string;
  isVisible: boolean;
  sortOrder: number;
};

export type ProductsContent = {
  isVisible: boolean;
  eyebrow: string;
  title: string;
  description: string;
  items: Product[];
};

export type GalleryImage = {
  image: string;
  alt: string;
  caption: LocalizedText;
  isVisible: boolean;
  sortOrder: number;
};

export type GalleryContent = {
  isVisible: boolean;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  images: GalleryImage[];
};

export type CatalogContent = {
  isVisible: boolean;
  title: LocalizedText;
  description: LocalizedText;
  buttonText: LocalizedText;
  noFileText: LocalizedText;
  pdfFile: string;
};

export type MapContent = {
  isVisible: boolean;
  title: LocalizedText;
  address: LocalizedText;
  embedUrl: string;
  buttonText: LocalizedText;
  externalLink: string;
};

export type ContactMethodKey =
  | "phone"
  | "whatsapp"
  | "email"
  | "instagram"
  | "facebook";

export type ContactMethod = {
  key: ContactMethodKey;
  isVisible: boolean;
  label: LocalizedText;
  value: string;
  url: string;
};

export type ContactContent = {
  isVisible: boolean;
  title: LocalizedText;
  description: LocalizedText;
  methods: ContactMethod[];
};

export type WebsiteContent = {
  site: Record<Language, SiteContent>;
  products: Record<Language, ProductsContent>;
  gallery: GalleryContent;
  catalog: CatalogContent;
  map: MapContent;
  contact: ContactContent;
};
