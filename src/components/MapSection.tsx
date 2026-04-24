import { localized } from "@/lib/content";
import type { Language, MapContent } from "@/lib/types";
import { MapPin } from "lucide-react";

type MapSectionProps = {
  map: MapContent;
  language: Language;
};

export default function MapSection({ map, language }: MapSectionProps) {
  if (!map.isVisible) return null;

  const hasEmbed = Boolean(map.embedUrl?.trim());
  const hasExternalLink = Boolean(map.externalLink?.trim());

  return (
    <section id="location" className="section-padding bg-smoke dark:bg-ink">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="eyebrow">{language === "en" ? "Location" : "მისამართი"}</p>
          <h2 className="section-title">{localized(map.title, language)}</h2>
          <p className="mt-5 flex gap-3 text-lg leading-8 text-stone-700 dark:text-stone-300">
            <MapPin aria-hidden className="mt-1 shrink-0 text-brass dark:text-champagne" />
            <span>{localized(map.address, language)}</span>
          </p>
          {hasExternalLink ? (
            <a
              href={map.externalLink}
              target="_blank"
              rel="noreferrer"
              className="secondary-button mt-7"
            >
              {localized(map.buttonText, language)}
            </a>
          ) : null}
        </div>

        {hasEmbed ? (
          <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-soft dark:border-stone-800">
            <iframe
              src={map.embedUrl}
              title={localized(map.title, language)}
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
