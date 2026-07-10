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
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 border border-white/80 bg-graphite/90 py-1 pl-1 pr-2 text-[9px] font-medium uppercase tracking-[0.07em] text-white shadow-[0_5px_16px_rgba(17,16,15,0.20)] outline-none backdrop-blur transition hover:bg-peach focus:ring-2 focus:ring-peach focus:ring-offset-2 focus:ring-offset-white dark:bg-black/85 dark:hover:bg-[#d99677] dark:focus:ring-offset-[#161616]"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      animate={
        reduceMotion ? undefined : { scale: isActive ? 1.08 : [1, 1.08, 1] }
      }
      transition={{ duration: 2.2, repeat: isActive ? 0 : Infinity }}
    >
      <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-peach text-[10px] leading-none text-white dark:bg-[#d99677]">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-peach opacity-35" />
        <span className="relative -mt-0.5">+</span>
      </span>
      <span className="hidden sm:inline">{hotspot.label}</span>
    </motion.button>
  );
}
