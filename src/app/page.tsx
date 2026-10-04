import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/constants/site-config";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "일상에 필요한 계산과 생활 도구",
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, inLanguage: "ko-KR" }} />
      <section className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
        <p className="mb-4 text-sm font-semibold text-teal-800">woori.today</p>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">일상에 필요한 계산과 생활 도구를 쉽고 빠르게</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">복잡한 계산을 간편하게 할 수 있는 도구를 하나씩 준비하고 있습니다.</p>
        <Link className="mt-9 inline-flex min-h-12 items-center rounded-lg bg-teal-800 px-5 font-semibold text-white hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800" href="/calculators">계산기 둘러보기</Link>
      </section>
    </>
  );
}
