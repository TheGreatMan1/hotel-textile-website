"use client";

import { localized } from "@/lib/content";
import { scrollToQuoteForm } from "@/lib/quoteSelection";
import type { Language, QuoteFormContent } from "@/lib/types";
import { useEffect, useState } from "react";

type MobileQuoteCTAProps = {
  content: QuoteFormContent;
  language: Language;
};

export default function MobileQuoteCTA({
  content,
  language
}: MobileQuoteCTAProps) {
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("quote-form");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsQuoteVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!content.isVisible || isQuoteVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-3 shadow-soft backdrop-blur md:hidden dark:border-stone-800 dark:bg-ink/95">
      <button type="button" className="primary-button w-full" onClick={scrollToQuoteForm}>
        {localized(content.submitButtonText, language)}
      </button>
    </div>
  );
}
