import type { PriceData } from "./types";

export type FormattedPrice = {
  displayText: string;
  unitText: string;
  fullText: string;
  currency: "GEL";
  numericValue?: number;
};

function clean(value?: string) {
  return value?.trim() || "";
}

function parseNumeric(value: string) {
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function withUnit(displayText: string, unit?: string, numericValue?: number) {
  const unitText = clean(unit);

  return {
    displayText,
    unitText,
    fullText: unitText ? `${displayText} / ${unitText}` : displayText,
    currency: "GEL" as const,
    numericValue
  };
}

export function formatPriceDisplay(
  priceData?: Partial<PriceData> | null
): FormattedPrice | null {
  if (!priceData?.showPrice) return null;

  const note = clean(priceData.priceNote);
  const price = clean(priceData.price);
  const priceMin = clean(priceData.priceMin);
  const priceMax = clean(priceData.priceMax);

  if (priceData.priceType === "custom") {
    return withUnit(note || "Price available upon request");
  }

  if (priceData.priceType === "fixed") {
    if (!price) return note ? withUnit(note) : null;
    return withUnit(`${price} GEL`, priceData.unit, parseNumeric(price));
  }

  if (priceData.priceType === "from") {
    const fromPrice = price || priceMin;
    if (!fromPrice) return note ? withUnit(note) : null;
    return withUnit(
      `From ${fromPrice} GEL`,
      priceData.unit,
      parseNumeric(fromPrice)
    );
  }

  if (priceData.priceType === "range") {
    if (!priceMin || !priceMax) return note ? withUnit(note) : null;
    return withUnit(`${priceMin} - ${priceMax} GEL`, priceData.unit);
  }

  return note ? withUnit(note) : null;
}
