"use client";

import { getSectionVisibility } from "@/lib/content";
import type { Language, SiteContent, WebsiteContent } from "@/lib/types";
import { ArrowRight, Menu, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

type HeaderProps = {
  content: SiteContent;
  allContent: WebsiteContent;
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export default function Header({
  content,
  allContent,
  language,
  onLanguageChange
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const visibleSections = useMemo(
    () => getSectionVisibility(allContent, language),
    [allContent, language]
  );
  const navLinks = content.navLinks.filter(
    (link) => visibleSections[link.sectionKey]
  );
  const brandMain = content.brandName.replace(/\s*Hotel Textiles$/i, "");
  const brandSub =
    brandMain === content.brandName ? content.tagline : "Hotel Textiles";

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#fbf7ef]/92 shadow-[0_8px_28px_rgba(28,26,23,0.05)] backdrop-blur-xl transition-colors dark:border-stone-800 dark:bg-ink/90">
      <div className="container-shell flex min-h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="group flex min-w-0 items-center gap-3"
          aria-label="Back to top"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brass/35 bg-champagne/20 text-brass dark:border-champagne/40 dark:bg-champagne/10 dark:text-champagne">
            <Sparkles aria-hidden size={21} strokeWidth={1.6} />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-2xl font-semibold leading-none text-charcoal transition group-hover:text-brass dark:text-ivory dark:group-hover:text-champagne">
              {brandMain}
            </span>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 sm:block">
              {brandSub}
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-4 xl:gap-6 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[11px] font-bold uppercase tracking-[0.08em] text-stone-700 transition after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-brass after:transition-all hover:text-brass hover:after:w-full dark:text-stone-300 dark:after:bg-champagne dark:hover:text-champagne"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#quote-form"
            className="primary-button hidden xl:inline-flex"
          >
            {content.hero.primaryButtonText}
            <ArrowRight aria-hidden className="ml-2" size={15} />
          </a>
          <LanguageSwitcher language={language} onChange={onLanguageChange} />
          <ThemeToggle />
          <button
            type="button"
            className="icon-button lg:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
          >
            <Menu aria-hidden size={20} />
          </button>
        </div>
      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
        brandName={content.brandName}
      />
    </header>
  );
}
