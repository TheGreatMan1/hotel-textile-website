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
  const brandSub = brandMain === site.brandName ? site.tagline : "Hotel Textiles";
  const columnLabels =
    language === "ge"
      ? {
          products: "პროდუქტები",
          company: "კომპანია",
          resources: "რესურსები"
        }
      : { products: "Products", company: "Company", resources: "Resources" };

  return (
    <footer className="overflow-hidden border-t border-stone-800 bg-[linear-gradient(135deg,#11100f,#1c1a17_58%,#0b0f0f)] py-7 text-ivory">
      <div className="container-shell">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne/40 bg-champagne/10 text-champagne">
                <Sparkles aria-hidden size={18} strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-serif text-xl font-semibold leading-none">
                  {brandMain}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">
                  {brandSub}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-stone-300 sm:text-sm">
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
            <h3 className="font-serif text-base font-semibold text-ivory">
              {columnLabels.resources}
            </h3>
            <div className="mt-2.5 flex flex-col gap-1.5 text-xs font-semibold text-stone-300 sm:text-sm">
              <a href="/privacy" className="transition hover:text-champagne">
                {privacyLabel}
              </a>
              <a href="#quote-form" className="inline-flex items-center text-champagne">
                {site.hero.primaryButtonText}
                <ArrowRight aria-hidden className="ml-2" size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-3.5 text-[11px] text-stone-500">
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
      <h3 className="font-serif text-base font-semibold text-ivory">{title}</h3>
      <div className="mt-2.5 flex flex-col gap-1.5 text-xs font-semibold text-stone-300 sm:text-sm">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition hover:text-champagne"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
