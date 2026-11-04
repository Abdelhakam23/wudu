import { LessonRepository } from "@/repositories/lesson.repository";
import { ILesson, ILessonStep, LessonCategory } from "@/types";

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
      // Attach step count to each lesson
      const enriched = await Promise.all(
        lessons.map(async (lesson) => {
          const count = await this.repository.countStepsInLesson(lesson.id);
          return { ...lesson, stepsCount: count };
        })
      );
      return enriched;
    } catch (error) {
      console.error("Error fetching published lessons:", error);
      return [];
    }
  }

  /**
   * Get a full lesson by category or slug including its steps
   */
  async getLessonWithSteps(slugOrCategory: string): Promise<{
    lesson: ILesson | null;
    steps: ILessonStep[];
  }> {
    try {
      // First try to find by slug
      let lesson = await this.repository.findLessonBySlug(slugOrCategory);

      // If not found by slug, check if slugOrCategory is a category (e.g. "wudu" or "salah")
      if (!lesson && (slugOrCategory === "wudu" || slugOrCategory === "salah")) {
        const lessons = await this.repository.findPublishedLessons(
          slugOrCategory as LessonCategory
        );
        if (lessons.length > 0) {
          lesson = lessons[0];
        }
      }

      if (!lesson) {
        return { lesson: null, steps: [] };
      }

      const steps = await this.repository.findStepsByLessonId(lesson.id);
      return {
        lesson: { ...lesson, stepsCount: steps.length },
        steps,
      };
    } catch (error) {
      console.error(`Error fetching lesson with steps for [${slugOrCategory}]:`, error);
      return { lesson: null, steps: [] };
    }
  }

  /**
   * Get step by ID
   */
  async getStepById(id: string): Promise<ILessonStep | null> {
    try {
      return await this.repository.findStepById(id);
    } catch (error) {
      console.error(`Error fetching step [${id}]:`, error);
      return null;
    }
  }
}

export const lessonService = new LessonService();
