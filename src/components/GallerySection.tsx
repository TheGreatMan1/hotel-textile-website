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
    <SectionWrapper
      id="gallery"
      className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-[#161616]"
    >
      <div className="container-shell">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">{localized(gallery.eyebrow, language)}</p>
          <h2 className="section-title">{localized(gallery.title, language)}</h2>
          <p className="section-copy mx-auto">
            {localized(gallery.description, language)}
          </p>
        </div>

        <div className="mt-9 grid auto-rows-[12rem] gap-2 sm:grid-cols-2 sm:auto-rows-[15rem] lg:grid-cols-4 lg:auto-rows-[13rem]">
          {images.map((image, index) => {
            const layoutClass =
              index === 0
                ? "sm:row-span-2 lg:col-span-2 lg:row-span-2"
                : index === 3
                  ? "lg:col-span-2"
                  : "";

            return (
              <motion.figure
              key={`${image.image}-${image.sortOrder}`}
              className={`group relative overflow-hidden bg-mist dark:bg-[#202020] ${layoutClass}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <div className="h-full overflow-hidden">
                <img
                  src={image.image || "/placeholders/hero.svg"}
                  alt={image.alt}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-3 pt-10 text-[9px] font-medium uppercase tracking-[0.15em] text-white">
                {localized(image.caption, language)}
              </figcaption>
            </motion.figure>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
