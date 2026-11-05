import { describe, expect, it } from "vitest";
import { generateMetadata } from "./page";

describe("Korean calculator detail metadata", () => {
  it("lists every published alternate locale for the percentage calculator", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "percentage" }) });
    const languages = metadata.alternates?.languages;

    expect(metadata.alternates?.canonical).toBe("https://www.woori.today/ko/calculators/percentage");
    expect(languages).toMatchObject({
      ko: "https://www.woori.today/ko/calculators/percentage",
      ru: "https://www.woori.today/ru/calculators/percentage",
      tr: "https://www.woori.today/tr/calculators/percentage",
      pl: "https://www.woori.today/pl/calculators/percentage",
      fil: "https://www.woori.today/fil/calculators/percentage",
      bn: "https://www.woori.today/bn/calculators/percentage",
      uk: "https://www.woori.today/uk/calculators/percentage",
      ms: "https://www.woori.today/ms/calculators/percentage",
      sv: "https://www.woori.today/sv/calculators/percentage",
      cs: "https://www.woori.today/cs/calculators/percentage",
      ro: "https://www.woori.today/ro/calculators/percentage",
      el: "https://www.woori.today/el/calculators/percentage",
      "x-default": "https://www.woori.today/ko/calculators/percentage",
    });
    expect(Object.keys(languages ?? {})).toHaveLength(27);
  });
});
