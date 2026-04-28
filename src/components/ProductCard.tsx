"use client";

import type { Product } from "@/lib/types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type ProductCardProps = {
  product: Product;
  labels: {
    material: string;
    sizes: string;
    colors: string;
  };
};

export default function ProductCard({ product, labels }: ProductCardProps) {
  const href = product.buttonLink?.trim() || "#contact";
  const sizes = product.availableSizes?.filter(Boolean) || [];
  const colors = product.colorOptions?.filter(Boolean) || [];

  return (
    <motion.article
      id={`product-${product.slug}`}
      className="group overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition-colors dark:border-stone-800 dark:bg-stone-950"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="overflow-hidden">
        <img
          src={product.image || "/placeholders/textile-sets.svg"}
          alt={product.imageAlt || product.title}
          className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass dark:text-champagne">
          {product.category}
        </p>
        <h3 className="mt-3 font-serif text-3xl font-semibold text-charcoal dark:text-ivory">
          {product.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
          {product.shortDescription}
        </p>

        <div className="mt-5 space-y-3 text-xs text-stone-600 dark:text-stone-400">
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
            <div className="flex flex-wrap gap-2 pt-1" aria-label={labels.colors}>
              {colors.map((color) => (
                <span
                  key={color}
                  className="rounded-full border border-stone-200 px-2.5 py-1 text-[11px] dark:border-stone-700"
                >
                  {color}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <a
          href={href}
          className="mt-6 inline-flex items-center text-sm font-bold text-brass transition hover:text-charcoal dark:text-champagne dark:hover:text-ivory"
        >
          {product.buttonText}
          <ArrowRight aria-hidden className="ml-2" size={16} />
        </a>
      </div>
    </motion.article>
  );
}
