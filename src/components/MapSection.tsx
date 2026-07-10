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
    <SectionWrapper
      id="location"
      className="border-b border-stone-200 bg-mist dark:border-stone-800 dark:bg-[#202020]"
    >
      <div className="container-shell grid gap-0 border border-stone-200 bg-white dark:border-stone-800 dark:bg-[#181818] lg:grid-cols-[0.7fr_1.3fr] lg:items-stretch">
        <div className="p-6 sm:p-8 lg:p-10">
          <p className="eyebrow">{localized(map.eyebrow, language)}</p>
          <h2 className="section-title">{localized(map.title, language)}</h2>
          <p className="mt-5 flex gap-3 text-sm font-light leading-6 text-stone-600 dark:text-stone-300">
            <MapPin
              aria-hidden
              className="mt-1 shrink-0 text-peach dark:text-[#ebb49a]"
            />
            <span>{localized(map.address, language)}</span>
          </p>
          {hasExternalLink ? (
            <a
              href={map.externalLink}
              target="_blank"
              rel="noreferrer"
              className="secondary-button mt-4"
            >
              {localized(map.buttonText, language)}
            </a>
          ) : null}
        </div>

        {hasEmbed ? (
          <div className="min-h-[260px] overflow-hidden border-t border-stone-200 dark:border-stone-800 lg:border-l lg:border-t-0">
            <iframe
              src={map.embedUrl}
              title={localized(map.title, language)}
              className="h-[280px] w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
