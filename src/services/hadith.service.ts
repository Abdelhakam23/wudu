import { HadithRepository, HadithFilterOptions, PaginatedResult } from "@/repositories/hadith.repository";
import { IHadith } from "@/types";

export class HadithService {
  private repository: HadithRepository;

  constructor() {
    this.repository = new HadithRepository();
  }

  /**
   * Get verified Hadiths with filtering & pagination
   */
  async getVerifiedHadiths(options: HadithFilterOptions = {}): Promise<PaginatedResult<IHadith>> {
    try {
      return await this.repository.findHadiths({
        ...options,
        verificationStatus: "verified",
      });
    } catch (error) {
      console.error("Error in HadithService.getVerifiedHadiths:", error);
      return {
        data: [],
        total: 0,
        page: options.page || 1,
        limit: options.limit || 10,
        totalPages: 0,
      };
    }
  }

  /**
   * Get a single verified Hadith by ID
   */
  async getHadithById(id: string): Promise<IHadith | null> {
    try {
      const hadith = await this.repository.findHadithById(id);
      if (!hadith || hadith.verificationStatus !== "verified") {
        return null;
      }
      return hadith;
    } catch (error) {
      console.error(`Error in HadithService.getHadithById [${id}]:`, error);
      return null;
    }
  }

  /**
   * Get featured Hadith for homepage showcase
   */
  async getFeaturedHadith(): Promise<IHadith | null> {
    try {
      return await this.repository.getFeaturedHadith();
    } catch (error) {
      console.error("Error in HadithService.getFeaturedHadith:", error);
      return null;
    }
  }
}

export const hadithService = new HadithService();
