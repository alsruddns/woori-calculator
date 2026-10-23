export const currencyCodes = [
  "AUD", "BDT", "BRL", "CAD", "CHF", "CNY", "CZK", "EUR", "GBP", "HKD", "IDR", "INR", "JPY", "KRW", "MYR", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "UAH", "USD", "VND",
] as const;

export type CurrencyCode = (typeof currencyCodes)[number];

export type CurrencyOption = {
  code: CurrencyCode;
  intlLocale: string;
  nativeName: string;
};

export const currencyOptions: readonly CurrencyOption[] = [
  { code: "AUD", intlLocale: "en-AU", nativeName: "Australian dollar" },
  { code: "BDT", intlLocale: "bn-BD", nativeName: "বাংলাদেশি টাকা" },
  { code: "BRL", intlLocale: "pt-BR", nativeName: "Real brasileiro" },
  { code: "CAD", intlLocale: "en-CA", nativeName: "Canadian dollar" },
  { code: "CHF", intlLocale: "de-CH", nativeName: "Schweizer Franken" },
  { code: "CNY", intlLocale: "zh-CN", nativeName: "人民币" },
  { code: "CZK", intlLocale: "cs-CZ", nativeName: "česká koruna" },
  { code: "EUR", intlLocale: "de-DE", nativeName: "Euro" },
  { code: "GBP", intlLocale: "en-GB", nativeName: "British pound" },
  { code: "HKD", intlLocale: "zh-HK", nativeName: "港元" },
  { code: "IDR", intlLocale: "id-ID", nativeName: "Rupiah Indonesia" },
  { code: "INR", intlLocale: "hi-IN", nativeName: "भारतीय रुपया" },
  { code: "JPY", intlLocale: "ja-JP", nativeName: "日本円" },
  { code: "KRW", intlLocale: "ko-KR", nativeName: "대한민국 원" },
  { code: "MYR", intlLocale: "ms-MY", nativeName: "Ringgit Malaysia" },
  { code: "NZD", intlLocale: "en-NZ", nativeName: "New Zealand dollar" },
  { code: "PHP", intlLocale: "fil-PH", nativeName: "Piso ng Pilipinas" },
  { code: "PLN", intlLocale: "pl-PL", nativeName: "złoty polski" },
  { code: "RON", intlLocale: "ro-RO", nativeName: "leu românesc" },
  { code: "RUB", intlLocale: "ru-RU", nativeName: "Российский рубль" },
  { code: "SEK", intlLocale: "sv-SE", nativeName: "svensk krona" },
  { code: "SGD", intlLocale: "en-SG", nativeName: "Singapore dollar" },
  { code: "THB", intlLocale: "th-TH", nativeName: "บาทไทย" },
  { code: "TRY", intlLocale: "tr-TR", nativeName: "Türk lirası" },
  { code: "TWD", intlLocale: "zh-TW", nativeName: "新臺幣" },
  { code: "UAH", intlLocale: "uk-UA", nativeName: "українська гривня" },
  { code: "USD", intlLocale: "en-US", nativeName: "US dollar" },
  { code: "VND", intlLocale: "vi-VN", nativeName: "Đồng Việt Nam" },
] as const satisfies readonly CurrencyOption[];

export const defaultCurrencyByLocale = {
  ko: "KRW", en: "USD", ja: "JPY", zh: "CNY", es: "EUR", "pt-br": "BRL", de: "EUR", fr: "EUR", vi: "VND", id: "IDR", th: "THB", "zh-tw": "TWD", it: "EUR", nl: "EUR", hi: "INR",
  ru: "RUB", tr: "TRY", pl: "PLN", fil: "PHP", bn: "BDT", uk: "UAH", ms: "MYR", sv: "SEK", cs: "CZK", ro: "RON", el: "EUR",
} as const satisfies Record<string, CurrencyCode>;

export type CurrencyLocale = keyof typeof defaultCurrencyByLocale;

export function isCurrencyCode(value: string): value is CurrencyCode {
  return currencyCodes.includes(value as CurrencyCode);
}

export function formatCurrency(value: number, currency: CurrencyCode, locale: CurrencyLocale, maximumFractionDigits?: number): string {
  if (!Number.isFinite(value)) return "—";
  const intlLocale = localeToIntl(locale);
  const fractionDigits = maximumFractionDigits ?? new Intl.NumberFormat(intlLocale, { style: "currency", currency }).resolvedOptions().maximumFractionDigits ?? 2;
  const requestedDigits = Number.isFinite(fractionDigits) ? Math.trunc(fractionDigits) : 2;
  return new Intl.NumberFormat(intlLocale, { style: "currency", currency, maximumFractionDigits: Math.max(0, Math.min(20, requestedDigits)) }).format(Object.is(value, -0) ? 0 : value);
}

/** Parse a localized editable number without changing its numeric value. */
export function parseLocalizedNumber(input: string, locale: CurrencyLocale): number | undefined {
  const trimmed = input.trim().replace(/[\u00a0\u202f\u2009\s]/g, "");
  if (!trimmed || trimmed === "-" || trimmed === "." || trimmed === "," || trimmed === "-.") return undefined;
  const parts = new Intl.NumberFormat(localeToIntl(locale)).formatToParts(12345.6);
  const group = parts.find((part) => part.type === "group")?.value ?? ",";
  const decimal = parts.find((part) => part.type === "decimal")?.value ?? ".";
  const integerPart = trimmed.split(decimal)[0] ?? trimmed;
  const groupedParts = integerPart.split(group);
  if (groupedParts.length > 1) {
    const sampleGroups = new Intl.NumberFormat(localeToIntl(locale)).format(1234567890123).split(group);
    const validGrouping = groupedParts.length <= sampleGroups.length
      && groupedParts.every((part, index) => /^\d+$/.test(part)
        && (index === 0 ? part.length >= 1 && part.length <= sampleGroups[Math.max(0, sampleGroups.length - groupedParts.length)]!.length
          : part.length === sampleGroups[sampleGroups.length - groupedParts.length + index]!.length));
    if (!validGrouping) return undefined;
  }
  const normalized = trimmed.split(group).join("").replace(decimal, ".").replace(/[^\d.+-]/g, "");
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) return undefined;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function unformatLocalizedInput(input: string, locale: CurrencyLocale): string {
  const parts = new Intl.NumberFormat(localeToIntl(locale)).formatToParts(12345.6);
  const group = parts.find((part) => part.type === "group")?.value ?? ",";
  const decimal = parts.find((part) => part.type === "decimal")?.value ?? ".";
  return input.replace(/[\u00a0\u202f\u2009\s]/g, "").split(group).join("").replace(decimal, ".");
}

export function formatLocalizedInput(input: string, locale: CurrencyLocale): string {
  if (!input || input === "-" || input === "." || input === "-.") return input;
  const normalized = unformatLocalizedInput(input, locale);
  const negative = normalized.startsWith("-");
  const unsigned = normalized.replace(/[^\d.]/g, "");
  const [integerPart = "", ...fractionParts] = unsigned.split(".");
  const fraction = fractionParts.join("");
  let groupedInteger = integerPart;
  if (integerPart) {
    try { groupedInteger = new Intl.NumberFormat(localeToIntl(locale), { maximumFractionDigits: 0 }).format(BigInt(integerPart)); }
    catch { groupedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  }
  const decimal = new Intl.NumberFormat(localeToIntl(locale)).formatToParts(1.1).find((part) => part.type === "decimal")?.value ?? ".";
  return `${negative ? "-" : ""}${groupedInteger}${fractionParts.length ? `${decimal}${fraction}` : ""}`;
}

function localeToIntl(locale: CurrencyLocale): string {
  const overrides: Partial<Record<CurrencyLocale, string>> = { "pt-br": "pt-BR", "zh-tw": "zh-TW", fil: "fil-PH", bn: "bn-BD", uk: "uk-UA", ms: "ms-MY", sv: "sv-SE", cs: "cs-CZ", ro: "ro-RO", el: "el-GR", ru: "ru-RU", tr: "tr-TR", pl: "pl-PL" };
  const region: Partial<Record<CurrencyLocale, string>> = { ko: "KR", en: "US", ja: "JP", zh: "CN", es: "ES", de: "DE", fr: "FR", vi: "VN", id: "ID", th: "TH", it: "IT", nl: "NL", hi: "IN" };
  return overrides[locale] ?? `${locale}-${region[locale] ?? "US"}`;
}
