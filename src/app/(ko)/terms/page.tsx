import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({ title: "이용약관", description: "woori.today 서비스 이용에 관한 기본 안내입니다.", path: "/terms" });

export default function TermsPage() {
  return <article className="mx-auto min-w-0 max-w-3xl px-4 py-10 sm:px-5 sm:py-20"><h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">이용약관</h1><p className="mt-5 break-words leading-7 text-slate-700 [overflow-wrap:anywhere] sm:mt-6 sm:leading-8">woori.today는 일상에 필요한 계산과 생활 도구를 제공하는 서비스입니다. 서비스는 현재 별도 회원가입 없이 이용할 수 있습니다.</p><p className="mt-4 break-words leading-7 text-slate-700 [overflow-wrap:anywhere] sm:leading-8">계산 결과와 안내 정보는 참고 목적으로 제공됩니다. 중요한 의사결정에는 해당 기관의 최신 자료와 조건을 함께 확인해 주세요.</p></article>;
}
