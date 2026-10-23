import { localeConfig, type SupportedLocale } from "@/i18n/config";

export function formatNumber(value: number, maximumFractionDigits = 2, locale: SupportedLocale = "ko"): string {
  if (!Number.isFinite(value)) return "—";
  const requestedDigits = Number.isFinite(maximumFractionDigits) ? Math.trunc(maximumFractionDigits) : 2;
  const digits = Math.max(0, Math.min(20, requestedDigits));
  const normalized = Object.is(value, -0) || Math.abs(value) < 0.5 * 10 ** -digits ? 0 : value;
  const localeTag = localeConfig[locale].intlLocale;
  return new Intl.NumberFormat(localeTag, { maximumFractionDigits: digits }).format(normalized);
}

export function formatInputNumber(value: string): string {
  if (!value || value === "-" || value === "." || value === "-.") return value;
  const negative = value.startsWith("-");
  const normalized = value.replace(/,/g, "").replace(/[^\d.]/g, "");
  const [integer = "", ...fractionParts] = normalized.split(".");
  const fraction = fractionParts.join("");
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${negative ? "-" : ""}${grouped}${fractionParts.length ? `.${fraction}` : ""}`;
}

export function formatKrw(value: number, maximumFractionDigits = 0, locale: SupportedLocale = "ko"): string {
  if (!Number.isFinite(value)) return "—";
  const formatted = formatNumber(value, maximumFractionDigits, locale);
  if (locale === "ko") return `${formatted}원`;
  if (locale === "en" || locale === "ja" || locale === "zh") return `KRW ${formatted}`;
  return new Intl.NumberFormat(localeConfig[locale].intlLocale, { style: "currency", currency: "KRW", maximumFractionDigits }).format(value);
}

export function formatJpy(value: number, maximumFractionDigits = 0, locale: SupportedLocale = "ko"): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(localeConfig[locale].intlLocale, { style: "currency", currency: "JPY", maximumFractionDigits }).format(Object.is(value, -0) ? 0 : value);
}
