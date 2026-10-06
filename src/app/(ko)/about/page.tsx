import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({ title: "서비스 소개", description: "woori.today가 제공하는 계산기와 생활 도구를 소개합니다.", path: "/about" });

export default function AboutPage() {
  return <article className="mx-auto min-w-0 max-w-3xl px-4 py-10 sm:px-5 sm:py-20"><h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">서비스 소개</h1><p className="mt-5 break-words leading-7 text-slate-700 [overflow-wrap:anywhere] sm:mt-6 sm:leading-8">우리의 오늘(woori.today)은 일상에서 필요한 계산과 생활 도구를 쉽고 빠르게 이용할 수 있도록 준비하고 있는 공개 서비스입니다.</p><p className="mt-4 break-words leading-7 text-slate-700 [overflow-wrap:anywhere] sm:leading-8">별도의 회원가입 없이 필요한 도구를 사용할 수 있도록, 계산기와 유용한 정보를 차근차근 제공하겠습니다.</p></article>;
}
