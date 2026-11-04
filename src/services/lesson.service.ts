import { LessonRepository } from "@/repositories/lesson.repository";
import { ILesson, ILessonStep, LessonCategory } from "@/types";
import { wuduLessonData } from "@/lib/seed/wudu-data";
import { salahLessonData } from "@/lib/seed/salah-data";

export class LessonService {
  private repository: LessonRepository;

  constructor() {
    this.repository = new LessonRepository();
  }

  /**
   * Get all published lessons with step counts
   */
  async getPublishedLessons(category?: LessonCategory): Promise<ILesson[]> {
    try {
      const lessons = await this.repository.findPublishedLessons(category);
      if (lessons.length > 0) {
        // Attach step count to each lesson
        return await Promise.all(
          lessons.map(async (lesson) => {
            const count = await this.repository.countStepsInLesson(lesson.id);
            return { ...lesson, stepsCount: count };
          })
        );
      }
    } catch (error) {
      console.warn("Database lookup returned error or was unavailable, using verified seed data:", error);
    }

    // Fallback to verified seed data
    const seedLessons: ILesson[] = [
      {
        id: "wudu-lesson-default",
        title: wuduLessonData.title,
        slug: wuduLessonData.slug,
        description: wuduLessonData.description,
        category: wuduLessonData.category,
        introduction: wuduLessonData.introduction,
        coverImage: wuduLessonData.coverImage,
        status: wuduLessonData.status,
        order: wuduLessonData.order,
        stepsCount: wuduLessonData.steps.length,
      },
      {
        id: "salah-lesson-default",
        title: salahLessonData.title,
        slug: salahLessonData.slug,
        description: salahLessonData.description,
        category: salahLessonData.category,
        introduction: salahLessonData.introduction,
        coverImage: salahLessonData.coverImage,
        status: salahLessonData.status,
        order: salahLessonData.order,
        stepsCount: salahLessonData.steps.length,
      },
    ];

    if (category) {
      return seedLessons.filter((l) => l.category === category);
    }
    return seedLessons;
  }

  /**
   * Get a full lesson by category or slug including its steps
   */
  async getLessonWithSteps(slugOrCategory: string): Promise<{
    lesson: ILesson | null;
    steps: ILessonStep[];
  }> {
    try {
      let lesson = await this.repository.findLessonBySlug(slugOrCategory);

      if (!lesson && (slugOrCategory === "wudu" || slugOrCategory === "salah")) {
        const lessons = await this.repository.findPublishedLessons(
          slugOrCategory as LessonCategory
        );
        if (lessons.length > 0) {
          lesson = lessons[0];
        }
      }

      if (lesson) {
        const steps = await this.repository.findStepsByLessonId(lesson.id);
        if (steps.length > 0) {
          return {
            lesson: { ...lesson, stepsCount: steps.length },
            steps,
          };
        }
      }
    } catch (error) {
      console.warn(`Database lookup failed for [${slugOrCategory}], using verified seed data:`, error);
    }

    // Fallback to verified seed data
    if (slugOrCategory === "wudu" || slugOrCategory === "complete-wudu-guide") {
      const steps: ILessonStep[] = wuduLessonData.steps.map((s, idx) => ({
        ...s,
        id: `wudu-step-${idx + 1}`,
        lessonId: "wudu-lesson-default",
      }));
      return {
        lesson: {
          id: "wudu-lesson-default",
          title: wuduLessonData.title,
          slug: wuduLessonData.slug,
          description: wuduLessonData.description,
          category: wuduLessonData.category,
          introduction: wuduLessonData.introduction,
          coverImage: wuduLessonData.coverImage,
          status: wuduLessonData.status,
          order: wuduLessonData.order,
          stepsCount: steps.length,
        },
        steps,
      };
    }

    if (slugOrCategory === "salah" || slugOrCategory === "complete-salah-guide") {
      const steps: ILessonStep[] = salahLessonData.steps.map((s, idx) => ({
        ...s,
        id: `salah-step-${idx + 1}`,
        lessonId: "salah-lesson-default",
      }));
      return {
        lesson: {
          id: "salah-lesson-default",
          title: salahLessonData.title,
          slug: salahLessonData.slug,
          description: salahLessonData.description,
          category: salahLessonData.category,
          introduction: salahLessonData.introduction,
          coverImage: salahLessonData.coverImage,
          status: salahLessonData.status,
          order: salahLessonData.order,
          stepsCount: steps.length,
        },
        steps,
      };
    }

    return { lesson: null, steps: [] };
  }

  /**
   * Get step by ID
   */
  async getStepById(id: string): Promise<ILessonStep | null> {
    try {
      const step = await this.repository.findStepById(id);
      if (step) return step;
    } catch {
      // ignore
    }

    // Check seed steps
    const allSeedSteps = [
      ...wuduLessonData.steps.map((s, idx) => ({
        ...s,
        id: `wudu-step-${idx + 1}`,
        lessonId: "wudu-lesson-default",
      })),
      ...salahLessonData.steps.map((s, idx) => ({
        ...s,
        id: `salah-step-${idx + 1}`,
        lessonId: "salah-lesson-default",
      })),
    ];

    return allSeedSteps.find((s) => s.id === id || s.slug === id) || null;
  }
}

export const lessonService = new LessonService();
