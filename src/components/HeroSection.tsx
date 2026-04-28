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

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-ivory transition-colors dark:bg-ink"
    >
      <motion.div
        aria-hidden
        className="absolute left-[-12rem] top-20 h-96 w-96 rounded-full bg-champagne/25 blur-3xl"
        animate={reduceMotion ? undefined : { y: [0, 28, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-20 right-[-10rem] h-[28rem] w-[28rem] rounded-full bg-brass/15 blur-3xl dark:bg-champagne/10"
        animate={reduceMotion ? undefined : { y: [0, -34, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-shell grid min-h-[calc(100vh-5rem)] items-center gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 34 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.02] text-charcoal dark:text-ivory sm:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-700 dark:text-stone-300 sm:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={hero.primaryButtonLink || "#products"} className="primary-button">
              {hero.primaryButtonText}
              <ArrowRight aria-hidden className="ml-2" size={17} />
            </a>
            <a href={hero.secondaryButtonLink || "#interactive-bed"} className="secondary-button">
              {hero.secondaryButtonText}
            </a>
          </div>
          {stats.length > 0 ? (
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => {
                const Icon = iconMap[stat.icon as keyof typeof iconMap] || iconMap.Sparkles;
                return (
                  <div
                    key={stat.title}
                    className="rounded-lg border border-stone-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-950/60"
                  >
                    <Icon className="mb-3 text-brass dark:text-champagne" size={20} />
                    <p className="font-serif text-xl font-semibold text-charcoal dark:text-ivory">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-stone-600 dark:text-stone-400">
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
          <div className="absolute -inset-4 rounded-[2rem] border border-champagne/40 dark:border-champagne/20" />
          <img
            src={hero.image || "/placeholders/hero.svg"}
            alt={hero.imageAlt}
            className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-soft dark:shadow-glow sm:aspect-[5/4] lg:aspect-[4/5]"
          />
        </motion.div>
      </div>
    </section>
  );
}
