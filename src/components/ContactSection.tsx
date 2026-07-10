"use client";

import { localized } from "@/lib/content";
import { contactIconMap } from "@/lib/icons";
import { trackStandardMetaEvent } from "@/lib/metaPixel";
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
    <SectionWrapper
      id="contact"
      className="border-b border-stone-200 bg-cloud dark:border-stone-800 dark:bg-[#181818]"
    >
      <div className="container-shell">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">{localized(contact.eyebrow, language)}</p>
          <h2 className="section-title">{localized(contact.title, language)}</h2>
          <p className="section-copy mx-auto">
            {localized(contact.description, language)}
          </p>
        </div>

        {visibleMethods.length > 0 ? (
          <div className="mt-9 grid border-y border-stone-200 sm:grid-cols-2 lg:grid-cols-5 dark:border-stone-800">
            {visibleMethods.map((method) => {
              const Icon = contactIconMap[method.key];
              const content = (
                <>
                  <span className="mb-3 flex h-8 w-8 items-center justify-center border border-peach/60 text-peach dark:border-[#d99677]/60 dark:text-[#ebb49a]">
                    <Icon aria-hidden size={15} strokeWidth={1.7} />
                  </span>
                  <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    {localized(method.label, language)}
                  </span>
                  <span className="mt-1 break-words text-xs font-medium text-graphite dark:text-white">
                    {method.value}
                  </span>
                </>
              );

              return method.url ? (
                <motion.a
                  key={method.key}
                  href={method.url}
                  onClick={() =>
                    trackStandardMetaEvent("Contact", {
                      contact_method: method.key
                    })
                  }
                  className="border-b border-stone-200 p-5 transition hover:bg-white dark:border-stone-800 dark:hover:bg-[#202020] sm:border-r lg:border-b-0"
                  whileHover={{ y: -5 }}
                >
                  {content}
                </motion.a>
              ) : (
                <motion.div
                  key={method.key}
                  className="border-b border-stone-200 p-5 dark:border-stone-800 sm:border-r lg:border-b-0"
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
