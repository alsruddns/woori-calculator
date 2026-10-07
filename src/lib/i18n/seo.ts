import type { Metadata } from "next";
import { localeConfig, localePath, locales, type Locale } from "@/i18n/config";
import { siteConfig } from "@/constants/site-config";

export function localizedMetadata(locale: Locale, path: string, title: string, description: string, keywords?: readonly string[]): Metadata {
  const languages = Object.fromEntries(([
    ["ko", localePath("ko", path)], ["en", localePath("en", path)], ["ja", localePath("ja", path)], ["zh", localePath("zh", path)], ["x-default", localePath("ko", path)],
  ] as const).map(([key, value]) => [key, `${siteConfig.serviceBaseUrl}${value === "/" ? "" : value}`]));
  const localizedPath = localePath(locale, path);
  const canonical = `${siteConfig.serviceBaseUrl}${localizedPath === "/" ? "" : localizedPath}`;
  const alternateLocale = locales.filter((item) => item !== locale).map((item) => localeConfig[item].ogLocale);
  return { title, description, ...(keywords ? { keywords: [...keywords] } : {}), alternates: { canonical, languages }, openGraph: { title, description, url: canonical, siteName: locale === "ko" ? siteConfig.name : "woori.today", locale: localeConfig[locale].ogLocale, alternateLocale, type: "website" }, twitter: { card: "summary", title, description } };
}
