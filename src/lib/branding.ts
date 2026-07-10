import type { SettingsContent } from "@/lib/types";

export const BRAND_NAME_MAX_LENGTH = 32;
export const BRAND_DESCRIPTOR_MAX_LENGTH = 32;

export function getFullBrandName(
  settings: Pick<SettingsContent, "brandName" | "brandDescriptor" | "siteName">
) {
  const fullName = [settings.brandName?.trim(), settings.brandDescriptor?.trim()]
    .filter(Boolean)
    .join(" ");

  return fullName || settings.siteName?.trim() || "Hotel Textiles";
}

export function deriveBrandSettings(
  settings: Partial<SettingsContent>
): Pick<SettingsContent, "brandName" | "brandDescriptor" | "siteName"> {
  const brandDescriptor = settings.brandDescriptor?.trim() ?? "Hotel Textiles";
  const legacySiteName = settings.siteName?.trim() || "LuxeTex Hotel Textiles";
  const suffix = brandDescriptor ? ` ${brandDescriptor}` : "";
  const brandName =
    settings.brandName?.trim() ||
    (suffix && legacySiteName.endsWith(suffix)
      ? legacySiteName.slice(0, -suffix.length).trim()
      : legacySiteName);

  return {
    brandName: brandName || "LuxeTex",
    brandDescriptor,
    siteName: [brandName || "LuxeTex", brandDescriptor]
      .filter(Boolean)
      .join(" ")
  };
}

export function replaceBrandReference(
  value: unknown,
  oldBrandName: string,
  oldFullName: string,
  nextBrandName: string,
  nextFullName: string
) {
  if (typeof value !== "string") return value;

  let next = value;
  if (oldFullName && oldFullName !== oldBrandName) {
    const fullNameMarker = "__BRAND_FULL_NAME__";
    next = next.split(oldFullName).join(fullNameMarker);
    if (oldBrandName) {
      next = next.split(oldBrandName).join(nextBrandName);
    }
    return next.split(fullNameMarker).join(nextFullName);
  }
  if (oldBrandName) {
    next = next.split(oldBrandName).join(nextBrandName);
  }
  return next;
}
