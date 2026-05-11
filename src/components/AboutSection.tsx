"use client";

import { iconMap } from "@/lib/icons";
import type { SiteContent } from "@/lib/types";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

type AboutSectionProps = {
  about: SiteContent["about"];
};

export default function AboutSection({ about }: AboutSectionProps) {
  if (!about.isVisible) return null;

  const features = about.features
    .filter((feature) => feature.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <SectionWrapper id="about" className="bg-white dark:bg-ink">
      <div className="container-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.img
          src={about.image || "/placeholders/towels.svg"}
          alt={about.imageAlt}
          className="aspect-[4/3] w-full rounded-lg border border-stone-200/80 object-cover shadow-[0_18px_50px_rgba(28,26,23,0.10)] dark:border-stone-800"
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.35 }}
        />
        <div>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="section-title">{about.title}</h2>
          <p className="section-copy">{about.description}</p>

          {features.length > 0 ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {features.map((feature) => {
                const Icon =
                  iconMap[feature.icon as keyof typeof iconMap] ||
                  iconMap.BadgeCheck;

                return (
                  <article
                    key={feature.title}
                    className="rounded-lg border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-champagne/25 text-brass dark:text-champagne">
                      <Icon aria-hidden size={16} />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-ivory">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-stone-600 dark:text-stone-300">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </SectionWrapper>
  );
}
