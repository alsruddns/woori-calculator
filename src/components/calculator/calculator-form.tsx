"use client";

import { useMemo, useState, type FormEvent } from "react";
import { calculateBySlug } from "@/calculators/calculate";
import { units, type LinearUnit } from "@/calculators/conversion/convert";
import { formatInputNumber, formatKrw, formatNumber } from "@/lib/formatter/number";
import { normalizeDuration, durationForCalculator, type DurationUnit } from "@/lib/calculators/duration";
import { numberToKoreanText } from "@/lib/formatter/korean-number";
import type { Locale } from "@/i18n/config";
import type { LocaleDictionary, LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import type { CalculatorField, CalculatorOutcome } from "@/types/calculator-page";
import { ResultTable } from "@/components/calculator/ResultTable";

type CalculatorFormProps = { slug: string; fields: readonly CalculatorField[]; locale?: Locale; dictionary?: Pick<LocaleDictionary, "detail" | "units" | "common">; content?: LocalizedCalculatorContent };

const unitLabels: Record<string, string> = Object.fromEntries(Object.entries(units).map(([key, unit]) => [key, unit.label]));
function localizedResultUnit(unit: string | undefined, locale: Locale) {
  if (!unit || locale === "ko") return unit;
  if (unit === "세") return ({ en: "years old", ja: "歳", zh: "岁", es: "años", "pt-br": "anos", de: "Jahre", fr: "ans", vi: "tuổi", id: "tahun", th: "ปี", "zh-tw": "歲", it: "anni", nl: "jaar", hi: "वर्ष" })[locale];
  if (unit === "평") return ({ en: "pyeong", ja: "坪", zh: "坪", es: "pyeong", "pt-br": "pyeong", de: "Pyeong", fr: "pyeong", vi: "pyeong", id: "pyeong", th: "พย็อง", "zh-tw": "坪", it: "pyeong", nl: "pyeong", hi: "प्योंग" })[locale];
  if (unit.startsWith("일")) {
    const day = ({ en: "days", ja: "日", zh: "天", es: "días", "pt-br": "dias", de: "Tage", fr: "jours", vi: "ngày", id: "hari", th: "วัน", "zh-tw": "天", it: "giorni", nl: "dagen", hi: "दिन" })[locale];
    return `${day}${unit.slice(1)}`;
  }
  return unit;
}
const optionsFor = (field: CalculatorField, values: Record<string, string>) => {
  if (field.name !== "fromUnit" && field.name !== "toUnit") return field.options ?? [];
  const category = values.category ?? "length";
  if (category === "temperature") return [{ label: "섭씨 (°C)", value: "c" }, { label: "화씨 (°F)", value: "f" }];
  return (Object.keys(units) as LinearUnit[]).filter((key) => units[key].category === category).map((key) => ({ label: unitLabels[key]!, value: key }));
};

export function CalculatorForm({ slug, fields, locale = "ko", dictionary, content }: CalculatorFormProps) {
  const initial = useMemo(() => Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? ""])), [fields]);
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [outcome, setOutcome] = useState<CalculatorOutcome | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const duration = durationForCalculator(slug);
  const [durationUnit, setDurationUnit] = useState<DurationUnit>(duration?.inputUnit ?? "month");

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
    if (duration) {
      const input = Number((values[duration.field] ?? "").replace(/,/g, ""));
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
      <form onSubmit={submit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.filter((field) => (!field.showWhen || values[field.showWhen.field] === field.showWhen.value) && (!field.showWhenAll || field.showWhenAll.every((condition) => values[condition.field] === condition.value))).map((field) => {
            const fieldError = error?.field === field.name ? (content?.validation ?? error.error) : undefined;
            const inputId = `${slug}-${field.name}`;
            const describedBy = fieldError ? `${inputId}-error` : undefined;
            const commonClass = "mt-2 min-h-12 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20";
            return (
              <div key={field.name} className={`min-w-0 ${field.type === "textarea" ? "sm:col-span-2" : ""}`}>
                {slug === "fuel-efficiency" && field.name === "mode" ? <span id={`${inputId}-label`} className="block text-sm font-semibold text-slate-800">{content?.fields[field.name]?.label ?? field.label}</span> : <label htmlFor={inputId} className="block text-sm font-semibold text-slate-800">{field.name === duration?.field ? (dictionary?.units.durationLabel ?? "기간") : (content?.fields[field.name]?.label ?? field.label)}</label>}
                {slug === "fuel-efficiency" && field.name === "mode" ? (
                  <div role="group" aria-labelledby={`${inputId}-label`} aria-describedby={describedBy} className="mt-2 grid grid-cols-3 gap-2">
                    {optionsFor(field, values).map((option) => {
                      const selected = values[field.name] === option.value;
                      return <button key={option.value} type="button" aria-pressed={selected} className={`min-h-12 min-w-0 rounded-lg border px-2 py-2 text-center text-xs font-semibold leading-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 sm:text-sm ${selected ? "border-teal-800 bg-teal-50 text-teal-950" : "border-slate-300 bg-white text-slate-700 hover:border-teal-700"}`} onClick={() => changeValue(field.name, option.value)}>{content?.options[field.name]?.[option.value] ?? option.label}</button>;
                    })}
                  </div>
                ) : field.type === "select" ? (
                  <select id={inputId} className={`${commonClass} text-sm sm:text-base`} value={values[field.name] ?? ""} onChange={(event) => changeValue(field.name, event.target.value)} aria-describedby={describedBy}>
                    {optionsFor(field, values).map((option) => <option key={option.value} value={option.value}>{content?.options[field.name]?.[option.value] ?? option.label}</option>)}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea id={inputId} maxLength={30_000} className={`${commonClass} min-h-28 py-3 text-base`} value={values[field.name] ?? ""} onChange={(event) => changeValue(field.name, event.target.value)} placeholder={content?.fields[field.name]?.placeholder ?? field.placeholder} aria-describedby={describedBy} />
                ) : (
                  <div className={field.name === duration?.field ? "mt-2 grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2" : "relative"}>
                    <div className="relative min-w-0">
                    <input
                      id={inputId}
                      className={`${field.name === duration?.field ? commonClass.replace("mt-2 ", "") : commonClass} text-base ${(content?.fields[field.name]?.unit ?? field.unit) ? "pr-16" : ""}`}
                      type={field.type === "date" ? "date" : "text"}
                      maxLength={field.type === "date" ? 10 : 64}
                      inputMode={field.type === "date" ? undefined : "decimal"}
                      value={values[field.name] ?? ""}
                      onChange={(event) => changeValue(field.name, event.target.value)}
                      onFocus={(event) => {
                        if (field.type !== "date") {
                          const clean = event.currentTarget.value.replace(/,/g, "");
                          if (clean !== event.currentTarget.value) changeValue(field.name, clean);
                      }
                      }}
                      onBlur={(event) => {
                        if (field.type !== "date") changeValue(field.name, formatInputNumber(event.currentTarget.value));
                      }}
                      placeholder={field.placeholder}
                      aria-describedby={describedBy}
                      aria-invalid={Boolean(fieldError)}
                    />
                    {(content?.fields[field.name]?.unit ?? field.unit) ? <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">{content?.fields[field.name]?.unit ?? field.unit}</span> : null}
                    </div>
                    {field.name === duration?.field ? <select aria-label={dictionary?.units.durationLabel ?? "기간 단위"} className="min-h-12 min-w-20 rounded-lg border border-slate-300 bg-white px-3 text-sm focus-visible:outline-2 focus-visible:outline-teal-700" value={durationUnit} onChange={(event) => setDurationUnit(event.target.value as DurationUnit)}><option value="month">{dictionary?.units.month ?? "개월"}</option><option value="year">{dictionary?.units.year ?? "년"}</option></select> : null}
                  </div>
                )}
                {locale === "ko" && ["principal", "monthly", "price", "sale", "amount", "gross", "income", "homePrice", "loan", "salary", "wage", "rent", "cost", "unitPrice", "existingAveragePrice", "additionalPrice", "currentAveragePrice", "currentPrice", "shipping", "otherCost", "mortgage", "repayment", "otherInterest"].includes(field.name) && values[field.name] && Number.isInteger(Number((values[field.name] ?? "").replace(/,/g, ""))) ? <p className="mt-1 min-w-0 break-words text-xs leading-5 text-slate-500 [overflow-wrap:anywhere]">{numberToKoreanText(Number((values[field.name] ?? "").replace(/,/g, "")))} {dictionary?.units.won ?? "원"}</p> : null}
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
            try { await navigator.clipboard.writeText(success.results.map((item) => `${content?.resultLabels[item.label] ?? item.label}: ${typeof item.value === "number" ? formatNumber(item.value, item.precision ?? 2, locale) : item.value}`).join("\n")); setCopyState("copied"); }
            catch { setCopyState("error"); }
          }}>{copyState === "copied" ? dictionary?.common.copied ?? "Copied" : dictionary?.common.copy ?? "Copy"}</button>
          {copyState !== "idle" ? <p className="mt-2 text-sm" role="status">{copyState === "copied" ? dictionary?.common.copied ?? "Copied" : dictionary?.common.copyError ?? "Could not copy."}</p> : null}
          <dl className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {success.results.map((item, index) => {
              const isMoney = item.unit === String.fromCodePoint(0xC6D0) || item.unit === "KRW";
              const resultUnit = localizedResultUnit(item.unit, locale);
              const value = typeof item.value === "number" ? (isMoney ? formatKrw(item.value, item.precision ?? 0, locale) : `${formatNumber(item.value, item.precision ?? 2, locale)}${resultUnit ? ` ${resultUnit}` : ""}`) : item.value;
              return <div key={`${item.label}-${index}`} className="min-w-0 rounded-lg bg-white px-3 py-3 sm:px-4"><dt className="break-words text-sm leading-5 text-slate-600 [overflow-wrap:anywhere]">{content?.resultLabels[item.label] ?? content?.resultLabels[`__result_${index}`] ?? item.label}</dt><dd className="mt-1 break-words text-lg font-bold tabular-nums text-teal-900 [overflow-wrap:anywhere] sm:text-xl">{value}</dd></div>;
            })}
          </dl>
          {success.table ? <ResultTable table={success.table} locale={locale} /> : null}
          {success.note ? <p className="mt-4 text-sm leading-6 text-slate-700">{content?.resultNote ?? success.note}</p> : null}
        </section>
      ) : null}
    </section>
  );
}
