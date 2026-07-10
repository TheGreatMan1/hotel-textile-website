"use client";

import type { SiteContent } from "@/lib/types";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type HeroSectionProps = {
  hero: SiteContent["hero"];
};

export default function HeroSection({ hero }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();

  if (!hero.isVisible) return null;

  return (
    <section
      id="hero"
      className="relative isolate min-h-[510px] overflow-hidden bg-graphite sm:min-h-[550px] lg:min-h-[590px]"
    >
      <motion.img
        src={hero.image || "/placeholders/hero.svg"}
        alt={hero.imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        initial={reduceMotion ? false : { scale: 1.035 }}
        animate={reduceMotion ? undefined : { scale: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        onError={(event) => {
          if (!event.currentTarget.src.endsWith("/placeholders/hero.svg")) {
            event.currentTarget.src = "/placeholders/hero.svg";
          }
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,23,22,0.80)_0%,rgba(24,23,22,0.57)_38%,rgba(24,23,22,0.15)_68%,rgba(24,23,22,0.05)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

      <div className="container-shell relative flex min-h-[510px] items-center py-12 sm:min-h-[550px] lg:min-h-[590px]">
        <motion.div
          className="max-w-xl text-white"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#f1c3ad]">
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-[13ch] text-[2.55rem] font-light leading-[1.04] tracking-[0.01em] sm:text-[3.25rem] lg:text-[4rem]">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-lg text-sm font-light leading-6 text-white/85 sm:text-[15px] sm:leading-7">
            {hero.subtitle}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={hero.primaryButtonLink || "#quote-form"}
              className="primary-button"
            >
              {hero.primaryButtonText}
              <ArrowRight aria-hidden className="ml-3" size={15} />
            </a>
            <a
              href={hero.secondaryButtonLink || "#products"}
              className="inline-flex min-h-11 items-center justify-center border border-white/70 px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white hover:text-graphite focus:outline-none focus:ring-2 focus:ring-white"
            >
              {hero.secondaryButtonText}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
