"use client";

import { useMemo, useState, type FormEvent } from "react";
import { calculateBySlug } from "@/calculators/calculate";
import { units, type LinearUnit } from "@/calculators/conversion/convert";
import { formatNumber } from "@/lib/formatter/number";
import { formatCurrency, formatLocalizedInput, isCurrencyCode, parseLocalizedNumber, unformatLocalizedInput, type CurrencyCode } from "@/lib/formatter/currency";
import { CurrencySelector, saveCurrency, useSelectedCurrency } from "@/components/calculator/currency-selector";
import { normalizeDuration, durationForCalculator, type DurationUnit } from "@/lib/calculators/duration";
import { numberToKoreanText } from "@/lib/formatter/korean-number";
import type { SupportedLocale } from "@/i18n/config";
import type { LocaleDictionary, LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import type { CalculatorField, CalculatorOutcome } from "@/types/calculator-page";
import { ResultTable } from "@/components/calculator/ResultTable";

type CalculatorFormProps = { slug: string; fields: readonly CalculatorField[]; locale?: SupportedLocale; dictionary?: Pick<LocaleDictionary, "detail" | "units" | "common">; content?: LocalizedCalculatorContent };

const unitLabels: Record<string, string> = Object.fromEntries(Object.entries(units).map(([key, unit]) => [key, unit.label]));
const currencyFieldNames = new Set(["principal", "monthly", "price", "sale", "amount", "gross", "income", "homePrice", "loan", "salary", "wage", "rent", "cost", "unitPrice", "existingAveragePrice", "additionalPrice", "currentAveragePrice", "currentPrice", "shipping", "otherCost", "mortgage", "repayment", "otherInterest", "annualExpenses", "annualDividendPerShare", "currentSavings", "targetValue", "accountSize", "entryPrice", "stopPrice", "buyPrice", "sellPrice", "lumpSum", "purchaseCosts", "transport", "lodgingPerNight", "dailyFoodPerPerson", "activities", "localTransport", "other", "targetAnnualRevenue", "annualBusinessCosts", "fixedCosts", "pricePerUnit", "variableCostPerUnit"]);
function localizedResultUnit(unit: string | undefined, locale: SupportedLocale) {
  if (!unit || locale === "ko") return unit;
  if (locale === "ru") return unit;
  if (unit === "세") return ({ en: "years old", ja: "歳", zh: "岁", es: "años", "pt-br": "anos", de: "Jahre", fr: "ans", vi: "tuổi", id: "tahun", th: "ปี", "zh-tw": "歲", it: "anni", nl: "jaar", hi: "वर्ष" })[locale];
  if (unit === "평") return ({ en: "pyeong", ja: "坪", zh: "坪", es: "pyeong", "pt-br": "pyeong", de: "Pyeong", fr: "pyeong", vi: "pyeong", id: "pyeong", th: "พย็อง", "zh-tw": "坪", it: "pyeong", nl: "pyeong", hi: "प्योंग" })[locale];
  if (unit.startsWith("일")) {
    const day = ({ en: "days", ja: "日", zh: "天", es: "días", "pt-br": "dias", de: "Tage", fr: "jours", vi: "ngày", id: "hari", th: "วัน", "zh-tw": "天", it: "giorni", nl: "dagen", hi: "दिन" })[locale];
    return `${day}${unit.slice(1)}`;
  }
  return unit;
}
const conversionUnitLabels: Partial<Record<SupportedLocale, Record<string, string>>> = {
  ko: { c: "섭씨 (°C)", f: "화씨 (°F)" }, en: { c: "Celsius (°C)", f: "Fahrenheit (°F)" }, ja: { c: "摂氏 (°C)", f: "華氏 (°F)" }, zh: { c: "摄氏 (°C)", f: "华氏 (°F)" },
  es: { c: "Celsius (°C)", f: "Fahrenheit (°F)" }, "pt-br": { c: "Celsius (°C)", f: "Fahrenheit (°F)" }, de: { c: "Celsius (°C)", f: "Fahrenheit (°F)" }, fr: { c: "Celsius (°C)", f: "Fahrenheit (°F)" },
  vi: { c: "Độ C (°C)", f: "Độ F (°F)" }, id: { c: "Celsius (°C)", f: "Fahrenheit (°F)" }, th: { c: "เซลเซียส (°C)", f: "ฟาเรนไฮต์ (°F)" }, "zh-tw": { c: "攝氏 (°C)", f: "華氏 (°F)" },
  it: { c: "Celsius (°C)", f: "Fahrenheit (°F)" }, nl: { c: "Celsius (°C)", f: "Fahrenheit (°F)" }, hi: { c: "सेल्सियस (°C)", f: "फ़ारेनहाइट (°F)" },
};
const linearUnitLabels: Partial<Record<SupportedLocale, Record<LinearUnit, string>>> = {
  en: { mm: "Millimeters (mm)", cm: "Centimeters (cm)", m: "Meters (m)", km: "Kilometers (km)", inch: "Inches (in)", ft: "Feet (ft)", yard: "Yards (yd)", mile: "Miles (mi)", mg: "Milligrams (mg)", g: "Grams (g)", kg: "Kilograms (kg)", oz: "Ounces (oz)", lb: "Pounds (lb)", ml: "Milliliters (mL)", l: "Liters (L)" },
  ja: { mm: "ミリメートル (mm)", cm: "センチメートル (cm)", m: "メートル (m)", km: "キロメートル (km)", inch: "インチ (in)", ft: "フィート (ft)", yard: "ヤード (yd)", mile: "マイル (mi)", mg: "ミリグラム (mg)", g: "グラム (g)", kg: "キログラム (kg)", oz: "オンス (oz)", lb: "ポンド (lb)", ml: "ミリリットル (mL)", l: "リットル (L)" },
  zh: { mm: "毫米 (mm)", cm: "厘米 (cm)", m: "米 (m)", km: "千米 (km)", inch: "英寸 (in)", ft: "英尺 (ft)", yard: "码 (yd)", mile: "英里 (mi)", mg: "毫克 (mg)", g: "克 (g)", kg: "千克 (kg)", oz: "盎司 (oz)", lb: "磅 (lb)", ml: "毫升 (mL)", l: "升 (L)" },
  es: { mm: "Milímetros (mm)", cm: "Centímetros (cm)", m: "Metros (m)", km: "Kilómetros (km)", inch: "Pulgadas (in)", ft: "Pies (ft)", yard: "Yardas (yd)", mile: "Millas (mi)", mg: "Miligramos (mg)", g: "Gramos (g)", kg: "Kilogramos (kg)", oz: "Onzas (oz)", lb: "Libras (lb)", ml: "Mililitros (mL)", l: "Litros (L)" },
  "pt-br": { mm: "Milímetros (mm)", cm: "Centímetros (cm)", m: "Metros (m)", km: "Quilômetros (km)", inch: "Polegadas (in)", ft: "Pés (ft)", yard: "Jardas (yd)", mile: "Milhas (mi)", mg: "Miligramas (mg)", g: "Gramas (g)", kg: "Quilogramas (kg)", oz: "Onças (oz)", lb: "Libras (lb)", ml: "Mililitros (mL)", l: "Litros (L)" },
  de: { mm: "Millimeter (mm)", cm: "Zentimeter (cm)", m: "Meter (m)", km: "Kilometer (km)", inch: "Zoll (in)", ft: "Fuß (ft)", yard: "Yard (yd)", mile: "Meilen (mi)", mg: "Milligramm (mg)", g: "Gramm (g)", kg: "Kilogramm (kg)", oz: "Unzen (oz)", lb: "Pfund (lb)", ml: "Milliliter (mL)", l: "Liter (L)" },
  fr: { mm: "Millimètres (mm)", cm: "Centimètres (cm)", m: "Mètres (m)", km: "Kilomètres (km)", inch: "Pouces (in)", ft: "Pieds (ft)", yard: "Verges (yd)", mile: "Milles (mi)", mg: "Milligrammes (mg)", g: "Grammes (g)", kg: "Kilogrammes (kg)", oz: "Onces (oz)", lb: "Livres (lb)", ml: "Millilitres (mL)", l: "Litres (L)" },
  vi: { mm: "Milimét (mm)", cm: "Xentimét (cm)", m: "Mét (m)", km: "Kilômét (km)", inch: "Inch (in)", ft: "Feet (ft)", yard: "Yard (yd)", mile: "Dặm (mi)", mg: "Miligam (mg)", g: "Gam (g)", kg: "Kilôgam (kg)", oz: "Ounce (oz)", lb: "Pound (lb)", ml: "Mililít (mL)", l: "Lít (L)" },
  id: { mm: "Milimeter (mm)", cm: "Sentimeter (cm)", m: "Meter (m)", km: "Kilometer (km)", inch: "Inci (in)", ft: "Kaki (ft)", yard: "Yard (yd)", mile: "Mil (mi)", mg: "Miligram (mg)", g: "Gram (g)", kg: "Kilogram (kg)", oz: "Ons (oz)", lb: "Pon (lb)", ml: "Mililiter (mL)", l: "Liter (L)" },
  th: { mm: "มิลลิเมตร (mm)", cm: "เซนติเมตร (cm)", m: "เมตร (m)", km: "กิโลเมตร (km)", inch: "นิ้ว (in)", ft: "ฟุต (ft)", yard: "หลา (yd)", mile: "ไมล์ (mi)", mg: "มิลลิกรัม (mg)", g: "กรัม (g)", kg: "กิโลกรัม (kg)", oz: "ออนซ์ (oz)", lb: "ปอนด์ (lb)", ml: "มิลลิลิตร (mL)", l: "ลิตร (L)" },
  "zh-tw": { mm: "毫米 (mm)", cm: "公分 (cm)", m: "公尺 (m)", km: "公里 (km)", inch: "英吋 (in)", ft: "英尺 (ft)", yard: "碼 (yd)", mile: "英里 (mi)", mg: "毫克 (mg)", g: "公克 (g)", kg: "公斤 (kg)", oz: "盎司 (oz)", lb: "磅 (lb)", ml: "毫升 (mL)", l: "公升 (L)" },
  it: { mm: "Millimetri (mm)", cm: "Centimetri (cm)", m: "Metri (m)", km: "Chilometri (km)", inch: "Pollici (in)", ft: "Piedi (ft)", yard: "Iarde (yd)", mile: "Miglia (mi)", mg: "Milligrammi (mg)", g: "Grammi (g)", kg: "Chilogrammi (kg)", oz: "Once (oz)", lb: "Libbre (lb)", ml: "Millilitri (mL)", l: "Litri (L)" },
  nl: { mm: "Millimeter (mm)", cm: "Centimeter (cm)", m: "Meter (m)", km: "Kilometer (km)", inch: "Inch (in)", ft: "Voet (ft)", yard: "Yard (yd)", mile: "Mijl (mi)", mg: "Milligram (mg)", g: "Gram (g)", kg: "Kilogram (kg)", oz: "Ons (oz)", lb: "Pond (lb)", ml: "Milliliter (mL)", l: "Liter (L)" },
  hi: { mm: "मिलीमीटर (mm)", cm: "सेंटीमीटर (cm)", m: "मीटर (m)", km: "किलोमीटर (km)", inch: "इंच (in)", ft: "फुट (ft)", yard: "गज (yd)", mile: "मील (mi)", mg: "मिलीग्राम (mg)", g: "ग्राम (g)", kg: "किलोग्राम (kg)", oz: "औंस (oz)", lb: "पाउंड (lb)", ml: "मिलीलीटर (mL)", l: "लीटर (L)" },
};
const optionsFor = (field: CalculatorField, values: Record<string, string>, locale: SupportedLocale) => {
  if (field.name !== "fromUnit" && field.name !== "toUnit") return field.options ?? [];
  const category = values.category ?? "length";
  if (category === "temperature") { const labels = conversionUnitLabels[locale] ?? conversionUnitLabels.en!; return [{ label: labels.c!, value: "c" }, { label: labels.f!, value: "f" }]; }
  const labels = locale === "ko" ? unitLabels : (linearUnitLabels[locale] ?? linearUnitLabels.en!);
  return (Object.keys(units) as LinearUnit[]).filter((key) => units[key].category === category).map((key) => ({ label: labels[key]!, value: key }));
};

export function CalculatorForm({ slug, fields, locale = "ko", dictionary, content }: CalculatorFormProps) {
  const initial = useMemo(() => Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? ""])), [fields]);
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [outcome, setOutcome] = useState<CalculatorOutcome | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const currency = useSelectedCurrency(locale);
  const duration = durationForCalculator(slug);
  const [durationUnit, setDurationUnit] = useState<DurationUnit>(duration?.inputUnit ?? "month");
  const usesCurrency = fields.some((field) => currencyFieldNames.has(field.name) || /^(KRW|JPY|USD|EUR|원|円)$/.test(field.unit ?? ""));

  function changeCurrency(next: CurrencyCode) {
    saveCurrency(next);
  }

  function formattedResultValue(value: string | number, unit: string | undefined, digits = 2): string {
    if (typeof value !== "number") return value;
    if (unit === String.fromCodePoint(0xC6D0) || unit === "円" || (unit !== undefined && isCurrencyCode(unit))) return formatCurrency(value, currency, locale);
    return formatNumber(value, digits, locale);
  }

  function changeValue(name: string, value: string) {
    setValues((current) => {
      const next = { ...current, [name]: value };
      if (slug === "unit-converter" && name === "category") {
        const isTemperature = value === "temperature";
        next.fromUnit = isTemperature ? "c" : value === "length" ? "m" : value === "weight" ? "g" : "ml";
        next.toUnit = isTemperature ? "f" : value === "length" ? "km" : value === "weight" ? "kg" : "l";
      }
      return next;
    });
    setOutcome(null);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = { ...values };
    for (const field of fields) {
      if ((field.type ?? "number") !== "number") continue;
      const parsed = parseLocalizedNumber(values[field.name] ?? "", locale);
      if (parsed !== undefined) normalized[field.name] = String(parsed);
    }
    if (duration) {
      const input = parseLocalizedNumber(values[duration.field] ?? "", locale) ?? Number.NaN;
      if (Number.isFinite(input)) {
        const months = normalizeDuration(input, durationUnit);
        normalized[duration.field] = String(duration.inputUnit === "month" ? months : months / 12);
      }
    }
    setOutcome(calculateBySlug(slug, normalized));
  }

  function resetForm() {
    setValues(initial);
    setOutcome(null);
    setCopyState("idle");
    setDurationUnit(duration?.inputUnit ?? "month");
  }

  const error = outcome && "error" in outcome ? outcome : null;
  const success = outcome && "results" in outcome ? outcome : null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-label={dictionary?.detail.calculators ?? "Calculator input and result"}>
      {usesCurrency ? <CurrencySelector locale={locale} currency={currency} onChange={changeCurrency} /> : null}
      <form onSubmit={submit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.filter((field) => (!field.showWhen || values[field.showWhen.field] === field.showWhen.value) && (!field.showWhenAll || field.showWhenAll.every((condition) => values[condition.field] === condition.value))).map((field) => {
            const fieldError = error?.field === field.name ? (content?.validation ?? error.error) : undefined;
            const fieldUnit = content?.fields[field.name]?.unit ?? field.unit ?? "";
            const isCurrencyField = currencyFieldNames.has(field.name) || fieldUnit === String.fromCodePoint(0xC6D0) || fieldUnit === "円" || isCurrencyCode(fieldUnit);
            const inputId = `${slug}-${field.name}`;
            const describedBy = fieldError ? `${inputId}-error` : undefined;
            const commonClass = "mt-2 min-h-12 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20";
            return (
              <div key={field.name} className={`min-w-0 ${field.type === "textarea" ? "sm:col-span-2" : ""}`}>
                {(slug === "fuel-efficiency" || slug === "ratio") && field.name === "mode" ? <span id={`${inputId}-label`} className="block text-sm font-semibold text-slate-800">{content?.fields[field.name]?.label ?? field.label}</span> : <label htmlFor={inputId} className="block text-sm font-semibold text-slate-800">{field.name === duration?.field ? (dictionary?.units.durationLabel ?? "기간") : (content?.fields[field.name]?.label ?? field.label)}</label>}
                {(slug === "fuel-efficiency" || slug === "ratio") && field.name === "mode" ? (
                  <div role="group" aria-labelledby={`${inputId}-label`} aria-describedby={describedBy} className={`mt-2 grid gap-2 ${slug === "ratio" ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
                    {optionsFor(field, values, locale).map((option) => {
                      const selected = values[field.name] === option.value;
                      return <button key={option.value} type="button" aria-pressed={selected} className={`min-h-12 min-w-0 rounded-lg border px-2 py-2 text-center text-xs font-semibold leading-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 sm:text-sm ${selected ? "border-teal-800 bg-teal-50 text-teal-950" : "border-slate-300 bg-white text-slate-700 hover:border-teal-700"}`} onClick={() => changeValue(field.name, option.value)}>{content?.options[field.name]?.[option.value] ?? option.label}</button>;
                    })}
                  </div>
                ) : field.type === "select" ? (
                  <select id={inputId} className={`${commonClass} text-sm sm:text-base`} value={values[field.name] ?? ""} onChange={(event) => changeValue(field.name, event.target.value)} aria-describedby={describedBy}>
                    {optionsFor(field, values, locale).map((option) => <option key={option.value} value={option.value}>{content?.options[field.name]?.[option.value] ?? option.label}</option>)}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea id={inputId} maxLength={slug === "ratio" ? 128 : 30_000} className={`${commonClass} min-h-28 py-3 text-base`} value={values[field.name] ?? ""} onChange={(event) => changeValue(field.name, event.target.value)} placeholder={content?.fields[field.name]?.placeholder ?? field.placeholder} aria-describedby={describedBy} />
                ) : (
                  <div className={field.name === duration?.field ? "mt-2 grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2" : "relative"}>
                    <div className="relative min-w-0">
                    <input
                      id={inputId}
                      className={`${field.name === duration?.field ? commonClass.replace("mt-2 ", "") : commonClass} text-base ${(content?.fields[field.name]?.unit ?? field.unit) ? "pr-16" : ""}`}
                      type={field.type === "date" ? "date" : "text"}
                      max={field.max}
                      maxLength={field.type === "date" ? 10 : 64}
                      inputMode={field.type === "date" ? undefined : "decimal"}
                      value={values[field.name] ?? ""}
                      onChange={(event) => changeValue(field.name, event.target.value)}
                      onFocus={(event) => {
                        if (field.type !== "date") {
                          const clean = unformatLocalizedInput(event.currentTarget.value, locale);
                          if (clean !== event.currentTarget.value) changeValue(field.name, clean);
                      }
                      }}
                      onBlur={(event) => {
                        if (field.type !== "date") changeValue(field.name, formatLocalizedInput(event.currentTarget.value, locale));
                      }}
                      placeholder={field.placeholder}
                      aria-describedby={describedBy}
                      aria-invalid={Boolean(fieldError)}
                    />
                    {(isCurrencyField || content?.fields[field.name]?.unit || field.unit) ? <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">{isCurrencyField ? currency : content?.fields[field.name]?.unit ?? field.unit}</span> : null}
                    </div>
                    {field.name === duration?.field ? <select aria-label={dictionary?.units.durationLabel ?? "기간 단위"} className="min-h-12 min-w-20 rounded-lg border border-slate-300 bg-white px-3 text-sm focus-visible:outline-2 focus-visible:outline-teal-700" value={durationUnit} onChange={(event) => setDurationUnit(event.target.value as DurationUnit)}><option value="month">{dictionary?.units.month ?? "개월"}</option><option value="year">{dictionary?.units.year ?? "년"}</option></select> : null}
                  </div>
                )}
                {locale === "ko" && currency === "KRW" && isCurrencyField && values[field.name] && Number.isInteger(Number((values[field.name] ?? "").replace(/,/g, ""))) ? <p className="mt-1 min-w-0 break-words text-xs leading-5 text-slate-500 [overflow-wrap:anywhere]">{numberToKoreanText(Number((values[field.name] ?? "").replace(/,/g, "")))} {dictionary?.units.won ?? "원"}</p> : null}
                {fieldError ? <p id={describedBy} role="alert" className="mt-1 min-w-0 break-words text-sm leading-5 text-red-700 [overflow-wrap:anywhere]">{fieldError}</p> : null}
              </div>
            );
          })}
        </div>
        {error && !error.field ? <p className="mt-5 min-w-0 break-words rounded-lg bg-red-50 px-4 py-3 text-sm leading-5 text-red-800 [overflow-wrap:anywhere]" role="alert">{content ? content.validation : error.error}</p> : null}
        <div className="mt-5 flex flex-wrap gap-3 sm:mt-6">
          <button type="submit" className="min-h-11 w-full rounded-lg bg-teal-800 px-5 font-semibold text-white hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 sm:w-auto">{dictionary?.common.calculate ?? dictionary?.detail.calculate ?? "Calculate"}</button>
          <button type="button" onClick={resetForm} className="min-h-11 rounded-lg border border-slate-300 bg-white px-5 font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">{dictionary?.common.reset ?? "Reset"}</button>
        </div>
      </form>

      {success ? (
        <section className="mt-7 rounded-xl bg-teal-50 p-5" aria-live="polite" aria-label={dictionary?.detail.result ?? "Result"}>
          <h2 className="text-base font-bold text-slate-950">{dictionary?.detail.result ?? "Result"}</h2>
          <button type="button" className="mt-3 min-h-10 rounded-lg border border-teal-800 px-4 text-sm font-semibold text-teal-900 hover:bg-white" onClick={async () => {
            try { await navigator.clipboard.writeText(success.results.map((item) => `${content?.resultLabels[item.label] ?? item.label}: ${formattedResultValue(item.value, item.unit, item.precision ?? 2)}`).join("\n")); setCopyState("copied"); }
            catch { setCopyState("error"); }
          }}>{copyState === "copied" ? dictionary?.common.copied ?? "Copied" : dictionary?.common.copy ?? "Copy"}</button>
          {copyState !== "idle" ? <p className="mt-2 text-sm" role="status">{copyState === "copied" ? dictionary?.common.copied ?? "Copied" : dictionary?.common.copyError ?? "Could not copy."}</p> : null}
          <dl className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {success.results.map((item, index) => {
              const resultUnit = localizedResultUnit(item.unit, locale);
              const isMoney = item.unit === String.fromCodePoint(0xC6D0) || item.unit === "円" || (item.unit !== undefined && isCurrencyCode(item.unit));
              const value = typeof item.value === "number" ? (isMoney ? formatCurrency(item.value, currency, locale) : `${formatNumber(item.value, item.precision ?? 2, locale)}${resultUnit ? ` ${resultUnit}` : ""}`) : item.value;
              return <div key={`${item.label}-${index}`} className="min-w-0 rounded-lg bg-white px-3 py-3 sm:px-4"><dt className="break-words text-sm leading-5 text-slate-600 [overflow-wrap:anywhere]">{content?.resultLabels[item.label] ?? content?.resultLabels[`__result_${index}`] ?? item.label}</dt><dd className="mt-1 break-words text-lg font-bold tabular-nums text-teal-900 [overflow-wrap:anywhere] sm:text-xl">{value}</dd></div>;
            })}
          </dl>
          {success.table ? <ResultTable table={success.table} locale={locale} currency={currency} /> : null}
          {success.note ? <p className="mt-4 text-sm leading-6 text-slate-700">{content?.resultNote ?? success.note}</p> : null}
        </section>
      ) : null}
    </section>
  );
}
