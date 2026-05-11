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
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/75 bg-ink/88 py-1 pl-1 pr-2.5 text-[10px] font-bold text-ivory shadow-[0_10px_24px_rgba(17,16,15,0.28)] outline-none backdrop-blur transition hover:bg-brass focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-ivory dark:bg-ivory/90 dark:text-ink dark:hover:bg-champagne dark:focus:ring-offset-ink"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      animate={
        reduceMotion ? undefined : { scale: isActive ? 1.08 : [1, 1.08, 1] }
      }
      transition={{ duration: 2.2, repeat: isActive ? 0 : Infinity }}
    >
      <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-brass text-xs leading-none text-white dark:bg-champagne dark:text-ink">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-45" />
        <span className="relative -mt-0.5">+</span>
      </span>
      <span className="hidden sm:inline">{hotspot.label}</span>
    </motion.button>
  );
}
