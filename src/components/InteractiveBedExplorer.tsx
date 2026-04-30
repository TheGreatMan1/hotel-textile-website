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
        className="absolute right-[-14rem] top-20 h-[30rem] w-[30rem] rounded-full bg-champagne/20 blur-3xl dark:bg-champagne/10"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, 24, 0], scale: [1, 1.04, 1] }
        }
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-copy mx-auto">{content.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div className="relative rounded-[1.5rem] border border-stone-200 bg-ivory p-3 shadow-soft dark:border-stone-800 dark:bg-ink">
            <div className="relative overflow-hidden rounded-[1.1rem]">
              <img
                src={content.bedImage || "/placeholders/interactive-bed.svg"}
                alt={content.bedImageAlt}
                className="aspect-[16/10] w-full object-cover"
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

          <div className="rounded-lg border border-stone-200 bg-ivory/80 p-5 shadow-sm dark:border-stone-800 dark:bg-ink/80">
            <h3 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">
              {content.mobileListTitle}
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {visibleHotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => handleHotspotSelect(hotspot)}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-brass hover:shadow-soft dark:border-stone-800 dark:bg-stone-950 dark:hover:border-champagne"
                >
                  <span>
                    <span className="block text-sm font-bold text-charcoal dark:text-ivory">
                      {hotspot.label}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-stone-500 dark:text-stone-400">
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
