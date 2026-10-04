import Link from "next/link";
import { siteConfig } from "@/constants/site-config";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link className="rounded font-semibold tracking-tight text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700" href="/" aria-label={`${siteConfig.name} 홈`}>
          <span>{siteConfig.name}</span>
          <span className="ml-2 text-sm font-normal text-slate-500">woori.today</span>
        </Link>
        <nav aria-label="주요 메뉴">
          <Link className="rounded px-3 py-2 text-sm font-medium text-slate-700 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" href="/calculators">
            계산기
          </Link>
        </nav>
      </div>
    </header>
  );
}
