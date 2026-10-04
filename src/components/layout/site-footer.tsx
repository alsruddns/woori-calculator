import Link from "next/link";
import { siteConfig } from "@/constants/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-7 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="서비스 정보" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link className="rounded hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" href="/about">서비스 소개</Link>
          <Link className="rounded hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" href="/privacy">개인정보처리방침</Link>
          <Link className="rounded hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" href="/terms">이용약관</Link>
        </nav>
        <p>© {new Date().getFullYear()} {siteConfig.shortName}</p>
      </div>
    </footer>
  );
}
