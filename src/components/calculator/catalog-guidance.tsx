import Link from "next/link";
import { catalogGuidance } from "@/i18n/catalog-guidance";
import { localePath, type Locale } from "@/i18n/config";

const recommended = ["percentage", "compound-interest", "loan-interest", "bmi"] as const;
const recentlyAdded = ["proportion", "aspect-ratio", "scale-ratio"] as const;

export function CatalogGuidance({ locale, names }: { locale: Locale; names: Readonly<Record<string, string>> }) {
  const copy = catalogGuidance(locale);
  const links = (slugs: readonly string[]) => <ul className="mt-3 flex flex-wrap gap-2">{slugs.map((slug) => names[slug] ? <li key={slug}><Link href={localePath(locale, `/calculators/${slug}`)} className="inline-flex min-h-11 items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-teal-900 hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">{names[slug]}</Link></li> : null)}</ul>;
  return <div className="mt-7 space-y-6">
    <p className="max-w-3xl leading-7 text-slate-700">{copy.intro}</p>
    <section aria-labelledby="recommended-calculators"><h2 id="recommended-calculators" className="text-lg font-bold text-slate-950">{copy.recommended}</h2>{links(recommended)}</section>
    <section aria-labelledby="recent-calculators"><h2 id="recent-calculators" className="text-lg font-bold text-slate-950">{copy.recent}</h2>{links(recentlyAdded)}</section>
  </div>;
}
