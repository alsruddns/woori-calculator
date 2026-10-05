import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({ title: "이용약관", description: "woori.today 서비스 이용에 관한 기본 안내입니다.", path: "/terms" });

export default function TermsPage() {
  return <article className="mx-auto max-w-3xl px-5 py-14 sm:py-20"><h1 className="text-3xl font-bold tracking-tight">이용약관</h1><p className="mt-6 leading-8 text-slate-700">woori.today는 일상에 필요한 계산과 생활 도구를 제공하는 서비스입니다. 서비스는 현재 별도 회원가입 없이 이용할 수 있습니다.</p><p className="mt-4 leading-8 text-slate-700">계산 결과와 안내 정보는 참고 목적으로 제공됩니다. 중요한 의사결정에는 해당 기관의 최신 자료와 조건을 함께 확인해 주세요.</p></article>;
}
