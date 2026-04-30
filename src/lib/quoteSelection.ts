export const quoteSelectionEventName = "luxetex:quote-selection";

export type QuoteSelection = {
  selectedProduct?: string;
  selectedMaterial?: string;
  selectedPrice?: string;
  selectedUnit?: string;
  quoteSource?: string;
};

export function dispatchQuoteSelection(selection: QuoteSelection) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<QuoteSelection>(quoteSelectionEventName, {
      detail: selection
    })
  );
}

export function scrollToQuoteForm() {
  if (typeof document === "undefined") return;
  document
    .getElementById("quote-form")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
