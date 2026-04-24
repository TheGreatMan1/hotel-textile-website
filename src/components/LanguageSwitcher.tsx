"use client";

import type { Language } from "@/lib/types";

type LanguageSwitcherProps = {
  language: Language;
  onChange: (language: Language) => void;
};

export default function LanguageSwitcher({
  language,
  onChange
}: LanguageSwitcherProps) {
  return (
    <div
      aria-label="Select language"
      className="flex rounded-full border border-stone-300 bg-white/80 p-1 text-xs font-bold dark:border-stone-700 dark:bg-stone-950/75"
    >
      {(["en", "ge"] as Language[]).map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={language === item}
          onClick={() => onChange(item)}
          className={`h-9 rounded-full px-3 transition focus:outline-none focus:ring-2 focus:ring-brass dark:focus:ring-champagne ${
            language === item
              ? "bg-charcoal text-ivory dark:bg-champagne dark:text-ink"
              : "text-stone-600 hover:text-brass dark:text-stone-300 dark:hover:text-champagne"
          }`}
        >
          {item === "en" ? "EN" : "GE"}
        </button>
      ))}
    </div>
  );
}
