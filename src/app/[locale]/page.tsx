import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: key } = await params;
  if (!hasLocale(key) || key === "ko") return {};
  const dict = getDictionary(key);
  return localizedMetadata(key, "/", dict.home.title, dict.home.description);
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: key } = await params;
  if (!hasLocale(key) || key === "ko") notFound();
  const dict = getDictionary(key);
  const featured = ["percentage", "discount", "loan-interest", "compound-interest", "vat", "age", "area"] as const;
  const categories = dict.categoriesOrder;
  return <main className="mx-auto max-w-6xl px-5 py-12 sm:py-20">
    <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-14"><p className="text-sm font-semibold text-teal-800">woori.today</p><h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-950">{dict.home.title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{dict.home.description}</p><Link className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-teal-800 px-5 font-semibold text-white hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800" href={`/${key}/calculators`}>{dict.nav.calculators}</Link></section>
    <section className="mt-12" aria-labelledby="featured-heading"><h2 id="featured-heading" className="text-2xl font-bold">{dict.home.featured ?? dict.nav.calculators}</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{featured.map((slug) => { const item = dict.calculators[slug]; return item ? <li key={slug}><Link href={`/${key}/calculators/${slug}`} className="block h-full rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"><h3 className="font-semibold">{item.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p></Link></li> : null; })}</ul></section>
    <section className="mt-12" aria-labelledby="categories-heading"><h2 id="categories-heading" className="text-2xl font-bold">{dict.home.categories ?? dict.nav.calculators}</h2><ul className="mt-4 flex flex-wrap gap-2">{categories.map((category) => <li key={category}><Link href={`/${key}/calculators#category-${category}`} className="inline-flex min-h-10 items-center rounded-full border border-slate-300 bg-white px-4 text-sm font-medium hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">{dict.categories[category]}</Link></li>)}</ul></section>
  </main>;
}
