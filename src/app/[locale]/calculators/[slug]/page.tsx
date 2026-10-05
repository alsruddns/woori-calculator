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
const categoryFor = (slug: string) => slug === "vat" ? "tax" : ["age", "date-difference"].includes(slug) ? "date-time" : slug === "area" ? "life" : ["loan-interest", "compound-interest"].includes(slug) ? "finance" : "math";

export function generateStaticParams() { return ["en", "ja", "zh"].flatMap((locale) => localizedCalculatorSlugs.map((slug) => ({ locale, slug }))); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: key, slug } = await params;
  if (!hasLocale(key) || key === "ko" || !localizedCalculatorSlugs.includes(slug as (typeof localizedCalculatorSlugs)[number])) return {};
  const page = getDictionary(key).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
  return localizedMetadata(key, `/calculators/${slug}`, page.title, page.description);
}

export default async function LocalizedCalculatorPage({ params }: Props) {
  const { locale: key, slug } = await params;
  if (!hasLocale(key) || key === "ko" || !localizedCalculatorSlugs.includes(slug as (typeof localizedCalculatorSlugs)[number])) notFound();
  const locale = key as Exclude<Locale, "ko">;
  const dictionary = getDictionary(locale);
  const content = dictionary.calculators[slug as keyof typeof dictionary.calculators];
  const source = getCalculatorPage(slug);
  if (!source) notFound();
  const category = categoryFor(slug);
  const path = `/${locale}/calculators/${slug}`;
  return <CalculatorWorkspace localizedItems={localizedCalculatorSlugs.map((id) => ({ slug: id, name: dictionary.calculators[id].name, category: categoryFor(id) }))} categories={dictionary.categories} categoryOrder={dictionary.categoriesOrder} basePath={`/${locale}/calculators`} labels={{ menu: dictionary.nav.menu, search: dictionary.nav.search, close: dictionary.nav.close, empty: dictionary.nav.searchEmpty }}>
    <article className="min-w-0 py-4">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: dictionary.detail.home, item: `${siteConfig.url}/${locale}` }, { "@type": "ListItem", position: 2, name: dictionary.detail.calculators, item: `${siteConfig.url}/${locale}/calculators` }, { "@type": "ListItem", position: 3, name: content.name, item: `${siteConfig.url}${path}` }] }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: content.title, description: content.description, url: `${siteConfig.url}${path}`, inLanguage: localeConfig[locale].htmlLang }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500"><Link href={`/${locale}`}>{dictionary.detail.home}</Link><span aria-hidden="true" className="mx-2">/</span><Link href={`/${locale}/calculators`}>{dictionary.detail.calculators}</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">{content.name}</span></nav>
      <header className="mb-7 max-w-3xl"><p className="text-sm font-semibold text-teal-800">{dictionary.categories[category]}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{content.name}</h1><p className="mt-4 leading-7 text-slate-600">{content.description}</p></header>
      <CalculatorForm key={`${locale}-${slug}`} slug={slug} fields={source.fields} locale={locale} dictionary={{ detail: dictionary.detail, units: dictionary.units }} content={content} />
      <div className="mt-12 grid min-w-0 gap-10 xl:grid-cols-[minmax(0,1fr)_16rem]"><div className="min-w-0 space-y-10">
        <section><h2 className="text-xl font-bold">{dictionary.detail.howTo}</h2><p className="mt-3 leading-7 text-slate-700">{content.howTo}</p></section>
        <section><h2 className="text-xl font-bold">{dictionary.detail.formula}</h2><p className="mt-3 break-words rounded-xl bg-slate-100 px-4 py-4 font-medium leading-7">{content.formula}</p></section>
        <section><h2 className="text-xl font-bold">{dictionary.detail.example}</h2><div className="mt-3 rounded-xl border border-slate-200 bg-white p-5"><p className="font-semibold">{content.example.question}</p><p className="mt-2 leading-7 text-slate-700">{content.example.answer}</p></div></section>
        <section><h2 className="text-xl font-bold">{dictionary.detail.faqs}</h2><dl className="mt-3 divide-y divide-slate-200 border-y border-slate-200">{content.faqs.map((faq) => <div key={faq.question} className="py-5"><dt className="font-semibold">{faq.question}</dt><dd className="mt-2 leading-7 text-slate-700">{faq.answer}</dd></div>)}</dl></section>
      </div><aside aria-labelledby="related-heading"><h2 id="related-heading" className="text-lg font-bold">{dictionary.detail.related}</h2><ul className="mt-3 space-y-2">{content.related.map((relatedSlug) => { const item = dictionary.calculators[relatedSlug]; return <li key={relatedSlug}><Link className="block rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-teal-700" href={`/${locale}/calculators/${relatedSlug}`}>{item.name}</Link></li>; })}</ul></aside></div>
    </article>
  </CalculatorWorkspace>;
}
