import { localized } from "@/lib/content";
import type { GalleryContent, Language } from "@/lib/types";

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
    <section id="gallery" className="section-padding bg-white dark:bg-stone-950">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{localized(gallery.eyebrow, language)}</p>
          <h2 className="section-title">{localized(gallery.title, language)}</h2>
          <p className="section-copy">
            {localized(gallery.description, language)}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image) => (
            <figure
              key={`${image.image}-${image.sortOrder}`}
              className="group overflow-hidden rounded-lg bg-ivory dark:bg-ink"
            >
              <img
                src={image.image}
                alt={image.alt}
                className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <figcaption className="px-4 py-3 text-sm font-semibold text-stone-700 dark:text-stone-300">
                {localized(image.caption, language)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
