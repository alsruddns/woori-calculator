import type { Metadata } from "next";
import { siteConfig } from "@/constants/site-config";
import { localePath } from "@/i18n/config";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
  keywords?: readonly string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadataInput): Metadata {
  const canonical = `${siteConfig.serviceBaseUrl}${localePath("ko", path)}`;

  return {
    title,
    description,
    ...(keywords ? { keywords: [...keywords] } : {}),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
