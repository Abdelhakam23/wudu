export type LessonCategory = "wudu" | "salah";
export type LessonStatus = "draft" | "published";
export type StepClassification = "obligatory" | "sunnah" | "recommended" | "educational";
export type HadithTopic = "wudu" | "salah" | "general_purification";
export type VerificationStatus = "verified" | "pending_review";

export interface IReference {
  title: string;
  source: string;
  url?: string;
}

export interface ILessonStep {
  id: string;
  lessonId: string;
  title: string;
  slug: string;
  description: string;
  detailedExplanation: string;
  image: string;
  imageAlt: string;
  order: number;
  classification: StepClassification;
  notes: string[];
  references: IReference[];
  recitationArabic?: string;
  recitationTranslation?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: LessonCategory;
  introduction: string;
  coverImage: string;
  status: LessonStatus;
  order: number;
  stepsCount?: number;
  steps?: ILessonStep[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IHadith {
  id: string;
  arabicText: string;
  narrator: string;
  collection: string;
  book?: string;
  chapter?: string;
  hadithNumber?: string;
  grading?: string;
  topic: HadithTopic;
  explanation?: string;
  sourceUrl?: string;
  verificationStatus: VerificationStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface HadithFilterOptions {
  q?: string;
  topic?: HadithTopic | "all";
  collection?: string;
  grading?: string;
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

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
