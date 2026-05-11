import type { FormattedPrice } from "@/lib/pricing";

type PriceBlockProps = {
  price: FormattedPrice | null;
  className?: string;
};

export default function PriceBlock({ price, className = "" }: PriceBlockProps) {
  if (!price) return null;

  return (
    <div
      className={`rounded-md border border-champagne/70 bg-champagne/20 px-3 py-2.5 text-charcoal dark:border-champagne/30 dark:bg-champagne/10 dark:text-ivory ${className}`}
    >
      <p className="font-serif text-2xl font-semibold leading-tight">
        {price.displayText}
      </p>
      {price.unitText ? (
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-brass dark:text-champagne">
          {price.unitText}
        </p>
      ) : null}
    </div>
  );
}
