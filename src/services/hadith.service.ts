import {
  HadithRepository,
  HadithFilterOptions,
  PaginatedResult,
} from "@/repositories/hadith.repository";
import { IHadith } from "@/types";
import { hadithsData } from "@/lib/seed/hadith-data";

export class HadithService {
  private repository: HadithRepository;

  constructor() {
    this.repository = new HadithRepository();
  }

  /**
   * Get verified Hadiths with filtering & pagination
   */
  async getVerifiedHadiths(
    options: HadithFilterOptions = {}
  ): Promise<PaginatedResult<IHadith>> {
    try {
      const result = await this.repository.findHadiths({
        ...options,
        verificationStatus: "verified",
      });
      if (result.data.length > 0) {
        return result;
      }
    } catch (error) {
      console.warn("Database lookup failed for hadiths, using verified seed data:", error);
    }

    // Fallback to verified seed data
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
    try {
      const hadith = await this.repository.findHadithById(id);
      if (hadith && hadith.verificationStatus === "verified") {
        return hadith;
      }
    } catch {
      // ignore
    }

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
    try {
      const hadith = await this.repository.getFeaturedHadith();
      if (hadith) return hadith;
    } catch {
      // ignore
    }

    const first = hadithsData[0];
    return first ? { ...first, id: "hadith-1" } : null;
  }
}

export const hadithService = new HadithService();
