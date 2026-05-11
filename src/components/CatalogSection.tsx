"use client";

import { localized } from "@/lib/content";
import { trackMetaEvent } from "@/lib/metaPixel";
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
    <section id="catalog" className="bg-white py-8 text-charcoal dark:bg-ink dark:text-ivory sm:py-10 lg:py-12">
      <div className="container-shell">
        <div className="grid gap-4 rounded-lg border border-stone-200 bg-white p-4 shadow-[0_12px_30px_rgba(28,26,23,0.06)] dark:border-stone-800 dark:bg-stone-950 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow">{localized(catalog.eyebrow, language)}</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight sm:text-[1.8rem]">
              {localized(catalog.title, language)}
            </h2>
            <p className="mt-2.5 max-w-2xl text-[13px] leading-5 text-stone-700 dark:text-stone-300 sm:text-sm sm:leading-6">
              {localized(catalog.description, language)}
            </p>
          </div>
          {hasPdf ? (
            <a
              href={catalog.pdfFile}
              onClick={() =>
                trackMetaEvent("DownloadCatalog", {
                  language,
                  file: catalog.pdfFile
                })
              }
              className="primary-button"
              download
            >
              <Download aria-hidden className="mr-2" size={18} />
              {localized(catalog.buttonText, language)}
            </a>
          ) : (
            <p className="rounded-md border border-stone-300 px-5 py-3 text-sm text-stone-600 dark:border-stone-700 dark:text-stone-300">
              {localized(catalog.noFileText, language)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
