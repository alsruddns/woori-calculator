import { describe, expect, it } from "vitest";
import { securityHeaders } from "@/lib/security/headers";

describe("production response security headers", () => {
  it("sets MIME sniffing, referrer, framing, and unused browser capability policies", () => {
    expect(securityHeaders).toEqual(expect.arrayContaining([
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ]));
  });

  it("leaves HTTPS-only HSTS to the TLS proxy and defers CSP rather than risking static scripts", () => {
    expect(securityHeaders.some(({ key }) => key.toLowerCase() === "strict-transport-security")).toBe(false);
    expect(securityHeaders.some(({ key }) => key.toLowerCase() === "content-security-policy")).toBe(false);
  });
});
