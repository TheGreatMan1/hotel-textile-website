import { localized } from "@/lib/content";
import type {
  FooterContent,
  Language,
  SectionKey,
  SiteContent
} from "@/lib/types";

type FooterProps = {
  site: SiteContent;
  footer: FooterContent;
  language: Language;
  visibleSections: Record<SectionKey, boolean>;
};

export default function Footer({
  site,
  footer,
  language,
  visibleSections
}: FooterProps) {
  if (!footer.isVisible) return null;

  const navLinks = site.navLinks.filter((link) => visibleSections[link.sectionKey]);

  return (
    <footer className="border-t border-stone-200 bg-ivory py-10 dark:border-stone-800 dark:bg-ink">
      <div className="container-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <p className="font-serif text-2xl font-semibold text-charcoal dark:text-ivory">
            {site.brandName}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
            {localized(footer.tagline, language)}
          </p>
        </div>
        {navLinks.length > 0 ? (
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-stone-600 dark:text-stone-400">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-brass dark:hover:text-champagne"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
        <p className="text-sm text-stone-500 dark:text-stone-500">
          © {new Date().getFullYear()} {site.brandName}.{" "}
          {localized(footer.copyright, language)}
        </p>
      </div>
    </footer>
  );
}
