import { HadithFilterOptions, IHadith, PaginatedResult } from "@/types";
import { hadithsData } from "@/lib/seed/hadith-data";

export class HadithService {
  /**
   * Get verified Hadiths with filtering & pagination
   */
  async getVerifiedHadiths(
    options: HadithFilterOptions = {}
  ): Promise<PaginatedResult<IHadith>> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const topic = options.topic || "all";

    let filtered = hadithsData.map((h, idx) => ({
      ...h,
      id: `hadith-${idx + 1}`,
    }));

    if (options.q) {
      const query = options.q.trim().toLocaleLowerCase("ar");
      filtered = filtered.filter((h) =>
        [h.arabicText, h.narrator, h.explanation]
          .filter(Boolean)
          .some((value) => value.toLocaleLowerCase("ar").includes(query))
      );
    }

    if (topic && topic !== "all") {
      filtered = filtered.filter((h) => h.topic === topic);
    }

    if (options.collection) {
      filtered = filtered.filter((h) =>
        h.collection.toLowerCase().includes(options.collection!.toLowerCase())
      );
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      data: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get a single verified Hadith by ID
   */
  async getHadithById(id: string): Promise<IHadith | null> {
    const seed = hadithsData.map((h, idx) => ({
      ...h,
      id: `hadith-${idx + 1}`,
    }));

    return seed.find((h) => h.id === id) || null;
  }

  /**
   * Get featured Hadith for homepage showcase
   */
  async getFeaturedHadith(): Promise<IHadith | null> {
    const first = hadithsData[0];
    return first ? { ...first, id: "hadith-1" } : null;
  }
}

export const hadithService = new HadithService();
