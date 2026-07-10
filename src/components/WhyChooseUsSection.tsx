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
    <SectionWrapper
      id="why-us"
      className="relative overflow-hidden border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-[#161616]"
    >
      <div className="container-shell">
        <div className="relative mx-auto max-w-xl text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="section-title">
            {content.title}
          </h2>
          <p className="section-copy mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="relative mt-9 grid border-y border-stone-200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 dark:border-stone-800">
          {features.map((feature, index) => {
            const Icon =
              iconMap[feature.icon as keyof typeof iconMap] || iconMap.Sparkles;

            return (
              <motion.article
                key={feature.title}
                className="border-b border-stone-200 px-4 py-6 text-center sm:border-r lg:min-h-[12rem] xl:border-b-0 dark:border-stone-800"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: index * 0.04,
                  type: "spring",
                  stiffness: 260,
                  damping: 24
                }}
              >
                <div className="mx-auto flex h-9 w-9 items-center justify-center border border-peach/60 text-peach dark:border-[#d99677]/60 dark:text-[#ebb49a]">
                  <Icon aria-hidden size={16} strokeWidth={1.55} />
                </div>
                <h3 className="mt-3 text-sm font-medium text-graphite dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[11px] font-light leading-5 text-stone-500 dark:text-stone-400">
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
