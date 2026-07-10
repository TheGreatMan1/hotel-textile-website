import type { FormattedPrice } from "@/lib/pricing";

type PriceBlockProps = {
  price: FormattedPrice | null;
  className?: string;
};

export default function PriceBlock({ price, className = "" }: PriceBlockProps) {
  if (!price) return null;

  return (
    <div
      className={`border-y border-peach/55 bg-peach-soft/40 px-3 py-2.5 text-graphite dark:border-[#d99677]/45 dark:bg-[#3b2b25]/45 dark:text-white ${className}`}
    >
      <p className="text-lg font-light leading-tight">
        {price.displayText}
      </p>
      {price.unitText ? (
        <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-peach dark:text-[#ebb49a]">
          {price.unitText}
        </p>
      ) : null}
    </div>
  );
}
