import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/constants/site-config";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { calculatorCategories, calculatorCategoryOrder } from "@/data/calculators/categories";
import { localizedMetadata } from "@/lib/i18n/seo";
import { localePath } from "@/i18n/config";

export const metadata = localizedMetadata("ko", "/", "일상에 필요한 계산과 생활 도구", "필요한 계산과 생활 도구를 woori.today에서 쉽고 빠르게 이용하세요.", ["계산기", "생활 도구"]);

const featuredSlugs = ["percentage", "discount", "vat", "compound-interest", "loan-interest", "date-difference"];

export default function Home() {
  const featured = featuredSlugs.map((slug) => publishedCalculatorPages.find((page) => page.slug === slug)).filter((page) => page !== undefined);
  const populatedCategories = new Set(publishedCalculatorPages.map((page) => page.category));
  const categories = calculatorCategoryOrder.filter((category) => populatedCategories.has(category));

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteConfig.serviceBaseUrl}/ko#website`, name: siteConfig.name, url: `${siteConfig.serviceBaseUrl}/ko`, inLanguage: "ko-KR" }} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-5 sm:py-24">
          <p className="mb-4 text-sm font-semibold text-teal-800">woori.today · 우리의 오늘</p>
          <h1 className="max-w-2xl break-words text-2xl font-bold leading-tight tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-3xl lg:text-4xl">일상에 필요한 계산과 생활 도구를 쉽고 빠르게</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">퍼센트와 금융부터 날짜와 생활 계산까지, 필요한 도구를 골라 바로 계산해 보세요.</p>
          <Link className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-teal-800 px-5 font-semibold text-white hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800" href={localePath("ko", "/calculators")}>계산기 둘러보기</Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-9 sm:px-5 sm:py-16" aria-labelledby="featured-calculators">
        <div className="flex items-end justify-between gap-3"><div className="min-w-0"><p className="text-sm font-semibold text-teal-800">바로 이용하기</p><h2 id="featured-calculators" className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">추천 계산기</h2></div><Link className="inline-flex min-h-11 shrink-0 items-center rounded px-2 text-sm font-semibold text-teal-900 underline decoration-teal-300 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2" href={localePath("ko", "/calculators")}>전체 보기</Link></div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((calculator) => <li key={calculator.id} className="min-w-0"><Link href={localePath("ko", `/calculators/${calculator.slug}`)} className="block h-full min-w-0 break-words rounded-xl border border-slate-200 bg-white p-4 [overflow-wrap:anywhere] hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 sm:p-5"><span className="text-xs font-semibold text-teal-800">{calculatorCategories[calculator.category]}</span><h3 className="mt-2 font-semibold text-slate-950">{calculator.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{calculator.description}</p></Link></li>)}
        </ul>
      </section>

      <section className="border-y border-slate-200 bg-white" aria-labelledby="calculator-categories">
        <div className="mx-auto max-w-5xl px-4 py-9 sm:px-5 sm:py-14"><h2 id="calculator-categories" className="text-xl font-bold tracking-tight sm:text-2xl">필요한 도구를 찾아보세요</h2><div className="mt-5 flex flex-wrap gap-2">{categories.map((category) => <Link key={category} className="min-h-10 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-teal-700 hover:text-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800" href={`${localePath("ko", "/calculators")}#category-${category}`}>{calculatorCategories[category]}</Link>)}</div></div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-9 sm:px-5 sm:py-16"><h2 className="text-xl font-bold">쉽고 투명한 계산</h2><p className="mt-3 max-w-3xl break-words leading-7 text-slate-600 [overflow-wrap:anywhere]">각 계산기에서 입력값, 계산 공식과 예제를 함께 확인할 수 있습니다. 계산은 브라우저에서 처리되며 정책에 따라 달라지는 수치는 출처와 기준을 따로 확인할 수 있도록 준비하고 있습니다.</p></section>
    </>
  );
}
