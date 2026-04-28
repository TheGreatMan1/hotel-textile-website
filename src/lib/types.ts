export type Language = "en" | "ge";

export type LocalizedText = {
  en: string;
  ge: string;
};

export type NavLink = {
  label: string;
  href: string;
  sectionKey: SectionKey;
};

export type SectionKey =
  | "hero"
  | "interactiveBed"
  | "products"
  | "whyChooseUs"
  | "about"
  | "gallery"
  | "catalog"
  | "process"
  | "map"
  | "contact";

export type Feature = {
  title: string;
  description: string;
  icon?: string;
  isVisible: boolean;
  sortOrder: number;
};

export type SiteContent = {
  brandName: string;
  tagline: string;
  navLinks: NavLink[];
  hero: {
    isVisible: boolean;
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    image: string;
    imageAlt: string;
    stats: Feature[];
  };
  whyChooseUs: {
    isVisible: boolean;
    eyebrow: string;
    title: string;
    subtitle: string;
    features: Feature[];
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
  material?: string;
  availableSizes?: string[];
  colorOptions?: string[];
  isVisible: boolean;
  sortOrder: number;
};

export type ProductsContent = {
  isVisible: boolean;
  eyebrow: string;
  title: string;
  description: string;
  materialLabel: string;
  sizesLabel: string;
  colorsLabel: string;
  items: Product[];
};

export type MaterialVariant = {
  id: string;
  label: string;
  isVisible: boolean;
  description: string;
  image: string;
  imageAlt: string;
  sizes?: string[];
  colors?: string[];
};

export type BedHotspotContent = {
  id: string;
  title: string;
  label: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  x: number;
  y: number;
  isVisible: boolean;
  linkedProductSlug?: string;
  materialVariants: MaterialVariant[];
};

export type InteractiveBedContent = {
  isVisible: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
  bedImage: string;
  bedImageAlt: string;
  viewProductText: string;
  contactText: string;
  closeText: string;
  materialsLabel: string;
  sizesLabel: string;
  colorsLabel: string;
  mobileListTitle: string;
  hotspots: BedHotspotContent[];
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
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  buttonText: LocalizedText;
  noFileText: LocalizedText;
  pdfFile?: string;
};

export type ProcessStep = {
  title: string;
  description: string;
  icon?: string;
  isVisible: boolean;
  sortOrder: number;
};

export type ProcessContent = {
  isVisible: boolean;
  eyebrow: string;
  title: string;
  description: string;
  steps: ProcessStep[];
};

export type MapContent = {
  isVisible: boolean;
  eyebrow: LocalizedText;
  title: LocalizedText;
  address: LocalizedText;
  embedUrl?: string;
  buttonText: LocalizedText;
  externalLink?: string;
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
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  methods: ContactMethod[];
};

export type FooterContent = {
  isVisible: boolean;
  tagline: LocalizedText;
  copyright: LocalizedText;
  socialTitle: LocalizedText;
};

export type WebsiteContent = {
  site: Record<Language, SiteContent>;
  products: Record<Language, ProductsContent>;
  interactiveBed: Record<Language, InteractiveBedContent>;
  process: Record<Language, ProcessContent>;
  gallery: GalleryContent;
  catalog: CatalogContent;
  map: MapContent;
  contact: ContactContent;
  footer: FooterContent;
};
