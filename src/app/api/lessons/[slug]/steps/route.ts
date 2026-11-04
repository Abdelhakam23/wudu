import { NextRequest } from "next/server";
import { lessonService } from "@/services/lesson.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { lessonCategorySchema, lessonSlugSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    if (
      !lessonSlugSchema.safeParse(slug).success &&
      !lessonCategorySchema.safeParse(slug).success
    ) {
      return errorResponse("معرف الدرس غير صالح", "INVALID_SLUG", 400);
    }
    const { lesson, steps } = await lessonService.getLessonWithSteps(slug);

    if (!lesson) {
      return errorResponse("الدرس المطلوب غير موجود", "NOT_FOUND", 404);
    }

    return successResponse(steps);
  } catch (error) {
    console.error(`API Error in /api/lessons/${params.slug}/steps:`, error);
    return errorResponse("تعذر جلب خطوات الدرس", "INTERNAL_SERVER_ERROR", 500);
  }
}
