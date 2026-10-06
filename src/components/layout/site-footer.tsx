import Link from "next/link";
import { siteConfig } from "@/constants/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex min-w-0 max-w-5xl flex-col gap-4 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-6 text-sm leading-6 text-slate-600 sm:px-5 sm:py-7 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="서비스 정보" className="flex min-w-0 flex-wrap gap-x-5 gap-y-2">
          <Link className="inline-flex min-h-11 items-center break-words rounded pr-2 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" href="/about">서비스 소개</Link>
          <Link className="inline-flex min-h-11 items-center break-words rounded pr-2 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" href="/privacy">개인정보처리방침</Link>
          <Link className="inline-flex min-h-11 items-center break-words rounded pr-2 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" href="/terms">이용약관</Link>
        </nav>
        <p className="whitespace-nowrap">© {siteConfig.shortName}</p>
      </div>
    </footer>
  );
}
