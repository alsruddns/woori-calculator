import type { Metadata } from "next";
import { siteConfig } from "@/constants/site-config";

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
  const normalizedPath = path === "/" ? "" : path.replace(/\/$/, "");
  const canonical = `${siteConfig.serviceBaseUrl}${normalizedPath}`;

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
