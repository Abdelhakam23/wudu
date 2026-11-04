import { describe, it, expect } from "vitest";
import { normalizeArabicText, toArabicDigits } from "../src/lib/utils";
import { sanitizeSearchQuery, sanitizeHtml } from "../src/lib/security";

describe("Arabic Text Normalization Utility", () => {
  it("should strip tashkeel (diacritics) correctly", () => {
    const input = "الْوُضُوءُ شَطْرُ الإِيمَانِ";
    const expected = "الوضوء شطر الايمان";
    expect(normalizeArabicText(input)).toBe(expected);
  });

  it("should normalize Alif forms and Taa Marbuta", () => {
    const input = "أركان الصَّلَاةِ";
    const expected = "اركان الصلاه";
    expect(normalizeArabicText(input)).toBe(expected);
  });

  it("should convert numbers to Arabic Eastern numerals", () => {
    expect(toArabicDigits(123)).toBe("١٢٣");
  });
});

describe("Security Sanitization Utility", () => {
  it("should escape regex special characters", () => {
    const query = "صلاة (الظهر) [.*] ^$";
    const sanitized = sanitizeSearchQuery(query);
    expect(sanitized).toBe("صلاة \\(الظهر\\) \\[\Template\\*\\] \\^\\$".replace("Template", "\\."));
  });

  it("should strip script tags and HTML", () => {
    const malicious = "<script>alert('xss')</script><b>الوضوء</b>";
    expect(sanitizeHtml(malicious)).toBe("الوضوء");
  });
});
