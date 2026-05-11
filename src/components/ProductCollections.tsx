import type { ProductsContent } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import SectionWrapper from "./SectionWrapper";

type ProductCollectionsProps = {
  products: ProductsContent;
};

export default function ProductCollections({ products }: ProductCollectionsProps) {
  if (!products.isVisible) return null;

  const visibleProducts = products.items
    .filter((product) => product.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (visibleProducts.length === 0) return null;

  return (
    <SectionWrapper id="products" className="bg-white dark:bg-ink">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{products.eyebrow}</p>
          <h2 className="section-title">{products.title}</h2>
          <p className="section-copy mx-auto">{products.description}</p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              labels={{
                material: products.materialLabel,
                sizes: products.sizesLabel,
                colors: products.colorsLabel
              }}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <a href="#quote-form" className="primary-button">
            {visibleProducts[0]?.buttonText || products.title}
            <ArrowRight aria-hidden className="ml-2" size={15} />
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
