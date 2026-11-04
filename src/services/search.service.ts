import { SearchResultItem, SearchResultPage } from "@/types";
import { normalizeArabicText } from "@/lib/utils";
import { wuduLessonData } from "@/lib/seed/wudu-data";
import { salahLessonData } from "@/lib/seed/salah-data";
import { hadithsData } from "@/lib/seed/hadith-data";

export class SearchService {
  /**
   * Performs Arabic-normalized search across the platform
   */
  async search(
    query: string,
    category: string = "all",
    page = 1,
    limit = 10
  ): Promise<SearchResultPage> {
    if (!query || query.trim().length === 0) {
      return { data: [], total: 0, page: 1, limit, totalPages: 0 };
    }

    const normalized = normalizeArabicText(query);

    const results: SearchResultItem[] = [];

    // Search Wudu Steps
    if (category === "all" || category === "wudu") {
      if (
        normalizeArabicText(wuduLessonData.title).includes(normalized) ||
        normalizeArabicText(wuduLessonData.description).includes(normalized)
      ) {
        results.push({
          id: "wudu-main",
          type: "wudu",
          title: wuduLessonData.title,
          snippet: wuduLessonData.description,
          url: "/wudu",
          categoryName: "تعلم الوضوء",
          badge: "دليل شامل",
        });
      }

      for (const step of wuduLessonData.steps) {
        if (
          normalizeArabicText(step.title).includes(normalized) ||
          normalizeArabicText(step.description).includes(normalized) ||
          normalizeArabicText(step.detailedExplanation).includes(normalized)
        ) {
          results.push({
            id: `wudu-step-${step.order}`,
            type: "wudu",
            title: step.title,
            snippet: step.description,
            url: `/wudu#step-${step.order}`,
            categoryName: "خطوات الوضوء",
            badge: step.classification === "obligatory" ? "فرض / ركن" : "سنة",
          });
        }
      }
    }

    // Search Salah Steps
    if (category === "all" || category === "salah") {
      if (
        normalizeArabicText(salahLessonData.title).includes(normalized) ||
        normalizeArabicText(salahLessonData.description).includes(normalized)
      ) {
        results.push({
          id: "salah-main",
          type: "salah",
          title: salahLessonData.title,
          snippet: salahLessonData.description,
          url: "/salah",
          categoryName: "تعلم الصلاة",
          badge: "دليل شامل",
        });
      }

      for (const step of salahLessonData.steps) {
        if (
          normalizeArabicText(step.title).includes(normalized) ||
          normalizeArabicText(step.description).includes(normalized) ||
          normalizeArabicText(step.detailedExplanation).includes(normalized) ||
          (step.recitationArabic &&
            normalizeArabicText(step.recitationArabic).includes(normalized))
        ) {
          results.push({
            id: `salah-step-${step.order}`,
            type: "salah",
            title: step.title,
            snippet: step.description,
            url: `/salah#step-${step.order}`,
            categoryName: "صفة الصلاة",
            badge: step.classification === "obligatory" ? "ركن" : "واجب",
          });
        }
      }
    }

    // Search Hadiths
    if (category === "all" || category === "hadith") {
      for (let i = 0; i < hadithsData.length; i++) {
        const h = hadithsData[i];
        if (
          normalizeArabicText(h.arabicText).includes(normalized) ||
          normalizeArabicText(h.narrator).includes(normalized) ||
          normalizeArabicText(h.collection).includes(normalized) ||
          normalizeArabicText(h.explanation).includes(normalized)
        ) {
          results.push({
            id: `hadith-${i + 1}`,
            type: "hadith",
            title: `حديث رواه ${h.narrator}`,
            snippet: h.arabicText.slice(0, 140) + "...",
            url: `/hadiths#hadith-${i + 1}`,
            categoryName: "الأحاديث النبوية",
            badge: h.grading,
          });
        }
      }
    }

    results.sort((a, b) => {
      const aExact = normalizeArabicText(a.title) === normalized ? 1 : 0;
      const bExact = normalizeArabicText(b.title) === normalized ? 1 : 0;
      return bExact - aExact;
    });

    return this.paginate(results, page, limit);
  }

  private paginate(
    results: SearchResultItem[],
    page: number,
    limit: number
  ): SearchResultPage {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(50, Math.max(1, limit));
    const start = (safePage - 1) * safeLimit;
    return {
      data: results.slice(start, start + safeLimit),
      total: results.length,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(results.length / safeLimit),
    };
  }
}

export const searchService = new SearchService();
