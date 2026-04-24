import type { Product } from "@/lib/types";
import { ArrowRight } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const href = product.buttonLink?.trim() || "#contact";

  return (
    <article className="group overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-stone-800 dark:bg-stone-950">
      <img
        src={product.image}
        alt={product.imageAlt}
        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass dark:text-champagne">
          {product.category}
        </p>
        <h3 className="mt-3 font-serif text-3xl font-semibold text-charcoal dark:text-ivory">
          {product.title}
        </h3>
        <p className="mt-3 min-h-24 text-sm leading-7 text-stone-600 dark:text-stone-300">
          {product.shortDescription}
        </p>
        <a href={href} className="mt-5 inline-flex items-center text-sm font-bold text-brass transition hover:text-charcoal dark:text-champagne dark:hover:text-ivory">
          {product.buttonText}
          <ArrowRight aria-hidden className="ml-2" size={16} />
        </a>
      </div>
    </article>
  );
}
