import { ILesson, ILessonStep, LessonCategory } from "@/types";
import { wuduLessonData } from "@/lib/seed/wudu-data";
import { salahLessonData } from "@/lib/seed/salah-data";

export class LessonService {
  /**
   * Get all published lessons with step counts
   */
  async getPublishedLessons(category?: LessonCategory): Promise<ILesson[]> {
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
