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
    <SectionWrapper
      id="process"
      className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-[#161616]"
    >
      <div className="container-shell">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 className="section-title">{process.title}</h2>
          <p className="section-copy mx-auto">{process.description}</p>
        </div>

        <div className="relative mt-10 grid gap-7 md:grid-cols-5 md:gap-3">
          <div className="absolute left-[10%] right-[10%] top-5 hidden h-px bg-stone-200 dark:bg-stone-800 md:block" />
          {steps.map((step, index) => {
            const Icon =
              iconMap[step.icon as keyof typeof iconMap] || iconMap.BadgeCheck;

            return (
              <motion.article
                key={step.title}
                className="relative text-center"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <div className="relative mx-auto flex h-10 w-10 items-center justify-center border border-peach bg-white text-peach dark:border-[#d99677] dark:bg-[#161616] dark:text-[#ebb49a]">
                  <Icon aria-hidden size={14} />
                </div>
                <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.18em] text-peach dark:text-[#ebb49a]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="relative mt-1.5 text-sm font-medium text-graphite dark:text-white">
                  {step.title}
                </h3>
                <p className="relative mt-2 text-[11px] font-light leading-5 text-stone-500 dark:text-stone-400">
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
