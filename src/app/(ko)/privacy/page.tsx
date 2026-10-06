import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({ title: "개인정보처리방침", description: "woori.today의 개인정보 처리 현황을 안내합니다.", path: "/privacy" });

export default function PrivacyPage() {
  return <article className="mx-auto min-w-0 max-w-3xl px-4 py-10 sm:px-5 sm:py-20"><h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">개인정보처리방침</h1><p className="mt-5 break-words leading-7 text-slate-700 [overflow-wrap:anywhere] sm:mt-6 sm:leading-8">현재 woori.today는 회원가입이나 로그인 기능을 제공하지 않으며, 서비스 이용을 위해 이름·연락처 등 개인정보를 입력받지 않습니다. 계산은 이용자의 브라우저에서 처리됩니다.</p><p className="mt-4 break-words leading-7 text-slate-700 [overflow-wrap:anywhere] sm:leading-8">서비스 운영 방식이 변경되어 개인정보, 광고 또는 분석 도구를 도입하는 경우 이 방침을 갱신하고 적용 내용을 안내하겠습니다.</p></article>;
}
