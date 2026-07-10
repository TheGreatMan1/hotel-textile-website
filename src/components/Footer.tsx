import { localized } from "@/lib/content";
import type {
  FooterContent,
  Language,
  NavLink,
  SectionKey,
  SiteContent
} from "@/lib/types";
import { ArrowRight, Sparkles } from "lucide-react";

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

  const navLinks = site.navLinks.filter(
    (link) => visibleSections[link.sectionKey]
  );
  const splitIndex = Math.ceil(navLinks.length / 2);
  const privacyLabel =
    language === "ge" ? "კონფიდენციალურობა" : "Privacy Policy";
  const brandMain = site.brandName.replace(/\s*Hotel Textiles$/i, "");
  const brandSub =
    brandMain === site.brandName ? site.tagline : "Hotel Textiles";
  const columnLabels =
    language === "ge"
      ? {
          products: "პროდუქტები",
          company: "კომპანია",
          resources: "რესურსები"
        }
      : { products: "Products", company: "Company", resources: "Resources" };

  return (
    <footer className="overflow-hidden border-t border-stone-200 bg-mist py-12 text-graphite transition-colors dark:border-stone-800 dark:bg-[#202020] dark:text-white">
      <div className="container-shell">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-peach/60 text-peach dark:border-[#d99677]/60 dark:text-[#ebb49a]">
                <Sparkles aria-hidden size={16} strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-lg font-light uppercase leading-none tracking-[0.12em]">
                  {brandMain}
                </p>
                <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">
                  {brandSub}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-xs font-light leading-5 text-stone-500 dark:text-stone-400">
              {localized(footer.tagline, language)}
            </p>
          </div>

          <FooterLinkColumn
            title={columnLabels.products}
            links={navLinks.slice(0, splitIndex)}
          />
          <FooterLinkColumn
            title={columnLabels.company}
            links={navLinks.slice(splitIndex)}
          />

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              {columnLabels.resources}
            </h3>
            <div className="mt-4 flex flex-col gap-2 text-xs font-light text-stone-500 dark:text-stone-400">
              <a href="/privacy" className="transition hover:text-peach">
                {privacyLabel}
              </a>
              <a
                href="#quote-form"
                className="inline-flex items-center text-peach dark:text-[#ebb49a]"
              >
                {site.hero.primaryButtonText}
                <ArrowRight aria-hidden className="ml-2" size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-300 pt-4 text-[10px] font-light text-stone-500 dark:border-stone-700">
          &copy; {new Date().getFullYear()} {site.brandName}.{" "}
          {localized(footer.copyright, language)}
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({ title, links }: { title: string; links: NavLink[] }) {
  if (links.length === 0) return null;

  return (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em]">
        {title}
      </h3>
      <div className="mt-4 flex flex-col gap-2 text-xs font-light text-stone-500 dark:text-stone-400">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition hover:text-peach"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
