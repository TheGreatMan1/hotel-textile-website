import type { SiteContent } from "@/lib/types";
import { ArrowRight } from "lucide-react";

type HeroSectionProps = {
  hero: SiteContent["hero"];
};

export default function HeroSection({ hero }: HeroSectionProps) {
  if (!hero.isVisible) return null;

  return (
    <section id="hero" className="relative overflow-hidden bg-ivory dark:bg-ink">
      <div className="container-shell grid min-h-[calc(100vh-5rem)] items-center gap-12 py-12 lg:grid-cols-[0.94fr_1.06fr] lg:py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.02] text-charcoal dark:text-ivory sm:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-700 dark:text-stone-300 sm:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={hero.ctaLink || "#products"} className="primary-button">
              {hero.ctaText}
              <ArrowRight aria-hidden className="ml-2" size={17} />
            </a>
            <a href={hero.secondaryCtaLink || "#contact"} className="secondary-button">
              {hero.secondaryCtaText}
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] border border-champagne/40 dark:border-champagne/20" />
          <img
            src={hero.image}
            alt={hero.imageAlt}
            className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-soft dark:shadow-glow sm:aspect-[5/4] lg:aspect-[4/5]"
          />
        </div>
      </div>
    </section>
  );
}
