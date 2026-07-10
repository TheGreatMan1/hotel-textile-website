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
    <section
      id="catalog"
      className="border-b border-stone-200 bg-peach-soft/55 py-12 text-graphite transition-colors dark:border-stone-800 dark:bg-[#302521] dark:text-white sm:py-14"
    >
      <div className="container-shell">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow">{localized(catalog.eyebrow, language)}</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-light leading-tight">
              {localized(catalog.title, language)}
            </h2>
            <p className="mt-3 max-w-xl text-sm font-light leading-6 text-stone-600 dark:text-stone-300">
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
            <p className="border border-stone-400 px-5 py-3 text-sm text-stone-600 dark:border-stone-600 dark:text-stone-300">
              {localized(catalog.noFileText, language)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
