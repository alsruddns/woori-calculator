import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorForm } from "@/components/calculator/calculator-form";
import { CalculatorWorkspace } from "@/components/calculator/calculator-workspace";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/constants/site-config";
import { getCalculatorPage } from "@/data/calculator-content";
import { hasLocale, localeConfig, localizedCalculatorSlugs, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };
const categoryFor = (slug: string) => getCalculatorPage(slug)?.category ?? "math";

export function generateStaticParams() { return ["en", "ja", "zh"].flatMap((locale) => localizedCalculatorSlugs.map((slug) => ({ locale, slug }))); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: key, slug } = await params;
  if (!hasLocale(key) || key === "ko" || !localizedCalculatorSlugs.includes(slug as (typeof localizedCalculatorSlugs)[number])) return {};
  const page = getDictionary(key).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
  if (!page) return {};
  return localizedMetadata(key, `/${slug}`, page.title, page.description, page.keywords);
}

export default async function LocalizedCalculatorPage({ params }: Props) {
  const { locale: key, slug } = await params;
  if (!hasLocale(key) || key === "ko" || !localizedCalculatorSlugs.includes(slug as (typeof localizedCalculatorSlugs)[number])) notFound();
  const locale = key as Exclude<Locale, "ko">;
  const dictionary = getDictionary(locale);
  const content = dictionary.calculators[slug as keyof typeof dictionary.calculators]!;
  const source = getCalculatorPage(slug);
  if (!source) notFound();
  const category = categoryFor(slug);
  const path = `/${locale}/${slug}`;
  return <CalculatorWorkspace localizedItems={localizedCalculatorSlugs.map((id) => ({ slug: id, name: dictionary.calculators[id]!.name, keywords: dictionary.calculators[id]!.keywords, category: categoryFor(id) }))} categories={dictionary.categories} categoryOrder={dictionary.categoriesOrder} basePath={`/${locale}/calculators`} labels={{ menu: dictionary.nav.menu, search: dictionary.nav.search, close: dictionary.nav.close, empty: dictionary.nav.searchEmpty }}>
    <article className="min-w-0 py-4">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: dictionary.detail.home, item: `${siteConfig.serviceBaseUrl}/${locale}` }, { "@type": "ListItem", position: 2, name: dictionary.detail.calculators, item: `${siteConfig.serviceBaseUrl}/${locale}/calculators` }, { "@type": "ListItem", position: 3, name: content.name, item: `${siteConfig.serviceBaseUrl}${path}` }] }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: content.title, description: content.description, url: `${siteConfig.serviceBaseUrl}${path}`, inLanguage: localeConfig[locale].htmlLang }} />
      <nav aria-label={dictionary.calculatorList.breadcrumbCalculators} className="mb-5 flex flex-wrap items-center gap-x-2 break-words text-sm text-slate-500 [overflow-wrap:anywhere] sm:mb-6"><Link className="inline-flex min-h-11 items-center" href={`/${locale}`}>{dictionary.detail.home}</Link><span aria-hidden="true">/</span><Link className="inline-flex min-h-11 items-center" href={`/${locale}/calculators`}>{dictionary.detail.calculators}</Link><span aria-hidden="true">/</span><span aria-current="page">{content.name}</span></nav>
      <header className="mb-7 min-w-0 max-w-3xl"><p className="text-sm font-semibold text-teal-800">{dictionary.categories[category]}</p><h1 className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-3xl lg:text-4xl">{content.name}</h1><p className="mt-4 break-words leading-7 text-slate-600 [overflow-wrap:anywhere]">{content.description}</p></header>
      <CalculatorForm key={`${locale}-${slug}`} slug={slug} fields={source.fields} locale={locale} dictionary={{ detail: dictionary.detail, units: dictionary.units }} content={content} />
      <div className="mt-12 grid min-w-0 gap-10 xl:grid-cols-[minmax(0,1fr)_16rem]"><div className="min-w-0 space-y-10">
        <section><h2 className="text-xl font-bold">{dictionary.detail.howTo}</h2><p className="mt-3 leading-7 text-slate-700">{content.howTo}</p></section>
        <section><h2 className="text-xl font-bold">{dictionary.detail.formula}</h2><p className="mt-3 min-w-0 break-words rounded-xl bg-slate-100 px-3 py-4 font-medium leading-7 [overflow-wrap:anywhere] sm:px-4">{content.formula}</p></section>
        <section><h2 className="text-xl font-bold">{dictionary.detail.example}</h2><div className="mt-3 min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-5"><p className="break-words font-semibold [overflow-wrap:anywhere]">{content.example.question}</p><p className="mt-2 break-words leading-7 text-slate-700 [overflow-wrap:anywhere]">{content.example.answer}</p></div></section>
        <section><h2 className="text-xl font-bold">{dictionary.detail.faqs}</h2><dl className="mt-3 min-w-0 divide-y divide-slate-200 border-y border-slate-200">{content.faqs.map((faq) => <div key={faq.question} className="min-w-0 py-5"><dt className="break-words font-semibold [overflow-wrap:anywhere]">{faq.question}</dt><dd className="mt-2 break-words leading-7 text-slate-700 [overflow-wrap:anywhere]">{faq.answer}</dd></div>)}</dl></section>
      </div><aside className="min-w-0" aria-labelledby="related-heading"><h2 id="related-heading" className="text-lg font-bold">{dictionary.detail.related}</h2><ul className="mt-3 space-y-2">{content.related.map((relatedSlug) => { const item = dictionary.calculators[relatedSlug]; return item ? <li key={relatedSlug}><Link className="block min-w-0 break-words rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium [overflow-wrap:anywhere] hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-teal-700" href={`/${locale}/calculators/${relatedSlug}`}>{item.name}</Link></li> : null; })}</ul></aside></div>
    </article>
  </CalculatorWorkspace>;
}
