import Link from "next/link";
import { siteConfig } from "@/constants/site-config";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Locale } from "@/i18n/config";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";

export function SiteHeader({ locale = "ko", dictionary }: { locale?: Locale; dictionary?: LocaleDictionary }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-4">
        <Link className="rounded font-semibold tracking-tight text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700" href="/" aria-label={`${siteConfig.name} 홈`}>
          <span>{siteConfig.name}</span>
          <span className="ml-2 text-sm font-normal text-slate-500">woori.today</span>
        </Link>
        <nav aria-label="주요 메뉴">
          <Link className="rounded px-3 py-2 text-sm font-medium text-slate-700 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" href={locale === "ko" ? "/calculators" : `/${locale}/calculators`}>
            계산기
          </Link>
          <LanguageSwitcher locale={locale} label={dictionary?.nav.language ?? "언어"} />
        </nav>
      </div>
    </header>
  );
}
