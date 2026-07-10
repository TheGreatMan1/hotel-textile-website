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
      className="flex border border-stone-300 bg-white p-0.5 text-[9px] font-medium uppercase tracking-[0.08em] dark:border-stone-700 dark:bg-[#1d1d1d]"
    >
      {(["en", "ge"] as Language[]).map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={language === item}
          onClick={() => onChange(item)}
          className={`h-7 px-2.5 transition focus:outline-none focus:ring-2 focus:ring-peach ${
            language === item
              ? "bg-graphite text-white dark:bg-[#d99677]"
              : "text-stone-500 hover:text-peach dark:text-stone-300 dark:hover:text-[#ebb49a]"
          }`}
        >
          {item === "en" ? "EN" : "GE"}
        </button>
      ))}
    </div>
  );
}
