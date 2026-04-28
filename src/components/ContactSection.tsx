"use client";

import { localized } from "@/lib/content";
import { contactIconMap } from "@/lib/icons";
import type { ContactContent, Language } from "@/lib/types";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

type ContactSectionProps = {
  contact: ContactContent;
  language: Language;
};

export default function ContactSection({
  contact,
  language
}: ContactSectionProps) {
  if (!contact.isVisible) return null;

  const visibleMethods = contact.methods.filter((method) => method.isVisible);

  return (
    <SectionWrapper id="contact" className="bg-white dark:bg-stone-950">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{localized(contact.eyebrow, language)}</p>
          <h2 className="section-title">{localized(contact.title, language)}</h2>
          <p className="section-copy">
            {localized(contact.description, language)}
          </p>
        </div>

        {visibleMethods.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {visibleMethods.map((method) => {
              const Icon = contactIconMap[method.key];
              const content = (
                <>
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-champagne/25 text-brass dark:text-champagne">
                    <Icon aria-hidden size={20} />
                  </span>
                  <span className="text-sm font-semibold text-stone-500 dark:text-stone-400">
                    {localized(method.label, language)}
                  </span>
                  <span className="mt-2 break-words text-base font-bold text-charcoal dark:text-ivory">
                    {method.value}
                  </span>
                </>
              );

              return method.url ? (
                <motion.a
                  key={method.key}
                  href={method.url}
                  className="rounded-lg border border-stone-200 bg-ivory p-5 transition hover:border-brass hover:shadow-soft dark:border-stone-800 dark:bg-ink dark:hover:border-champagne"
                  whileHover={{ y: -5 }}
                >
                  {content}
                </motion.a>
              ) : (
                <motion.div
                  key={method.key}
                  className="rounded-lg border border-stone-200 bg-ivory p-5 dark:border-stone-800 dark:bg-ink"
                  whileHover={{ y: -5 }}
                >
                  {content}
                </motion.div>
              );
            })}
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
