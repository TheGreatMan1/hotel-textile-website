"use client";

import type { BedHotspotContent, InteractiveBedContent } from "@/lib/types";
import { trackMetaEvent } from "@/lib/metaPixel";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import BedHotspot from "./BedHotspot";
import BedProductPanel from "./BedProductPanel";
import SectionWrapper from "./SectionWrapper";

type InteractiveBedExplorerProps = {
  content: InteractiveBedContent;
};

export default function InteractiveBedExplorer({
  content
}: InteractiveBedExplorerProps) {
  const reduceMotion = useReducedMotion();
  const [activeHotspot, setActiveHotspot] = useState<BedHotspotContent | null>(
    null
  );
  const visibleHotspots = useMemo(
    () => content.hotspots.filter((hotspot) => hotspot.isVisible),
    [content.hotspots]
  );

  if (!content.isVisible || visibleHotspots.length === 0) return null;

  function handleHotspotSelect(hotspot: BedHotspotContent) {
    setActiveHotspot(hotspot);
    trackMetaEvent("BedHotspotClick", {
      content_name: hotspot.title,
      content_category: hotspot.category,
      linked_product_slug: hotspot.linkedProductSlug
    });
  }

  return (
    <SectionWrapper
      id="interactive-bed"
      className="relative overflow-hidden bg-white dark:bg-stone-950"
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-champagne/20 to-transparent dark:from-champagne/8"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.45, 0.75, 0.45] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-shell relative">
        <div className="max-w-3xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-copy">{content.subtitle}</p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_19rem] lg:items-stretch">
          <div className="relative rounded-lg border border-stone-200 bg-white p-2 shadow-[0_18px_55px_rgba(28,26,23,0.10)] dark:border-stone-800 dark:bg-ink">
            <div className="relative h-full overflow-hidden rounded-md">
              <img
                src={content.bedImage || "/placeholders/interactive-bed.svg"}
                alt={content.bedImageAlt}
                onError={(event) => {
                  if (!event.currentTarget.src.endsWith("/placeholders/interactive-bed.svg")) {
                    event.currentTarget.src = "/placeholders/interactive-bed.svg";
                  }
                }}
                className="aspect-[16/10] h-full w-full object-cover"
              />
              {visibleHotspots.map((hotspot) => (
                <BedHotspot
                  key={hotspot.id}
                  hotspot={hotspot}
                  isActive={activeHotspot?.id === hotspot.id}
                  onSelect={handleHotspotSelect}
                />
              ))}
            </div>
          </div>

          <div className="lux-card p-4">
            <h3 className="font-serif text-2xl font-semibold leading-tight text-charcoal dark:text-ivory">
              {content.mobileListTitle}
            </h3>
            <p className="mt-2 text-xs leading-5 text-stone-600 dark:text-stone-400">
              {content.subtitle}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {visibleHotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => handleHotspotSelect(hotspot)}
                  className="group flex items-center justify-between gap-3 rounded-md border border-stone-200 bg-white px-3 py-2.5 text-left transition hover:-translate-y-0.5 hover:border-brass hover:shadow-soft dark:border-stone-800 dark:bg-stone-950 dark:hover:border-champagne"
                >
                  <span>
                    <span className="block text-xs font-bold text-charcoal dark:text-ivory">
                      {hotspot.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-4 text-stone-500 dark:text-stone-400">
                      {hotspot.category}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="text-brass transition group-hover:translate-x-1 dark:text-champagne"
                    size={16}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeHotspot ? (
          <BedProductPanel
            key={activeHotspot.id}
            hotspot={activeHotspot}
            content={content}
            onClose={() => setActiveHotspot(null)}
          />
        ) : null}
      </AnimatePresence>
    </SectionWrapper>
  );
}
