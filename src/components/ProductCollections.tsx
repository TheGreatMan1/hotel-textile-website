import type { ProductsContent } from "@/lib/types";
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
    <SectionWrapper id="products" className="bg-smoke dark:bg-ink">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{products.eyebrow}</p>
          <h2 className="section-title">{products.title}</h2>
          <p className="section-copy">{products.description}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </SectionWrapper>
  );
}
