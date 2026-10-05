import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorWorkspace } from "@/components/calculator/calculator-workspace";
import { hasLocale, localizedCalculatorSlugs } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: key } = await params;
  if (!hasLocale(key) || key === "ko") return {};
  const dict = getDictionary(key);
  return localizedMetadata(key, "/calculators", dict.calculatorList.title, dict.calculatorList.description);
}

export default async function LocaleCalculators({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: key } = await params;
  if (!hasLocale(key) || key === "ko") notFound();
  const dict = getDictionary(key);
  const items = localizedCalculatorSlugs.map((slug) => ({ slug, ...dict.calculators[slug], category: slug === "vat" ? "tax" : ["age", "date-difference"].includes(slug) ? "date-time" : ["area"].includes(slug) ? "life" : ["loan-interest", "compound-interest"].includes(slug) ? "finance" : "math" }));
  const sidebarItems = items.map(({ slug, name, category }) => ({ slug, name, category }));
  return <CalculatorWorkspace localizedItems={sidebarItems} categories={dict.categories} categoryOrder={dict.categoriesOrder} basePath={`/${key}/calculators`} labels={{ menu: dict.nav.menu, search: dict.nav.search, close: dict.nav.close, empty: dict.nav.searchEmpty }}>
    <section className="py-4"><nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500"><Link href={`/${key}`}>{dict.calculatorList.breadcrumbHome}</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">{dict.calculatorList.breadcrumbCalculators}</span></nav><header><h1 className="text-3xl font-bold tracking-tight text-slate-950">{dict.calculatorList.title}</h1><p className="mt-3 max-w-2xl leading-7 text-slate-600">{dict.calculatorList.description}</p></header>
      <div className="mt-8 space-y-9">{dict.categoriesOrder.map((category) => { const group = items.filter((item) => item.category === category); return group.length ? <section key={category} aria-labelledby={`category-${category}`}><h2 id={`category-${category}`} className="text-xl font-bold">{dict.categories[category]}</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{group.map((item) => <li key={item.slug}><Link href={`/${key}/calculators/${item.slug}`} className="block h-full rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"><h3 className="font-semibold">{item.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p></Link></li>)}</ul></section> : null; })}</div>
    </section>
  </CalculatorWorkspace>;
}
