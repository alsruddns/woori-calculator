"use client";

import { useMemo, useState, type FormEvent } from "react";
import { calculateBySlug } from "@/calculators/calculate";
import { units, type LinearUnit } from "@/calculators/conversion/convert";
import { formatInputNumber, formatKrw, formatNumber } from "@/lib/formatter/number";
import type { CalculatorField, CalculatorOutcome } from "@/types/calculator-page";

type CalculatorFormProps = { slug: string; fields: readonly CalculatorField[] };

const unitLabels: Record<string, string> = Object.fromEntries(Object.entries(units).map(([key, unit]) => [key, unit.label]));
const optionsFor = (field: CalculatorField, values: Record<string, string>) => {
  if (field.name !== "fromUnit" && field.name !== "toUnit") return field.options ?? [];
  const category = values.category ?? "length";
  if (category === "temperature") return [{ label: "섭씨 (°C)", value: "c" }, { label: "화씨 (°F)", value: "f" }];
  return (Object.keys(units) as LinearUnit[]).filter((key) => units[key].category === category).map((key) => ({ label: unitLabels[key]!, value: key }));
};

export function CalculatorForm({ slug, fields }: CalculatorFormProps) {
  const initial = useMemo(() => Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? ""])), [fields]);
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [outcome, setOutcome] = useState<CalculatorOutcome | null>(null);

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
    setOutcome(calculateBySlug(slug, values));
  }

  const error = outcome && "error" in outcome ? outcome : null;
  const success = outcome && "results" in outcome ? outcome : null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-label="계산기 입력과 결과">
      <form onSubmit={submit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.filter((field) => !field.showWhen || values[field.showWhen.field] === field.showWhen.value).map((field) => {
            const fieldError = error?.field === field.name ? error.error : undefined;
            const inputId = `${slug}-${field.name}`;
            const describedBy = fieldError ? `${inputId}-error` : undefined;
            const commonClass = "mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20";
            return (
              <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                <label htmlFor={inputId} className="block text-sm font-semibold text-slate-800">{field.label}</label>
                {field.type === "select" ? (
                  <select id={inputId} className={commonClass} value={values[field.name] ?? ""} onChange={(event) => changeValue(field.name, event.target.value)} aria-describedby={describedBy}>
                    {optionsFor(field, values).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea id={inputId} className={`${commonClass} min-h-28 py-3`} value={values[field.name] ?? ""} onChange={(event) => changeValue(field.name, event.target.value)} placeholder={field.placeholder} aria-describedby={describedBy} />
                ) : (
                  <div className="relative">
                    <input
                      id={inputId}
                      className={`${commonClass} ${field.unit ? "pr-16" : ""}`}
                      type={field.type === "date" ? "date" : "text"}
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
                    {field.unit ? <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">{field.unit}</span> : null}
                  </div>
                )}
                {fieldError ? <p id={describedBy} className="mt-1 text-sm text-red-700">{fieldError}</p> : null}
              </div>
            );
          })}
        </div>
        {error && !error.field ? <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{error.error}</p> : null}
        <button type="submit" className="mt-6 min-h-12 w-full rounded-lg bg-teal-800 px-5 font-semibold text-white hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 sm:w-auto">계산하기</button>
      </form>

      {success ? (
        <section className="mt-7 rounded-xl bg-teal-50 p-5" aria-live="polite" aria-label="계산 결과">
          <h2 className="text-base font-bold text-slate-950">계산 결과</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {success.results.map((item) => {
              const value = typeof item.value === "number" ? (item.unit === "원" ? formatKrw(item.value) : `${formatNumber(item.value, item.precision ?? 2)}${item.unit ? ` ${item.unit}` : ""}`) : item.value;
              return <div key={item.label} className="rounded-lg bg-white px-4 py-3"><dt className="text-sm text-slate-600">{item.label}</dt><dd className="mt-1 break-words text-xl font-bold tabular-nums text-teal-900">{value}</dd></div>;
            })}
          </dl>
          {success.note ? <p className="mt-4 text-sm leading-6 text-slate-700">{success.note}</p> : null}
        </section>
      ) : null}
    </section>
  );
}
