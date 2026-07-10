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
      className="relative overflow-hidden border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-[#161616]"
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-peach-soft/45 to-transparent dark:from-[#3b2b25]/40"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.45, 0.75, 0.45] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-copy mx-auto">{content.subtitle}</p>
        </div>

        <div className="mt-8 grid border border-stone-200 bg-white dark:border-stone-800 dark:bg-[#1b1b1b] lg:grid-cols-[1fr_18rem] lg:items-stretch">
          <div className="relative min-h-0 border-b border-stone-200 dark:border-stone-800 lg:border-b-0 lg:border-r">
            <div className="relative h-full overflow-hidden">
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

          <div className="p-5 sm:p-6">
            <p className="eyebrow">{content.eyebrow}</p>
            <h3 className="mt-2 text-xl font-light leading-tight text-graphite dark:text-white">
              {content.mobileListTitle}
            </h3>
            <p className="mt-3 text-xs font-light leading-5 text-stone-500 dark:text-stone-400">
              {content.subtitle}
            </p>
            <div className="mt-5 divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
              {visibleHotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => handleHotspotSelect(hotspot)}
                  className="group flex w-full items-center justify-between gap-3 py-3 text-left transition hover:pl-1"
                >
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.09em] text-graphite transition group-hover:text-peach dark:text-white dark:group-hover:text-[#ebb49a]">
                      {hotspot.label}
                    </span>
                    <span className="mt-1 block text-[10px] font-light leading-4 text-stone-500 dark:text-stone-400">
                      {hotspot.category}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="text-peach transition group-hover:translate-x-1 dark:text-[#ebb49a]"
                    size={14}
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
