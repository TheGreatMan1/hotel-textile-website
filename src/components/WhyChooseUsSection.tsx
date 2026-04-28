"use client";

import { iconMap } from "@/lib/icons";
import type { SiteContent } from "@/lib/types";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

type WhyChooseUsSectionProps = {
  content: SiteContent["whyChooseUs"];
};

export default function WhyChooseUsSection({
  content
}: WhyChooseUsSectionProps) {
  if (!content.isVisible) return null;

  const features = content.features
    .filter((feature) => feature.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (features.length === 0) return null;

  return (
    <SectionWrapper id="why-us" className="bg-ivory dark:bg-stone-950">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-copy">{content.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon =
              iconMap[feature.icon as keyof typeof iconMap] || iconMap.Sparkles;

            return (
              <motion.article
                key={feature.title}
                className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-ink"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: index * 0.04,
                  type: "spring",
                  stiffness: 260,
                  damping: 24
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne/20 text-brass dark:bg-champagne/10 dark:text-champagne">
                  <Icon aria-hidden size={21} />
                </div>
                <h3 className="mt-5 font-serif text-3xl font-semibold text-charcoal dark:text-ivory">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
