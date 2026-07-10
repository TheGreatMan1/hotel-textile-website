"use client";

import { getSectionVisibility } from "@/lib/content";
import { iconMap } from "@/lib/icons";
import type {
  Language,
  SettingsContent,
  SiteContent,
  WebsiteContent
} from "@/lib/types";
import { Menu } from "lucide-react";
import { useMemo, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

type HeaderProps = {
  content: SiteContent;
  settings: SettingsContent;
  allContent: WebsiteContent;
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export default function Header({
  content,
  settings,
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
  const serviceItems = content.hero.stats
    .filter((item) => item.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 3);
  const brandMain = settings.brandName;
  const brandSub = settings.brandDescriptor;

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white text-graphite transition-colors dark:border-stone-800 dark:bg-[#161616] dark:text-white">
      {content.announcementBar?.isVisible ? (
        <div className="bg-graphite px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-white dark:bg-black">
          {content.announcementBar.text}
        </div>
      ) : null}

      <div className="border-b border-stone-200 dark:border-stone-800">
        <div className="container-shell grid min-h-14 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex min-w-0 items-center">
            <button
              type="button"
              className="icon-button lg:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
            >
              <Menu aria-hidden size={18} />
            </button>
            <span className="hidden text-[9px] font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 lg:block">
              {content.tagline}
            </span>
          </div>

          <a
            href="#top"
            className="group min-w-0 px-1 text-center"
            aria-label="Back to top"
          >
            <span className="block break-words text-[1.05rem] font-light uppercase leading-tight tracking-[0.1em] transition group-hover:text-peach sm:text-[1.3rem] lg:text-[1.45rem]">
              {brandMain}
            </span>
            {brandSub ? (
              <span className="mt-1 block break-words text-[7px] font-medium uppercase leading-tight tracking-[0.22em] text-stone-500 dark:text-stone-400 sm:text-[8px] sm:tracking-[0.28em]">
                {brandSub}
              </span>
            ) : null}
          </a>

          <div className="flex items-center justify-end gap-2">
            <LanguageSwitcher
              language={language}
              onChange={onLanguageChange}
            />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="hidden border-b border-stone-200 dark:border-stone-800 lg:block">
        <div className="container-shell relative flex min-h-11 items-center justify-center">
          <nav className="flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] font-medium uppercase tracking-[0.13em] text-stone-600 transition hover:text-peach dark:text-stone-300 dark:hover:text-[#ebb49a]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#quote-form"
            className="absolute right-0 text-[10px] font-semibold uppercase tracking-[0.15em] text-peach transition hover:text-graphite dark:text-[#ebb49a] dark:hover:text-white"
          >
            {content.hero.primaryButtonText}
          </a>
        </div>
      </div>

      {serviceItems.length > 0 ? (
        <div className="bg-mist transition-colors dark:bg-[#202020]">
          <div className="container-shell grid grid-cols-3 divide-x divide-stone-300/80 dark:divide-stone-700">
            {serviceItems.map((item) => {
              const Icon =
                iconMap[item.icon as keyof typeof iconMap] || iconMap.Sparkles;
              return (
                <div
                  key={item.title}
                  className="flex min-h-9 items-center justify-center gap-2 px-2 text-center"
                >
                  <Icon
                    aria-hidden
                    className="hidden text-peach sm:block"
                    size={13}
                    strokeWidth={1.6}
                  />
                  <span className="text-[8px] font-medium uppercase tracking-[0.1em] text-stone-600 dark:text-stone-300 sm:text-[9px]">
                    {item.title}
                  </span>
                  <span className="hidden text-[9px] text-stone-400 xl:inline">
                    {item.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
        brandName={brandMain}
        brandDescriptor={brandSub}
      />
    </header>
  );
}
