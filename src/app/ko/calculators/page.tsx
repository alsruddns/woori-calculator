import type { Metadata } from "next";
import Link from "next/link";
import { calculatorCategories, calculatorCategoryOrder } from "@/data/calculators/categories";
import { localizedMetadata } from "@/lib/i18n/seo";
import { localePath, supportedLocales } from "@/i18n/config";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { CalculatorWorkspace } from "@/components/calculator/calculator-workspace";
import { CatalogGuidance } from "@/components/calculator/catalog-guidance";
import { getDictionary } from "@/i18n/dictionaries";
import { catalogGuidance } from "@/i18n/catalog-guidance";

export const metadata: Metadata = localizedMetadata("ko", "/calculators", "계산기와 생활 도구", "일상에 필요한 계산기를 골라 바로 결과를 확인하세요. 계산은 브라우저에서 처리됩니다.", ["계산기", "생활 계산기"], supportedLocales);

export default function CalculatorsPage() {
  const dictionary = getDictionary("ko");
  const populatedCategories = calculatorCategoryOrder
    .map((category) => ({
      category,
      label: calculatorCategories[category],
      items: publishedCalculatorPages.filter((calculator) => calculator.category === category).map((calculator) => ({ ...calculator, ...dictionary.calculators[calculator.slug as keyof typeof dictionary.calculators] })),
    }))
    .filter(({ items }) => items.length > 0);

  return (
    <CalculatorWorkspace localizedItems={publishedCalculatorPages.map((item) => ({ slug: item.slug, name: dictionary.calculators[item.slug as keyof typeof dictionary.calculators]?.name ?? item.name, keywords: item.keywords, category: item.category }))} categories={calculatorCategories} categoryOrder={calculatorCategoryOrder} basePath={localePath("ko", "/calculators")} labels={{ menu: dictionary.nav.menu, search: dictionary.nav.search, close: dictionary.nav.close, empty: dictionary.nav.searchEmpty }}>
    <section className="min-w-0 py-4 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-x-2 break-words text-sm text-slate-500 [overflow-wrap:anywhere] sm:mb-6"><Link className="inline-flex min-h-11 items-center hover:text-teal-800" href={localePath("ko")}>홈</Link><span aria-hidden="true">/</span><span aria-current="page">계산기</span></nav>
      <header>
        <h1 className="break-words text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">계산기와 생활 도구</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">필요한 계산을 골라 바로 이용해 보세요. 계산 입력값은 브라우저에서 계산됩니다.</p>
      </header>
      <CatalogGuidance locale="ko" names={Object.fromEntries(publishedCalculatorPages.map((page) => [page.slug, dictionary.calculators[page.slug as keyof typeof dictionary.calculators]?.name ?? page.name]))} />
      <nav aria-label="계산기 카테고리" className="mt-7 flex flex-wrap gap-2">
        {populatedCategories.map(({ category, label }) => <a key={category} className="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-teal-700 hover:text-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800" href={`#category-${category}`}>{label}</a>)}
      </nav>
      <div className="mt-10 space-y-10">
        {populatedCategories.map(({ category, label, items }) => (
          <section key={category} id={`category-${category}`} aria-labelledby={`heading-${category}`}>
            <div className="flex items-baseline justify-between gap-4"><h2 id={`heading-${category}`} className="text-xl font-bold text-slate-950">{label}</h2><span className="text-sm text-slate-500">{items.length}개</span></div>
            <p className="mt-2 max-w-3xl leading-7 text-slate-600">{catalogGuidance("ko").categories[category]}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((calculator) => <li key={calculator.id} className="min-w-0"><Link href={localePath("ko", `/calculators/${calculator.slug}`)} className="block h-full min-w-0 break-words rounded-xl border border-slate-200 bg-white p-4 [overflow-wrap:anywhere] hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 sm:p-5"><span className="text-xs font-semibold text-teal-800">{calculator.shortName}</span><h3 className="mt-2 font-semibold text-slate-950">{calculator.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{calculator.description}</p></Link></li>)}
            </ul>
          </section>
        ))}
      </div>
    </section>
    </CalculatorWorkspace>
  );
}
