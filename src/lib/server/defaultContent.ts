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
import settings from "@/content/settings.json";
import siteEn from "@/content/site.en.json";
import siteGe from "@/content/site.ge.json";
import type {
  CatalogContent,
  ContactContent,
  FooterContent,
  GalleryContent,
  InteractiveBedContent,
  MapContent,
  ProcessContent,
  ProductsContent,
  QuoteFormContent,
  SiteContent,
  WebsiteContent
} from "@/lib/types";

export const contentDocumentKeys = [
  "settings",
  "site.en",
  "site.ge",
  "products.en",
  "products.ge",
  "interactive-bed.en",
  "interactive-bed.ge",
  "gallery",
  "contact",
  "catalog",
  "map",
  "process.en",
  "process.ge",
  "quote-form",
  "footer"
] as const;

export type ContentDocumentKey = (typeof contentDocumentKeys)[number];

export const defaultContentDocuments: Record<ContentDocumentKey, unknown> = {
  settings,
  "site.en": siteEn,
  "site.ge": siteGe,
  "products.en": productsEn,
  "products.ge": productsGe,
  "interactive-bed.en": interactiveBedEn,
  "interactive-bed.ge": interactiveBedGe,
  gallery,
  contact,
  catalog,
  map,
  "process.en": processEn,
  "process.ge": processGe,
  "quote-form": quoteForm,
  footer
};

export function assembleWebsiteContent(
  documents: Record<ContentDocumentKey, unknown>
): WebsiteContent {
  return {
    site: {
      en: documents["site.en"] as SiteContent,
      ge: documents["site.ge"] as SiteContent
    },
    products: {
      en: documents["products.en"] as ProductsContent,
      ge: documents["products.ge"] as ProductsContent
    },
    interactiveBed: {
      en: documents["interactive-bed.en"] as InteractiveBedContent,
      ge: documents["interactive-bed.ge"] as InteractiveBedContent
    },
    process: {
      en: documents["process.en"] as ProcessContent,
      ge: documents["process.ge"] as ProcessContent
    },
    gallery: documents.gallery as GalleryContent,
    catalog: documents.catalog as CatalogContent,
    map: documents.map as MapContent,
    quoteForm: documents["quote-form"] as QuoteFormContent,
    contact: documents.contact as ContactContent,
    footer: documents.footer as FooterContent
  };
}
