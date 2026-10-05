import Link from "next/link";

export default function NotFound() {
  return <section className="mx-auto min-w-0 max-w-3xl px-4 py-16 text-center sm:px-5 sm:py-24"><p className="text-sm font-semibold text-teal-800">404</p><h1 className="mt-3 break-words text-2xl font-bold tracking-tight sm:text-3xl">페이지를 찾을 수 없습니다</h1><p className="mt-4 break-words text-slate-600 [overflow-wrap:anywhere]">주소를 확인하거나 계산기 목록으로 이동해 주세요.</p><Link className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-teal-800 px-5 font-semibold text-white hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800" href="/calculators">계산기 목록 보기</Link></section>;
}
