"use client";

import { trackStandardMetaEvent } from "@/lib/metaPixel";
import { formatPriceDisplay } from "@/lib/pricing";
import { dispatchQuoteSelection, scrollToQuoteForm } from "@/lib/quoteSelection";
import type { Product } from "@/lib/types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { MouseEvent } from "react";

type ProductCardProps = {
  product: Product;
  labels: {
    material: string;
    sizes: string;
    colors: string;
  };
};

export default function ProductCard({ product, labels }: ProductCardProps) {
  const href = product.buttonLink?.trim() || "#quote-form";
  const sizes = product.availableSizes?.filter(Boolean) || [];
  const colors = product.colorOptions?.filter(Boolean) || [];
  const formattedPrice = formatPriceDisplay(product);

  function handleQuoteClick(event: MouseEvent<HTMLAnchorElement>) {
    if (href.startsWith("#")) event.preventDefault();

    dispatchQuoteSelection({
      selectedProduct: product.title,
      selectedPrice: formattedPrice?.fullText || "",
      selectedUnit: formattedPrice?.unitText || product.unit || "",
      quoteSource: "product card"
    });
    trackStandardMetaEvent("ViewContent", {
      content_name: product.title,
      content_category: product.category,
      content_ids: product.slug,
      currency: "GEL",
      value: formattedPrice?.numericValue,
      price: formattedPrice?.fullText
    });
    scrollToQuoteForm();
  }

  return (
    <motion.article
      id={`product-${product.slug}`}
      className="group overflow-hidden rounded-lg border border-stone-200/90 bg-white shadow-[0_14px_42px_rgba(28,26,23,0.06)] transition-colors dark:border-stone-800 dark:bg-stone-950"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="overflow-hidden">
        <img
          src={product.image || "/placeholders/textile-sets.svg"}
          alt={product.imageAlt || product.title}
          className="aspect-[1.35/1] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-3.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brass dark:text-champagne">
          {product.category}
        </p>
        <h3 className="mt-1.5 font-serif text-xl font-semibold leading-tight text-charcoal dark:text-ivory">
          {product.title}
        </h3>

        {formattedPrice ? (
          <div className="mt-1.5 flex items-end gap-2 text-charcoal dark:text-ivory">
            <p className="font-serif text-xl font-semibold leading-none">
              {formattedPrice.displayText}
            </p>
            {formattedPrice.unitText ? (
              <p className="pb-0.5 text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                / {formattedPrice.unitText}
              </p>
            ) : null}
          </div>
        ) : null}

        <p className="mt-2 text-xs leading-5 text-stone-600 dark:text-stone-300">
          {product.shortDescription}
        </p>

        <div className="mt-3 space-y-1.5 text-[11px] leading-4 text-stone-600 dark:text-stone-400">
          {product.material ? (
            <p>
              <span className="font-semibold text-charcoal dark:text-ivory">
                {labels.material}:
              </span>{" "}
              {product.material}
            </p>
          ) : null}
          {sizes.length > 0 ? (
            <p>
              <span className="font-semibold text-charcoal dark:text-ivory">
                {labels.sizes}:
              </span>{" "}
              {sizes.join(", ")}
            </p>
          ) : null}
          {colors.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-1" aria-label={labels.colors}>
              {colors.map((color) => (
                <span
                  key={color}
                  className="rounded-full border border-stone-200 px-2 py-0.5 text-[10px] dark:border-stone-700"
                >
                  {color}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <a
          href={href}
          onClick={handleQuoteClick}
          className="mt-4 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.08em] text-brass transition hover:text-charcoal dark:text-champagne dark:hover:text-ivory"
        >
          {product.buttonText}
          <ArrowRight aria-hidden className="ml-2" size={16} />
        </a>
      </div>
    </motion.article>
  );
}
