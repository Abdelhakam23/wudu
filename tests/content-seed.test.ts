import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { wuduLessonData } from "../src/lib/seed/wudu-data";
import { salahLessonData } from "../src/lib/seed/salah-data";
import { hadithsData } from "../src/lib/seed/hadith-data";
import { categoriesData } from "../src/lib/seed/category-data";

describe("Educational Content Verification (Phase 04)", () => {
  it("verifies Wudu lesson completeness and step ordering", () => {
    expect(wuduLessonData.steps.length).toBe(10);
    // Verify steps are strictly ordered 1 to 10
    wuduLessonData.steps.forEach((step, index) => {
      expect(step.order).toBe(index + 1);
      expect(step.title).toBeTruthy();
      expect(step.detailedExplanation).toBeTruthy();
      expect(step.references.length).toBeGreaterThan(0);
      expect(["obligatory", "sunnah", "recommended", "educational"]).toContain(step.classification);
    });
  });

  it("verifies Salah lesson completeness and recitations", () => {
    expect(salahLessonData.steps.length).toBe(11);
    salahLessonData.steps.forEach((step, index) => {
      expect(step.order).toBe(index + 1);
      expect(step.title).toBeTruthy();
      expect(step.detailedExplanation).toBeTruthy();
      expect(step.references.length).toBeGreaterThan(0);
    });

    // Check specific positions have recitations
    const fatihahStep = salahLessonData.steps.find((s) => s.order === 2);
    expect(fatihahStep?.recitationArabic).toContain("الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ");

    const tashahhudStep = salahLessonData.steps.find((s) => s.order === 9);
    expect(tashahhudStep?.recitationArabic).toContain("التَّحِيَّاتُ لِلَّهِ");
  });

  it("verifies Hadiths authenticity and attribution", () => {
    expect(hadithsData.length).toBeGreaterThanOrEqual(6);
    hadithsData.forEach((hadith) => {
      expect(hadith.narrator).toBeTruthy();
      expect(hadith.collection).toMatch(/صحيح البخاري|صحيح مسلم|سنن/);
      expect(hadith.arabicText).toBeTruthy();
      expect(hadith.verificationStatus).toBe("verified");
    });
  });

  it("verifies categories configuration", () => {
    expect(categoriesData.length).toBe(3);
    const slugs = categoriesData.map((c) => c.slug);
    expect(slugs).toContain("wudu");
    expect(slugs).toContain("salah");
    expect(slugs).toContain("hadiths");
  });
});

describe("Visual Assets Verification (Phase 05)", () => {
  it("verifies all Wudu step illustrations exist on disk", () => {
    for (let i = 1; i <= 10; i++) {
      const stepNumber = String(i).padStart(2, "0");
      const filePath = path.resolve(__dirname, `../public/images/wudu/step-${stepNumber}.svg`);
      expect(fs.existsSync(filePath)).toBe(true);
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("<svg");
    }
  });

  it("verifies all Salah step illustrations exist on disk", () => {
    for (let i = 1; i <= 11; i++) {
      const stepNumber = String(i).padStart(2, "0");
      const filePath = path.resolve(__dirname, `../public/images/salah/step-${stepNumber}.svg`);
      expect(fs.existsSync(filePath)).toBe(true);
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("<svg");
    }
  });

  it("verifies hero illustration exists on disk", () => {
    const heroPath = path.resolve(__dirname, "../public/images/hero/hero-illustration.svg");
    expect(fs.existsSync(heroPath)).toBe(true);
  });
});
