import { connectToDatabase } from "@/lib/mongodb";
import { Lesson, LessonStep, Hadith, ILessonDocument } from "@/models";
import { sanitizeSearchQuery } from "@/lib/security";
import { FilterQuery } from "mongoose";

export interface SearchResultItem {
  id: string;
  type: "wudu" | "salah" | "hadith";
  title: string;
  snippet: string;
  url: string;
  categoryName: string;
  badge?: string;
}

export interface SearchResultPage {
  data: SearchResultItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class SearchRepository {
  /**
   * Search across lessons, steps, and hadiths with regex safety and category limits
   */
  async search(rawQuery: string, category: string = "all"): Promise<SearchResultItem[]> {
    await connectToDatabase();
    const sanitized = sanitizeSearchQuery(rawQuery);
    if (!sanitized) return [];

    const regex = new RegExp(sanitized, "i");
    const results: SearchResultItem[] = [];

    // 1. Search Lessons & Steps (unless category is explicitly "hadith")
    if (category === "all" || category === "wudu" || category === "salah") {
      const lessonQuery: FilterQuery<ILessonDocument> = {
        status: "published",
        $or: [{ title: regex }, { description: regex }, { introduction: regex }],
      };
      if (category !== "all") {
        lessonQuery.category = category;
      }

      const lessons = await Lesson.find(lessonQuery).limit(5).lean().exec();
      for (const l of lessons) {
        results.push({
          id: (l._id as { toString(): string }).toString(),
          type: l.category as "wudu" | "salah",
          title: l.title,
          snippet: l.description,
          url: `/${l.category}`,
          categoryName: l.category === "wudu" ? "الوضوء" : "الصلاة",
          badge: "درس",
        });
      }

      // Search Lesson Steps
      const stepQuery = {
        $or: [
          { title: regex },
          { description: regex },
          { detailedExplanation: regex },
          { recitationArabic: regex },
        ],
      };

      const steps = await LessonStep.find(stepQuery)
        .populate("lessonId", "slug category")
        .limit(10)
        .lean()
        .exec();

      for (const s of steps) {
        const lesson = s.lessonId as unknown as { slug: string; category: "wudu" | "salah" };
        if (lesson && (category === "all" || lesson.category === category)) {
          results.push({
            id: (s._id as { toString(): string }).toString(),
            type: lesson.category,
            title: s.title,
            snippet: s.description || s.detailedExplanation.slice(0, 120) + "...",
            url: `/${lesson.category}#step-${s.order}`,
            categoryName: lesson.category === "wudu" ? "خطوات الوضوء" : "صفة الصلاة",
            badge: s.classification === "obligatory" ? "ركن / فرض" : "سنة",
          });
        }
      }
    }

    // 2. Search Hadiths (unless category is explicitly "wudu" or "salah")
    if (category === "all" || category === "hadith") {
      const hadithQuery = {
        verificationStatus: "verified",
        $or: [
          { arabicText: regex },
          { narrator: regex },
          { collection: regex },
          { explanation: regex },
        ],
      };

      const hadiths = await Hadith.find(hadithQuery).limit(10).lean().exec();
      for (const h of hadiths) {
        results.push({
          id: (h._id as { toString(): string }).toString(),
          type: "hadith",
          title: `حديث رواه ${h.narrator}`,
          snippet: h.arabicText.slice(0, 140) + "...",
          url: `/hadiths#hadith-${(h._id as { toString(): string }).toString()}`,
          categoryName: "الأحاديث النبوية",
          badge: h.grading || "حديث صحيح",
        });
      }
    }

    return results;
  }
}
