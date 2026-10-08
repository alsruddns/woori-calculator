import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security/headers";

const nextConfig: NextConfig = {
  output: "standalone",
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/calculator", destination: "/ko/calculators", permanent: true },
      { source: "/calculator/calculators", destination: "/ko/calculators", permanent: true },
      { source: "/calculator/:locale(en|ja|zh|ko)/calculators", destination: "/:locale/calculators", permanent: true },
      { source: "/calculator/:locale(en|ja|zh|ko)/calculators/:slug", destination: "/:locale/calculators/:slug", permanent: true },
      { source: "/calculator/calculators/:slug", destination: "/ko/calculators/:slug", permanent: true },
      { source: "/calculator/:locale(en|ja|zh|ko)/:slug", destination: "/:locale/calculators/:slug", permanent: true },
      { source: "/calculator/:slug", destination: "/ko/calculators/:slug", permanent: true },
      { source: "/calculators", destination: "/ko/calculators", permanent: true },
      { source: "/calculators/:slug", destination: "/ko/calculators/:slug", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: [...securityHeaders] }];
  },
};

export default nextConfig;
