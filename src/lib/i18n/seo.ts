import type { Metadata } from "next";
import { localeConfig, localePath, locales, type Locale } from "@/i18n/config";
import { siteConfig } from "@/constants/site-config";

export function localizedLanguageAlternates(path: string): Record<string, string> {
  return Object.fromEntries([
    ...locales.map((item) => [item, `${siteConfig.serviceBaseUrl}${localePath(item, path)}`] as const),
    ["x-default", `${siteConfig.serviceBaseUrl}${localePath("ko", path)}`] as const,
  ]);
}

export function localizedMetadata(locale: Locale, path: string, title: string, description: string, keywords?: readonly string[]): Metadata {
  const languages = localizedLanguageAlternates(path);
  const localizedPath = localePath(locale, path);
  const canonical = `${siteConfig.serviceBaseUrl}${localizedPath}`;
  const alternateLocale = locales.filter((item) => item !== locale).map((item) => localeConfig[item].ogLocale);
  return { title, description, ...(keywords ? { keywords: [...keywords] } : {}), alternates: { canonical, languages }, openGraph: { title, description, url: canonical, siteName: locale === "ko" ? siteConfig.name : "woori.today", locale: localeConfig[locale].ogLocale, alternateLocale, type: "website" }, twitter: { card: "summary", title, description } };
}
