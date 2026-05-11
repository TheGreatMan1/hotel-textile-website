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
      className="relative overflow-hidden bg-[linear-gradient(135deg,#11100f,#1c1a17_52%,#0d1111)] text-ivory"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(120deg, rgba(215,189,127,0.35) 0 1px, transparent 1px 115px)"
        }}
      />
      <div className="container-shell">
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold leading-[1.05] text-ivory sm:text-4xl lg:text-[2.65rem]">
            {content.title}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-stone-300">
            {content.subtitle}
          </p>
        </div>

        <div className="relative mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {features.map((feature, index) => {
            const Icon =
              iconMap[feature.icon as keyof typeof iconMap] || iconMap.Sparkles;

            return (
              <motion.article
                key={feature.title}
                className="text-center"
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
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-champagne/45 bg-champagne/5 text-champagne">
                  <Icon aria-hidden size={20} strokeWidth={1.55} />
                </div>
                <h3 className="mt-3 font-serif text-lg font-semibold text-ivory">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-stone-300">
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
