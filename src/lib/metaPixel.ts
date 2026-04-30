type PixelPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function isMetaPixelEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID);
}

export function trackMetaEvent(eventName: string, payload?: PixelPayload) {
  if (typeof window === "undefined" || !window.fbq || !isMetaPixelEnabled()) {
    return;
  }

  window.fbq("trackCustom", eventName, payload || {});
}

export function trackStandardMetaEvent(
  eventName: "PageView" | "ViewContent" | "Contact" | "Lead",
  payload?: PixelPayload
) {
  if (typeof window === "undefined" || !window.fbq || !isMetaPixelEnabled()) {
    return;
  }

  window.fbq("track", eventName, payload || {});
}
