"use client";

import { iconMap } from "@/lib/icons";
import type { SiteContent } from "@/lib/types";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type HeroSectionProps = {
  hero: SiteContent["hero"];
};

export default function HeroSection({ hero }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();

  if (!hero.isVisible) return null;

  const stats = hero.stats
    .filter((stat) => stat.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const highlightedPhrase = "Hospitality Businesses";
  const titleParts = hero.title.includes(highlightedPhrase)
    ? hero.title.split(highlightedPhrase)
    : null;

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white transition-colors dark:bg-ink"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.16] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 0%, rgba(164,127,54,0.28) 42%, transparent 68%), repeating-linear-gradient(90deg, rgba(164,127,54,0.18) 0 1px, transparent 1px 82px)"
        }}
        animate={reduceMotion ? undefined : { backgroundPosition: ["0px 0px", "80px 0px"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      <div className="container-shell relative grid min-h-[480px] items-center gap-5 py-6 sm:min-h-[520px] lg:min-h-[540px] lg:grid-cols-[0.66fr_1.34fr] lg:py-7">
        <motion.div
          className="relative z-10 max-w-2xl lg:pr-2"
          initial={reduceMotion ? false : { opacity: 0, y: 34 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-2.5 font-serif text-4xl font-semibold leading-[1] text-charcoal dark:text-ivory sm:text-5xl lg:text-5xl xl:text-6xl">
            {titleParts ? (
              <>
                {titleParts[0]}
                <span className="text-brass dark:text-champagne">
                  {highlightedPhrase}
                </span>
                {titleParts[1]}
              </>
            ) : (
              hero.title
            )}
          </h1>
          <p className="mt-3.5 max-w-lg text-[13px] leading-5 text-stone-700 dark:text-stone-300 sm:text-sm sm:leading-6">
            {hero.subtitle}
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <a href={hero.primaryButtonLink || "#products"} className="primary-button">
              {hero.primaryButtonText}
              <ArrowRight aria-hidden className="ml-2" size={17} />
            </a>
            <a href={hero.secondaryButtonLink || "#interactive-bed"} className="secondary-button">
              {hero.secondaryButtonText}
            </a>
          </div>
          {stats.length > 0 ? (
            <div className="mt-5 grid gap-2.5 sm:grid-cols-3 lg:hidden">
              {stats.map((stat) => {
                const Icon = iconMap[stat.icon as keyof typeof iconMap] || iconMap.Sparkles;
                return (
                  <div
                    key={stat.title}
                    className="lux-card p-2.5"
                  >
                    <Icon className="mb-2 text-brass dark:text-champagne" size={16} />
                    <p className="font-serif text-sm font-semibold text-charcoal dark:text-ivory">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-4 text-stone-600 dark:text-stone-400">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </motion.div>

        <motion.div
          className="relative"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={hero.image || "/placeholders/hero.svg"}
            alt={hero.imageAlt}
            className="relative aspect-[4/3] w-full rounded-lg border border-stone-200/70 object-cover shadow-[0_18px_52px_rgba(28,26,23,0.12)] dark:border-stone-800 dark:shadow-glow lg:min-h-[410px] xl:min-h-[460px]"
          />
          {stats.length > 0 ? (
            <div className="absolute bottom-3 left-3 right-3 hidden grid-cols-3 gap-2 lg:grid">
              {stats.map((stat) => {
                const Icon = iconMap[stat.icon as keyof typeof iconMap] || iconMap.Sparkles;
                return (
                  <div
                    key={stat.title}
                    className="rounded-lg border border-white/80 bg-white/88 p-2.5 shadow-[0_10px_24px_rgba(28,26,23,0.09)] backdrop-blur-md dark:border-stone-700 dark:bg-ink/82"
                  >
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-brass/35 text-brass dark:border-champagne/35 dark:text-champagne">
                      <Icon aria-hidden size={15} />
                    </div>
                    <p className="font-serif text-sm font-semibold leading-tight text-charcoal dark:text-ivory">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-4 text-stone-600 dark:text-stone-300">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
