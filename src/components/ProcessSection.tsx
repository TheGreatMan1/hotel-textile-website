"use client";

import { iconMap } from "@/lib/icons";
import type { ProcessContent } from "@/lib/types";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

type ProcessSectionProps = {
  process: ProcessContent;
};

export default function ProcessSection({ process }: ProcessSectionProps) {
  if (!process.isVisible) return null;

  const steps = process.steps
    .filter((step) => step.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (steps.length === 0) return null;

  return (
    <SectionWrapper id="process" className="bg-ivory dark:bg-stone-950">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 className="section-title">{process.title}</h2>
          <p className="section-copy">{process.description}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-5">
          {steps.map((step, index) => {
            const Icon =
              iconMap[step.icon as keyof typeof iconMap] || iconMap.BadgeCheck;

            return (
              <motion.article
                key={step.title}
                className="relative rounded-lg border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-ink"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <span className="absolute right-4 top-4 font-serif text-5xl leading-none text-champagne/40">
                  {index + 1}
                </span>
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-champagne/20 text-brass dark:bg-champagne/10 dark:text-champagne">
                  <Icon aria-hidden size={19} />
                </div>
                <h3 className="relative mt-5 font-serif text-2xl font-semibold text-charcoal dark:text-ivory">
                  {step.title}
                </h3>
                <p className="relative mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
