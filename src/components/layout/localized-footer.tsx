import Link from "next/link";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";

export function LocalizedFooter({ dictionary }: { dictionary: LocaleDictionary }) {
  const root = `/${dictionary.locale}`;
  const legalLinks = {
    en: [{ href: "/about", label: "About (Korean)" }, { href: "/privacy", label: "Privacy (Korean)" }, { href: "/terms", label: "Terms (Korean)" }],
    ja: [{ href: "/about", label: "サービス紹介（韓国語）" }, { href: "/privacy", label: "プライバシー（韓国語）" }, { href: "/terms", label: "利用規約（韓国語）" }],
    zh: [{ href: "/about", label: "服务介绍（韩语）" }, { href: "/privacy", label: "隐私政策（韩语）" }, { href: "/terms", label: "使用条款（韩语）" }],
    ko: [],
  }[dictionary.locale];
  const navigationLabel = { en: "Footer navigation", ja: "フッターナビゲーション", zh: "页脚导航", ko: "푸터 탐색" }[dictionary.locale];
  return <footer className="mt-auto border-t border-slate-200 bg-white"><div className="mx-auto flex min-w-0 max-w-[90rem] flex-col gap-4 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-6 text-sm leading-6 text-slate-600 sm:px-5 sm:py-7 sm:flex-row sm:justify-between"><nav aria-label={navigationLabel} className="flex min-w-0 flex-wrap gap-x-3 gap-y-1 sm:gap-x-5 sm:gap-y-2"><Link className="inline-flex min-h-11 items-center break-words pr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" href={`${root}/calculators`}>{dictionary.nav.calculators}</Link>{legalLinks.map(({ href, label }) => <Link key={href} className="inline-flex min-h-11 items-center break-words pr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 [overflow-wrap:anywhere]" href={href}>{label}</Link>)}</nav><p className="whitespace-nowrap">© woori.today</p></div></footer>;
}
