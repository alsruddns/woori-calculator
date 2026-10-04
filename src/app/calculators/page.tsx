import Link from "next/link";
import { publishedCalculators } from "@/data/calculators/registry";
import { calculatorCategories } from "@/data/calculators/categories";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "계산기",
  description: "woori.today에서 제공하는 온라인 계산기와 생활 도구를 확인하세요.",
  path: "/calculators",
});

export default function CalculatorsPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500"><Link className="hover:text-teal-800" href="/">홈</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">계산기</span></nav>
      <h1 className="text-3xl font-bold tracking-tight text-slate-950">계산기</h1>
      <p className="mt-3 max-w-2xl leading-7 text-slate-600">일상에서 자주 필요한 계산 도구를 준비하고 있습니다.</p>
      {publishedCalculators.length ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {publishedCalculators.map((calculator) => (
            <li key={calculator.id}>
              <Link className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800" href={`/calculators/${calculator.slug}`}>
                <span className="text-xs font-semibold text-teal-800">{calculatorCategories[calculator.category]}</span>
                <h2 className="mt-2 text-lg font-semibold">{calculator.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{calculator.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
          <h2 className="font-semibold text-slate-900">계산기를 준비하고 있어요</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">첫 번째 계산기가 준비되면 이곳에서 바로 이용할 수 있습니다.</p>
        </div>
      )}
    </section>
  );
}
