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
      className="flex rounded-md border border-stone-300/80 bg-white/85 p-1 text-[10px] font-bold shadow-sm backdrop-blur dark:border-stone-700 dark:bg-stone-950/75"
    >
      {(["en", "ge"] as Language[]).map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={language === item}
          onClick={() => onChange(item)}
          className={`h-6 rounded px-2 transition focus:outline-none focus:ring-2 focus:ring-brass dark:focus:ring-champagne sm:h-7 sm:px-2.5 ${
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
