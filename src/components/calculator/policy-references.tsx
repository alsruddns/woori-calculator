import { localeConfig, type SupportedLocale } from "@/i18n/config";
import { contentPatterns } from "@/i18n/dictionaries/content-patterns";
import type { CalculatorPageDefinition } from "@/types/calculator-page";

export function PolicyReferences({ locale, page }: { locale: SupportedLocale; page: CalculatorPageDefinition }) {
  if (locale === "ru") return null;
  if (page.policyType !== "POLICY") return null;
  const copy = contentPatterns[locale];
  const date = (value: string) => new Intl.DateTimeFormat(localeConfig[locale].intlLocale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${value}T00:00:00.000Z`));
  return <section className="mt-7 min-w-0 border-t border-slate-200 pt-5" aria-labelledby="policy-references-heading">
    <h3 id="policy-references-heading" className="font-bold text-slate-950">{copy.sourceHeading}</h3>
    {page.policyYear ? <p className="mt-2 text-sm text-slate-700">{copy.policyYear}: {page.policyYear}</p> : null}
    <p className="mt-1 text-sm text-slate-700">{copy.updated}: <time dateTime={page.updatedAt}>{date(page.updatedAt)}</time></p>
    {page.sources?.length ? <ul className="mt-3 space-y-3">{page.sources.map((source) => <li key={source.url} className="min-w-0"><a href={source.url} target="_blank" rel="noopener noreferrer" className="break-words text-sm font-medium text-teal-900 underline underline-offset-2 [overflow-wrap:anywhere] focus-visible:outline-2 focus-visible:outline-teal-800">{source.name}</a><p className="mt-1 text-xs text-slate-500">{copy.checked}: <time dateTime={source.checkedAt}>{date(source.checkedAt)}</time></p></li>)}</ul> : null}
  </section>;
}
