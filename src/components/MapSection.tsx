import { localized } from "@/lib/content";
import type { Language, MapContent } from "@/lib/types";
import { MapPin } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

type MapSectionProps = {
  map: MapContent;
  language: Language;
};

export default function MapSection({ map, language }: MapSectionProps) {
  if (!map.isVisible) return null;

  const hasEmbed = Boolean(map.embedUrl?.trim());
  const hasExternalLink = Boolean(map.externalLink?.trim());

  return (
    <SectionWrapper id="location" className="bg-white dark:bg-ink">
      <div className="container-shell grid gap-5 lg:grid-cols-[0.65fr_1.35fr] lg:items-stretch">
        <div className="lux-card p-4 sm:p-5">
          <p className="eyebrow">{localized(map.eyebrow, language)}</p>
          <h2 className="section-title">{localized(map.title, language)}</h2>
          <p className="mt-4 flex gap-3 text-sm leading-6 text-stone-700 dark:text-stone-300">
            <MapPin
              aria-hidden
              className="mt-1 shrink-0 text-brass dark:text-champagne"
            />
            <span>{localized(map.address, language)}</span>
          </p>
          {hasExternalLink ? (
            <a
              href={map.externalLink}
              target="_blank"
              rel="noreferrer"
              className="secondary-button mt-5"
            >
              {localized(map.buttonText, language)}
            </a>
          ) : null}
        </div>

        {hasEmbed ? (
          <div className="overflow-hidden rounded-lg border border-stone-200 shadow-[0_18px_50px_rgba(28,26,23,0.08)] dark:border-stone-800">
            <iframe
              src={map.embedUrl}
              title={localized(map.title, language)}
              className="h-[300px] w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
