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
      <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
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
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {features.map((feature) => {
                const Icon =
                  iconMap[feature.icon as keyof typeof iconMap] ||
                  iconMap.BadgeCheck;

                return (
                  <article
                    key={feature.title}
                    className="rounded-lg border border-stone-200 bg-[#fbf7ef] p-4 dark:border-stone-800 dark:bg-stone-950"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-champagne/25 text-brass dark:text-champagne">
                      <Icon aria-hidden size={18} />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-charcoal dark:text-ivory">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
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
