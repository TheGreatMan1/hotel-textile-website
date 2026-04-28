"use client";

import type { BedHotspotContent } from "@/lib/types";
import { motion, useReducedMotion } from "framer-motion";

type BedHotspotProps = {
  hotspot: BedHotspotContent;
  isActive: boolean;
  onSelect: (hotspot: BedHotspotContent) => void;
};

export default function BedHotspot({
  hotspot,
  isActive,
  onSelect
}: BedHotspotProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={hotspot.title}
      title={hotspot.label}
      onClick={() => onSelect(hotspot)}
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/80 bg-charcoal/90 px-3 py-2 text-xs font-bold text-ivory shadow-glow outline-none backdrop-blur transition hover:bg-brass focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-ivory dark:bg-ivory/90 dark:text-ink dark:hover:bg-champagne dark:focus:ring-offset-ink"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      animate={
        reduceMotion ? undefined : { scale: isActive ? 1.08 : [1, 1.08, 1] }
      }
      transition={{ duration: 2.2, repeat: isActive ? 0 : Infinity }}
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-60" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-champagne" />
      </span>
      <span className="hidden sm:inline">{hotspot.label}</span>
    </motion.button>
  );
}
