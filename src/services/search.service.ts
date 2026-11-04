import { SearchRepository, SearchResultItem } from "@/repositories/search.repository";
import { normalizeArabicText } from "@/lib/utils";

export class SearchService {
  private repository: SearchRepository;

  constructor() {
    this.repository = new SearchRepository();
  }

  /**
   * Performs Arabic-normalized search across the platform
   */
  async search(query: string, category: string = "all"): Promise<SearchResultItem[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }

    try {
      const normalized = normalizeArabicText(query);
      // Run search using normalized / sanitized query
      return await this.repository.search(normalized, category);
    } catch (error) {
      console.error("Error in SearchService.search:", error);
      return [];
    }
  }
}

export const searchService = new SearchService();
