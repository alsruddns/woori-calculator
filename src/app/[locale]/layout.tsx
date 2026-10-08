import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedHeader } from "@/components/layout/localized-header";
import { LocalizedFooter } from "@/components/layout/localized-footer";
import { localeConfig, dictionaryLocales, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/constants/site-config";
import "../globals.css";

export function generateStaticParams() { return dictionaryLocales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: key } = await params;
  if (!hasLocale(key) || key === "ko") return {};
  const dictionary = getDictionary(key);
  return { metadataBase: new URL(siteConfig.serviceBaseUrl), title: { default: dictionary.siteName, template: `%s | ${dictionary.siteName}` }, description: dictionary.description, applicationName: dictionary.siteName, openGraph: { type: "website", locale: localeConfig[key].ogLocale, siteName: dictionary.siteName, title: dictionary.siteName, description: dictionary.description }, twitter: { card: "summary", title: dictionary.siteName, description: dictionary.description }, robots: { index: true, follow: true } };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<unknown> }>) {
  const { locale: key } = await params as { locale: string };
  if (!hasLocale(key) || key === "ko") notFound();
  const dictionary = getDictionary(key);
  return <html lang={localeConfig[key].htmlLang} className="h-full antialiased"><body className="flex min-h-full min-w-0 flex-col bg-slate-50 text-slate-900"><a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2" href="#main-content">{dictionary.nav.skip}</a><LocalizedHeader dictionary={dictionary} /><main id="main-content" className="min-w-0 flex-1">{children}</main><LocalizedFooter dictionary={dictionary} /></body></html>;
}
