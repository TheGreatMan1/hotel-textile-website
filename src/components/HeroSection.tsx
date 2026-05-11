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
      className="relative overflow-hidden bg-[#f8f1e6] transition-colors dark:bg-ink"
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

      <div className="container-shell relative grid min-h-[560px] items-center gap-6 py-7 sm:min-h-[620px] lg:min-h-[650px] lg:grid-cols-[0.68fr_1.32fr] lg:py-8">
        <motion.div
          className="relative z-10 max-w-2xl lg:pr-2"
          initial={reduceMotion ? false : { opacity: 0, y: 34 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1] text-charcoal dark:text-ivory sm:text-5xl lg:text-6xl xl:text-7xl">
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
          <p className="mt-4 max-w-xl text-sm leading-6 text-stone-700 dark:text-stone-300 sm:text-base">
            {hero.subtitle}
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <a href={hero.primaryButtonLink || "#products"} className="primary-button">
              {hero.primaryButtonText}
              <ArrowRight aria-hidden className="ml-2" size={17} />
            </a>
            <a href={hero.secondaryButtonLink || "#interactive-bed"} className="secondary-button">
              {hero.secondaryButtonText}
            </a>
          </div>
          {stats.length > 0 ? (
            <div className="mt-6 grid gap-2.5 sm:grid-cols-3 lg:hidden">
              {stats.map((stat) => {
                const Icon = iconMap[stat.icon as keyof typeof iconMap] || iconMap.Sparkles;
                return (
                  <div
                    key={stat.title}
                    className="lux-card p-3"
                  >
                    <Icon className="mb-2 text-brass dark:text-champagne" size={18} />
                    <p className="font-serif text-base font-semibold text-charcoal dark:text-ivory">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-xs leading-4 text-stone-600 dark:text-stone-400">
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
            className="relative aspect-[4/3] w-full rounded-lg border border-stone-200/70 object-cover shadow-[0_20px_60px_rgba(28,26,23,0.14)] dark:border-stone-800 dark:shadow-glow lg:min-h-[500px] xl:min-h-[560px]"
          />
          {stats.length > 0 ? (
            <div className="absolute bottom-4 left-4 right-4 hidden grid-cols-3 gap-2.5 lg:grid">
              {stats.map((stat) => {
                const Icon = iconMap[stat.icon as keyof typeof iconMap] || iconMap.Sparkles;
                return (
                  <div
                    key={stat.title}
                    className="rounded-lg border border-white/80 bg-white/88 p-3 shadow-[0_12px_30px_rgba(28,26,23,0.10)] backdrop-blur-md dark:border-stone-700 dark:bg-ink/82"
                  >
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-brass/35 text-brass dark:border-champagne/35 dark:text-champagne">
                      <Icon aria-hidden size={17} />
                    </div>
                    <p className="font-serif text-base font-semibold leading-tight text-charcoal dark:text-ivory">
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
