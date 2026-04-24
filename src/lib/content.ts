import catalog from "@/content/catalog.json";
import contact from "@/content/contact.json";
import gallery from "@/content/gallery.json";
import map from "@/content/map.json";
import productsEn from "@/content/products.en.json";
import productsGe from "@/content/products.ge.json";
import siteEn from "@/content/site.en.json";
import siteGe from "@/content/site.ge.json";
import type {
  CatalogContent,
  ContactContent,
  GalleryContent,
  Language,
  MapContent,
  ProductsContent,
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
  gallery: gallery as GalleryContent,
  catalog: catalog as CatalogContent,
  map: map as MapContent,
  contact: contact as ContactContent
};

export function localized<T extends Record<Language, string>>(
  value: T,
  language: Language
) {
  return value[language] || value.en;
}
