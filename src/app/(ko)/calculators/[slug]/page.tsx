import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorForm } from "@/components/calculator/calculator-form";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/constants/site-config";
import { calculatorCategories, calculatorCategoryOrder } from "@/data/calculators/categories";
import { getCalculatorPage, publishedCalculatorPages } from "@/data/calculator-content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CalculatorWorkspace } from "@/components/calculator/calculator-workspace";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { localizedMetadata } from "@/lib/i18n/seo";

type PageProps = { params: Promise<{ slug: string }> };

function formatKoreanDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${value}T00:00:00.000Z`));
}

export function generateStaticParams() {
  return publishedCalculatorPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorPage(slug);
  if (!calculator) return {};
  const path = `/${calculator.slug}` as `/${string}`;
  if (localizedCalculatorSlugs.includes(calculator.slug as (typeof localizedCalculatorSlugs)[number])) {
    return localizedMetadata("ko", path, calculator.title, calculator.description, calculator.keywords);
  }
  return createPageMetadata({ title: calculator.title, description: calculator.description, path, keywords: calculator.keywords });
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const calculator = getCalculatorPage(slug);
  if (!calculator) notFound();

  const path = `/calculators/${calculator.slug}`;
  const related = calculator.relatedCalculatorIds
    .map((id) => getCalculatorPage(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <CalculatorWorkspace categories={calculatorCategories} categoryOrder={calculatorCategoryOrder} labels={{ menu: "계산기 메뉴", search: "계산기 검색", close: "메뉴 닫기", empty: "검색 결과가 없습니다." }}>
    <article className="min-w-0 py-6 sm:py-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.serviceBaseUrl },
          { "@type": "ListItem", position: 2, name: "계산기", item: `${siteConfig.serviceBaseUrl}/calculators` },
          { "@type": "ListItem", position: 3, name: calculator.name, item: `${siteConfig.serviceBaseUrl}${path}` },
        ],
      }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: calculator.title, description: calculator.description, url: `${siteConfig.serviceBaseUrl}${path}`, inLanguage: "ko-KR" }} />

      <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-x-2 break-words text-sm text-slate-500 [overflow-wrap:anywhere] sm:mb-6">
        <Link className="inline-flex min-h-11 items-center hover:text-teal-800" href="/">홈</Link><span aria-hidden="true">/</span>
        <Link className="inline-flex min-h-11 items-center hover:text-teal-800" href="/calculators">계산기</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{calculator.name}</span>
      </nav>

      <header className="mb-7 max-w-3xl">
        <p className="text-sm font-semibold text-teal-800">{calculatorCategories[calculator.category]}</p>
        <h1 className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-3xl lg:text-4xl">{calculator.name}</h1>
          <p className="mt-4 leading-7 text-slate-600">{calculator.description}</p>
          {calculator.policyYear ? <p className="mt-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-900">{calculator.policyYear}년 기준 정책 계산</p> : null}
      </header>

      <CalculatorForm key={calculator.slug} slug={calculator.slug} fields={calculator.fields} />

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="space-y-10">
          <section aria-labelledby="how-to">
            <h2 id="how-to" className="text-xl font-bold text-slate-950">계산 방법</h2>
            <p className="mt-3 leading-7 text-slate-700">{calculator.howTo}</p>
          </section>
          <section aria-labelledby="formula">
            <h2 id="formula" className="text-xl font-bold text-slate-950">계산 공식</h2>
            <p className="mt-3 min-w-0 break-words rounded-xl bg-slate-100 px-3 py-4 font-medium leading-7 text-slate-800 [overflow-wrap:anywhere] sm:px-4">{calculator.formula}</p>
          </section>
          <section aria-labelledby="example">
            <h2 id="example" className="text-xl font-bold text-slate-950">계산 예제</h2>
            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-5">
              <p className="break-words font-semibold text-slate-900 [overflow-wrap:anywhere]">{calculator.example.question}</p>
              <p className="mt-2 break-words leading-7 text-slate-700 [overflow-wrap:anywhere]">{calculator.example.answer}</p>
            </div>
          </section>
          {calculator.notes?.length ? <section aria-labelledby="notes"><h2 id="notes" className="text-xl font-bold text-slate-950">알아둘 점</h2><ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">{calculator.notes.map((note) => <li key={note}>{note}</li>)}</ul></section> : null}
          <section aria-labelledby="faq">
            <h2 id="faq" className="text-xl font-bold text-slate-950">자주 묻는 질문</h2>
            <dl className="mt-3 divide-y divide-slate-200 border-y border-slate-200">
              {calculator.faqs.map((faq) => <div key={faq.question} className="min-w-0 py-5"><dt className="break-words font-semibold text-slate-900 [overflow-wrap:anywhere]">{faq.question}</dt><dd className="mt-2 break-words leading-7 text-slate-700 [overflow-wrap:anywhere]">{faq.answer}</dd></div>)}
            </dl>
          </section>
        </div>
        <aside aria-labelledby="related-calculators">
          <h2 id="related-calculators" className="text-lg font-bold text-slate-950">관련 계산기</h2>
          <ul className="mt-3 space-y-2">
            {related.map((item) => <li key={item.id}><Link className="flex min-w-0 items-start justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium text-slate-800 hover:border-teal-700 hover:text-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800" href={`/calculators/${item.slug}`}><span className="min-w-0 break-words [overflow-wrap:anywhere]">{item.name}</span><span aria-hidden="true" className="shrink-0">→</span></Link></li>)}
          </ul>
          <p className="mt-4 text-xs text-slate-500">최종 업데이트: <time dateTime={calculator.updatedAt}>{formatKoreanDate(calculator.updatedAt)}</time></p>
          {calculator.sources?.length ? <section className="mt-7 min-w-0" aria-labelledby="policy-sources"><h3 id="policy-sources" className="text-sm font-bold text-slate-900">기준 및 출처</h3><ul className="mt-2 min-w-0 space-y-2">{calculator.sources.map((source) => <li key={source.url} className="min-w-0"><a className="break-words text-sm text-teal-900 underline underline-offset-2 [overflow-wrap:anywhere] hover:text-teal-700 focus-visible:outline-2" href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a><p className="mt-1 text-xs text-slate-500">확인일: <time dateTime={source.checkedAt}>{formatKoreanDate(source.checkedAt)}</time></p></li>)}</ul></section> : null}
        </aside>
      </div>
    </article>
    </CalculatorWorkspace>
  );
}
