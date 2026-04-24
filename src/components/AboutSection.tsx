import type { SiteContent } from "@/lib/types";
import { Check } from "lucide-react";

type AboutSectionProps = {
  about: SiteContent["about"];
};

export default function AboutSection({ about }: AboutSectionProps) {
  if (!about.isVisible) return null;

  return (
    <section id="about" className="section-padding bg-white dark:bg-stone-950">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <img
          src={about.image}
          alt={about.imageAlt}
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
        />
        <div>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="section-title">{about.title}</h2>
          <p className="section-copy">{about.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {about.features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-lg border border-stone-200 bg-ivory p-5 dark:border-stone-800 dark:bg-ink"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-champagne/25 text-brass dark:text-champagne">
                  <Check aria-hidden size={18} />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-charcoal dark:text-ivory">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
