import { describe, expect, it } from "vitest";
import { filBatchSixteen } from "@/i18n/dictionaries/fil-batch-16";

describe("Filipino country calculator batch 16", () => {
  it("contains all 16 translated pages with localized policy context", () => {
    expect(Object.keys(filBatchSixteen)).toHaveLength(16);
    for (const page of Object.values(filBatchSixteen)) {
      expect(page.title.length).toBeGreaterThan(0);
      expect(page.fields).not.toHaveProperty("missing");
      expect(page.resultNote).toContain("Hindi ito Philippine tax o employment calculation");
      expect(page.faqs[0]?.answer).toContain("Hindi");
    }
  });
});
