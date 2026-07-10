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
    <SectionWrapper
      id="about"
      className="border-b border-stone-200 bg-mist dark:border-stone-800 dark:bg-[#202020]"
    >
      <div className="container-shell grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-14">
        <motion.img
          src={about.image || "/placeholders/towels.svg"}
          alt={about.imageAlt}
          className="aspect-[5/4] w-full object-cover"
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.35 }}
        />
        <div>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="section-title">{about.title}</h2>
          <p className="section-copy">{about.description}</p>

          {features.length > 0 ? (
            <div className="mt-6 divide-y divide-stone-300 border-y border-stone-300 dark:divide-stone-700 dark:border-stone-700">
              {features.map((feature) => {
                const Icon =
                  iconMap[feature.icon as keyof typeof iconMap] ||
                  iconMap.BadgeCheck;

                return (
                  <article
                    key={feature.title}
                    className="grid grid-cols-[2.25rem_1fr] gap-3 py-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center border border-peach/55 text-peach dark:border-[#d99677]/55 dark:text-[#ebb49a]">
                      <Icon aria-hidden size={15} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-graphite dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-xs font-light leading-5 text-stone-500 dark:text-stone-400">
                        {feature.description}
                      </p>
                    </div>
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
