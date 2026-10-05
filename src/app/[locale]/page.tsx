import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: key } = await params;
  if (!hasLocale(key) || key === "ko") return {};
  const dict = getDictionary(key);
  return localizedMetadata(key, "/", dict.home.title, dict.home.description);
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: key } = await params;
  if (!hasLocale(key) || key === "ko") notFound();
  const dict = getDictionary(key);
  return <section className="mx-auto max-w-5xl px-5 py-16 sm:py-24"><p className="text-sm font-semibold text-teal-800">woori.today</p><h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-950">{dict.home.title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{dict.home.description}</p><Link className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-teal-800 px-5 font-semibold text-white hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800" href={`/${key}/calculators`}>{dict.nav.calculators}</Link></section>;
}
