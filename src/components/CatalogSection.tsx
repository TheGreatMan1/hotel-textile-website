import { localized } from "@/lib/content";
import type { CatalogContent, Language } from "@/lib/types";
import { Download } from "lucide-react";

type CatalogSectionProps = {
  catalog: CatalogContent;
  language: Language;
};

export default function CatalogSection({
  catalog,
  language
}: CatalogSectionProps) {
  if (!catalog.isVisible) return null;

  const hasPdf = Boolean(catalog.pdfFile?.trim());

  return (
    <section id="catalog" className="bg-charcoal py-16 text-ivory dark:bg-black sm:py-20">
      <div className="container-shell">
        <div className="grid gap-8 rounded-2xl border border-champagne/25 bg-white/5 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow">{language === "en" ? "Catalog" : "კატალოგი"}</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              {localized(catalog.title, language)}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              {localized(catalog.description, language)}
            </p>
          </div>
          {hasPdf ? (
            <a
              href={catalog.pdfFile}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-champagne px-6 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-linen focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-charcoal"
              download
            >
              <Download aria-hidden className="mr-2" size={18} />
              {localized(catalog.buttonText, language)}
            </a>
          ) : (
            <p className="rounded-full border border-stone-700 px-5 py-3 text-sm text-stone-300">
              {localized(catalog.noFileText, language)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
