import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({ title: "개인정보처리방침", description: "woori.today의 개인정보 처리 현황을 안내합니다.", path: "/privacy" });

export default function PrivacyPage() {
  return <article className="mx-auto max-w-3xl px-5 py-14 sm:py-20"><h1 className="text-3xl font-bold tracking-tight">개인정보처리방침</h1><p className="mt-6 leading-8 text-slate-700">현재 woori.today는 회원가입이나 로그인 기능을 제공하지 않으며, 서비스 이용을 위해 이름·연락처 등 개인정보를 입력받지 않습니다. 계산은 이용자의 브라우저에서 처리됩니다.</p><p className="mt-4 leading-8 text-slate-700">서비스 운영 방식이 변경되어 개인정보, 광고 또는 분석 도구를 도입하는 경우 이 방침을 갱신하고 적용 내용을 안내하겠습니다.</p></article>;
}
