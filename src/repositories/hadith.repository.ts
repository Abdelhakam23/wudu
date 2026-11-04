import { connectToDatabase } from "@/lib/mongodb";
import { Hadith, IHadithSchema } from "@/models";
import { IHadith, HadithTopic, VerificationStatus } from "@/types";

export interface HadithFilterOptions {
  q?: string;
  topic?: HadithTopic | "all";
  collection?: string;
  grading?: string;
  verificationStatus?: VerificationStatus;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class HadithRepository {
  private mapHadith(doc: IHadithSchema & { _id: { toString(): string } }): IHadith {
    return {
      id: doc._id.toString(),
      arabicText: doc.arabicText,
      narrator: doc.narrator,
      collection: doc.collection,
      book: doc.book,
      chapter: doc.chapter,
      hadithNumber: doc.hadithNumber,
      grading: doc.grading,
      topic: doc.topic,
      explanation: doc.explanation,
      sourceUrl: doc.sourceUrl,
      verificationStatus: doc.verificationStatus,
      createdAt: doc.createdAt?.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
    };
  }

  /**
   * Find paginated hadiths with filtering
   */
  async findHadiths(options: HadithFilterOptions = {}): Promise<PaginatedResult<IHadith>> {
    await connectToDatabase();

    const {
      q,
      topic = "all",
      collection,
      grading,
      verificationStatus = "verified",
      page = 1,
      limit = 10,
    } = options;

    const query: {
      verificationStatus: VerificationStatus;
      $or?: Array<Record<string, { $regex: string; $options: string }>>;
      topic?: HadithTopic;
      collection?: { $regex: string; $options: string };
      grading?: string;
    } = { verificationStatus };

    if (q) {
      const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { arabicText: { $regex: escapedQuery, $options: "i" } },
        { narrator: { $regex: escapedQuery, $options: "i" } },
        { explanation: { $regex: escapedQuery, $options: "i" } },
      ];
    }

    if (topic && topic !== "all") {
      query.topic = topic;
    }

    if (collection) {
      const escapedCollection = collection.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.collection = { $regex: escapedCollection, $options: "i" };
    }

    if (grading) {
      query.grading = grading;
    }

    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      Hadith.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      Hadith.countDocuments(query).exec(),
    ]);

    const data = docs.map((d) =>
      this.mapHadith(d as unknown as IHadithSchema & { _id: { toString(): string } })
    );

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Find a single hadith by ID
   */
  async findHadithById(id: string): Promise<IHadith | null> {
    await connectToDatabase();
    const doc = await Hadith.findById(id).lean().exec();
    if (!doc) return null;
    return this.mapHadith(doc as unknown as IHadithSchema & { _id: { toString(): string } });
  }

  /**
   * Get featured verified hadiths (e.g. for homepage)
   */
  async getFeaturedHadith(): Promise<IHadith | null> {
    await connectToDatabase();
    const doc = await Hadith.findOne({ verificationStatus: "verified" })
      .sort({ createdAt: 1 })
      .lean()
      .exec();
    if (!doc) return null;
    return this.mapHadith(doc as unknown as IHadithSchema & { _id: { toString(): string } });
  }
}
