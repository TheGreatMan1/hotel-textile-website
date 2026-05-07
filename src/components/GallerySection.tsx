"use client";

import { localized } from "@/lib/content";
import type { GalleryContent, Language } from "@/lib/types";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

type GallerySectionProps = {
  gallery: GalleryContent;
  language: Language;
};

export default function GallerySection({
  gallery,
  language
}: GallerySectionProps) {
  if (!gallery.isVisible) return null;

  const images = gallery.images
    .filter((image) => image.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (images.length === 0) return null;

  return (
    <SectionWrapper id="gallery" className="bg-[#fbf7ef] dark:bg-stone-950">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{localized(gallery.eyebrow, language)}</p>
          <h2 className="section-title">{localized(gallery.title, language)}</h2>
          <p className="section-copy mx-auto">
            {localized(gallery.description, language)}
          </p>
        </div>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <motion.figure
              key={`${image.image}-${image.sortOrder}`}
              className="group overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-ink"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <div className="overflow-hidden">
                <img
                  src={image.image || "/placeholders/hero.svg"}
                  alt={image.alt}
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <figcaption className="px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-stone-700 dark:text-stone-300">
                {localized(image.caption, language)}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
