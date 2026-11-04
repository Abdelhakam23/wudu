import { connectToDatabase } from "@/lib/mongodb";
import { Lesson, LessonStep, ILessonDocument, ILessonStepDocument } from "@/models";
import { ILesson, ILessonStep, LessonCategory, LessonStatus } from "@/types";

export class LessonRepository {
  /**
   * Map Mongoose lesson document to pure ILesson DTO
   */
  private mapLesson(doc: ILessonDocument & { _id: { toString(): string } }): ILesson {
    return {
      id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      description: doc.description,
      category: doc.category,
      introduction: doc.introduction,
      coverImage: doc.coverImage,
      status: doc.status,
      order: doc.order,
      createdAt: doc.createdAt?.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
    };
  }

  /**
   * Map Mongoose step document to pure ILessonStep DTO
   */
  private mapStep(doc: ILessonStepDocument & { _id: { toString(): string } }): ILessonStep {
    return {
      id: doc._id.toString(),
      lessonId: doc.lessonId.toString(),
      title: doc.title,
      slug: doc.slug,
      description: doc.description,
      detailedExplanation: doc.detailedExplanation,
      image: doc.image,
      imageAlt: doc.imageAlt,
      order: doc.order,
      classification: doc.classification,
      notes: doc.notes || [],
      references: doc.references || [],
      recitationArabic: doc.recitationArabic,
      recitationTranslation: doc.recitationTranslation,
      createdAt: doc.createdAt?.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
    };
  }

  /**
   * Find published lessons optionally filtered by category
   */
  async findPublishedLessons(category?: LessonCategory): Promise<ILesson[]> {
    await connectToDatabase();
    const query: { status: LessonStatus; category?: LessonCategory } = { status: "published" };
    if (category) {
      query.category = category;
    }

    const docs = await Lesson.find(query).sort({ order: 1 }).lean().exec();
    return docs.map((d) => this.mapLesson(d as unknown as ILessonDocument & { _id: { toString(): string } }));
  }

  /**
   * Find a single lesson by its unique slug
   */
  async findLessonBySlug(slug: string): Promise<ILesson | null> {
    await connectToDatabase();
    const doc = await Lesson.findOne({ slug }).lean().exec();
    if (!doc) return null;
    return this.mapLesson(doc as unknown as ILessonDocument & { _id: { toString(): string } });
  }

  /**
   * Find a lesson by its ObjectId
   */
  async findLessonById(id: string): Promise<ILesson | null> {
    await connectToDatabase();
    const doc = await Lesson.findById(id).lean().exec();
    if (!doc) return null;
    return this.mapLesson(doc as unknown as ILessonDocument & { _id: { toString(): string } });
  }

  /**
   * Find all steps for a given lessonId in ascending order
   */
  async findStepsByLessonId(lessonId: string): Promise<ILessonStep[]> {
    await connectToDatabase();
    const docs = await LessonStep.find({ lessonId }).sort({ order: 1 }).lean().exec();
    return docs.map((d) => this.mapStep(d as unknown as ILessonStepDocument & { _id: { toString(): string } }));
  }

  /**
   * Find a specific step by its unique slug within a lesson
   */
  async findStepBySlug(lessonId: string, slug: string): Promise<ILessonStep | null> {
    await connectToDatabase();
    const doc = await LessonStep.findOne({ lessonId, slug }).lean().exec();
    if (!doc) return null;
    return this.mapStep(doc as unknown as ILessonStepDocument & { _id: { toString(): string } });
  }

  /**
   * Find step by ID
   */
  async findStepById(id: string): Promise<ILessonStep | null> {
    await connectToDatabase();
    const doc = await LessonStep.findById(id).lean().exec();
    if (!doc) return null;
    return this.mapStep(doc as unknown as ILessonStepDocument & { _id: { toString(): string } });
  }

  /**
   * Count steps in a lesson
   */
  async countStepsInLesson(lessonId: string): Promise<number> {
    await connectToDatabase();
    return LessonStep.countDocuments({ lessonId }).exec();
  }
}
