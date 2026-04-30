export const utmKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term"
] as const;

export type UtmKey = (typeof utmKeys)[number];
export type UtmValues = Record<UtmKey, string>;

const storagePrefix = "luxetex_";

export function captureUtmParams() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);

  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) window.sessionStorage.setItem(`${storagePrefix}${key}`, value);
  });
}

export function getStoredUtmValues(): UtmValues {
  const values = {} as UtmValues;

  utmKeys.forEach((key) => {
    values[key] =
      typeof window === "undefined"
        ? ""
        : window.sessionStorage.getItem(`${storagePrefix}${key}`) || "";
  });

  return values;
}
