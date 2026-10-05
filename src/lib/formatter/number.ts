export function formatNumber(value: number, maximumFractionDigits = 2, locale: "ko" | "en" | "ja" | "zh" = "ko"): string {
  if (!Number.isFinite(value)) return "—";
  const requestedDigits = Number.isFinite(maximumFractionDigits) ? Math.trunc(maximumFractionDigits) : 2;
  const digits = Math.max(0, Math.min(20, requestedDigits));
  const normalized = Object.is(value, -0) || Math.abs(value) < 0.5 * 10 ** -digits ? 0 : value;
  const localeTag = locale === "ko" ? "ko-KR" : locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : "en-US";
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

export function formatKrw(value: number, maximumFractionDigits = 0, locale: "ko" | "en" | "ja" | "zh" = "ko"): string {
  if (!Number.isFinite(value)) return "—";
  const formatted = formatNumber(value, maximumFractionDigits, locale);
  return locale === "ko" ? `${formatted}원` : `KRW ${formatted}`;
}
