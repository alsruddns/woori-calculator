export function isAdsEnabled(value: string | undefined): boolean {
  return value === "true";
}

export const ADS_ENABLED = isAdsEnabled(process.env.NEXT_PUBLIC_ADS_ENABLED);
