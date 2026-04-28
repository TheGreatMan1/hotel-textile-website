"use client";

import type { BedHotspotContent, InteractiveBedContent } from "@/lib/types";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type BedProductPanelProps = {
  hotspot: BedHotspotContent;
  content: InteractiveBedContent;
  onClose: () => void;
};

export default function BedProductPanel({
  hotspot,
  content,
  onClose
}: BedProductPanelProps) {
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const variants = useMemo(
    () => hotspot.materialVariants.filter((variant) => variant.isVisible),
    [hotspot.materialVariants]
  );
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id || ""
  );

  useEffect(() => {
    setSelectedVariantId(variants[0]?.id || "");
  }, [hotspot.id, variants]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");

    function syncViewport() {
      setIsDesktop(query.matches);
    }

    syncViewport();
    query.addEventListener("change", syncViewport);
    return () => query.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const selectedVariant =
    variants.find((variant) => variant.id === selectedVariantId) || variants[0];
  const image = selectedVariant?.image || hotspot.image;
  const imageAlt = selectedVariant?.imageAlt || hotspot.imageAlt;
  const description = selectedVariant?.description || hotspot.longDescription;
  const sizes = selectedVariant?.sizes?.filter(Boolean) || [];
  const colors = selectedVariant?.colors?.filter(Boolean) || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-end bg-ink/35 p-3 backdrop-blur-sm md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={hotspot.title}
      onClick={onClose}
    >
      <motion.aside
        className="max-h-[92vh] w-full overflow-y-auto rounded-2xl border border-stone-200 bg-ivory shadow-soft dark:border-stone-800 dark:bg-stone-950 md:max-w-xl"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: isDesktop ? 0 : 70, x: isDesktop ? 80 : 0 }
        }
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        exit={
          reduceMotion
            ? undefined
            : { opacity: 0, y: isDesktop ? 0 : 70, x: isDesktop ? 80 : 0 }
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 p-5 dark:border-stone-800 sm:p-6">
          <div>
            <p className="eyebrow">{hotspot.category}</p>
            <h3 className="mt-2 font-serif text-4xl font-semibold leading-tight text-charcoal dark:text-ivory">
              {hotspot.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="icon-button shrink-0"
            aria-label={content.closeText}
          >
            <X aria-hidden size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <img
            src={image}
            alt={imageAlt}
            className="aspect-[4/3] w-full rounded-lg object-cover shadow-sm"
          />

          <p className="mt-5 text-base leading-8 text-stone-700 dark:text-stone-300">
            {hotspot.shortDescription}
          </p>
          <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400">
            {description}
          </p>

          {variants.length > 1 ? (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                {content.materialsLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selectedVariant?.id === variant.id
                        ? "border-brass bg-brass text-white dark:border-champagne dark:bg-champagne dark:text-ink"
                        : "border-stone-300 text-charcoal hover:border-brass dark:border-stone-700 dark:text-ivory dark:hover:border-champagne"
                    }`}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            </div>
          ) : variants.length === 1 ? (
            <p className="mt-5 inline-flex rounded-full border border-champagne/70 px-4 py-2 text-sm font-semibold text-brass dark:text-champagne">
              {variants[0].label}
            </p>
          ) : null}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {sizes.length > 0 ? (
              <div className="rounded-lg border border-stone-200 p-4 dark:border-stone-800">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                  {content.sizesLabel}
                </p>
                <p className="mt-2 text-sm leading-6 text-charcoal dark:text-ivory">
                  {sizes.join(", ")}
                </p>
              </div>
            ) : null}
            {colors.length > 0 ? (
              <div className="rounded-lg border border-stone-200 p-4 dark:border-stone-800">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                  {content.colorsLabel}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <span
                      key={color}
                      className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-200"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {hotspot.linkedProductSlug ? (
              <a
                href={`#product-${hotspot.linkedProductSlug}`}
                className="primary-button"
                onClick={onClose}
              >
                {content.viewProductText}
                <ArrowRight aria-hidden className="ml-2" size={16} />
              </a>
            ) : null}
            <a href="#contact" className="secondary-button" onClick={onClose}>
              {content.contactText}
            </a>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
