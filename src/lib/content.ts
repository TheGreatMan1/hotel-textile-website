import catalog from "@/content/catalog.json";
import contact from "@/content/contact.json";
import footer from "@/content/footer.json";
import gallery from "@/content/gallery.json";
import interactiveBedEn from "@/content/interactive-bed.en.json";
import interactiveBedGe from "@/content/interactive-bed.ge.json";
import map from "@/content/map.json";
import processEn from "@/content/process.en.json";
import processGe from "@/content/process.ge.json";
import productsEn from "@/content/products.en.json";
import productsGe from "@/content/products.ge.json";
import quoteForm from "@/content/quote-form.json";
import siteEn from "@/content/site.en.json";
import siteGe from "@/content/site.ge.json";
import type {
  CatalogContent,
  ContactContent,
  FooterContent,
  GalleryContent,
  InteractiveBedContent,
  Language,
  MapContent,
  ProcessContent,
  ProductsContent,
  QuoteFormContent,
  SectionKey,
  SiteContent,
  WebsiteContent
} from "./types";

export const languages: Language[] = ["en", "ge"];

export const websiteContent: WebsiteContent = {
  site: {
    en: siteEn as SiteContent,
    ge: siteGe as SiteContent
  },
  products: {
    en: productsEn as ProductsContent,
    ge: productsGe as ProductsContent
  },
  interactiveBed: {
    en: interactiveBedEn as InteractiveBedContent,
    ge: interactiveBedGe as InteractiveBedContent
  },
  process: {
    en: processEn as ProcessContent,
    ge: processGe as ProcessContent
  },
  gallery: gallery as GalleryContent,
  catalog: catalog as CatalogContent,
  map: map as MapContent,
  quoteForm: quoteForm as QuoteFormContent,
  contact: contact as ContactContent,
  footer: footer as FooterContent
};

export function localized<T extends Record<Language, string>>(
  value: T,
  language: Language
) {
  return value[language] || value.en;
}

export function getSectionVisibility(
  content: WebsiteContent,
  language: Language
): Record<SectionKey, boolean> {
  return {
    hero: content.site[language].hero.isVisible,
    interactiveBed: content.interactiveBed[language].isVisible,
    products: content.products[language].isVisible,
    whyChooseUs: content.site[language].whyChooseUs.isVisible,
    about: content.site[language].about.isVisible,
    gallery: content.gallery.isVisible,
    catalog: content.catalog.isVisible,
    process: content.process[language].isVisible,
    map: content.map.isVisible,
    quoteForm: content.quoteForm.isVisible,
    contact: content.contact.isVisible
  };
}
