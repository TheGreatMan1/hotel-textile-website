"use client";

import { getSectionVisibility } from "@/lib/content";
import type { Language, SiteContent, WebsiteContent } from "@/lib/types";
import { Menu } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-ivory/88 shadow-sm backdrop-blur-xl transition-colors dark:border-stone-800 dark:bg-ink/86">
      <div className="container-shell flex min-h-20 items-center justify-between gap-4">
        <a href="#top" className="group min-w-0" aria-label="Back to top">
          <span className="block truncate font-serif text-2xl font-semibold text-charcoal transition group-hover:text-brass dark:text-ivory dark:group-hover:text-champagne">
            {content.brandName}
          </span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 sm:block">
            {content.tagline}
          </span>
        </a>

        <nav
          className="hidden items-center gap-5 xl:gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-stone-700 transition hover:text-brass dark:text-stone-300 dark:hover:text-champagne"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
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
