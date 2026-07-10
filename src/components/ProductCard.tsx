"use client";

import { trackStandardMetaEvent } from "@/lib/metaPixel";
import { formatPriceDisplay } from "@/lib/pricing";
import {
  dispatchQuoteSelection,
  scrollToQuoteForm
} from "@/lib/quoteSelection";
import type { Product } from "@/lib/types";
import { motion, useReducedMotion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();
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
      className="group min-w-0"
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="overflow-hidden bg-mist dark:bg-[#202020]">
        <img
          src={product.image || "/placeholders/textile-sets.svg"}
          alt={product.imageAlt || product.title}
          className="aspect-[4/4.65] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
        />
      </div>

      <div className="border-b border-stone-200 py-4 dark:border-stone-800">
        <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-peach dark:text-[#ebb49a]">
          {product.category}
        </p>
        <h3 className="mt-2 text-base font-normal leading-tight text-graphite dark:text-white">
          {product.title}
        </h3>

        {formattedPrice ? (
          <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <p className="text-sm font-medium text-graphite dark:text-white">
              {formattedPrice.displayText}
            </p>
            {formattedPrice.unitText ? (
              <p className="text-[10px] text-stone-500 dark:text-stone-400">
                / {formattedPrice.unitText}
              </p>
            ) : null}
          </div>
        ) : null}

        <p className="mt-2 text-xs font-light leading-5 text-stone-500 dark:text-stone-400">
          {product.shortDescription}
        </p>

        <div className="mt-3 space-y-1 text-[10px] leading-4 text-stone-500 dark:text-stone-400">
          {product.material ? (
            <p>
              <span className="font-medium text-graphite dark:text-white">
                {labels.material}:
              </span>{" "}
              {product.material}
            </p>
          ) : null}
          {sizes.length > 0 ? (
            <p>
              <span className="font-medium text-graphite dark:text-white">
                {labels.sizes}:
              </span>{" "}
              {sizes.join(", ")}
            </p>
          ) : null}
          {colors.length > 0 ? (
            <p>
              <span className="font-medium text-graphite dark:text-white">
                {labels.colors}:
              </span>{" "}
              {colors.join(", ")}
            </p>
          ) : null}
        </div>

        <a
          href={href}
          onClick={handleQuoteClick}
          className="mt-4 inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.15em] text-peach transition hover:text-graphite dark:text-[#ebb49a] dark:hover:text-white"
        >
          {product.buttonText}
          <ArrowRight aria-hidden className="ml-2" size={14} />
        </a>
      </div>
    </motion.article>
  );
}
