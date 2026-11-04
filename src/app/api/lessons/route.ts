import { NextRequest } from "next/server";
import { lessonService } from "@/services/lesson.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { lessonCategorySchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");

    const categoryResult = categoryParam
      ? lessonCategorySchema.safeParse(categoryParam)
      : { success: true as const, data: undefined };
    if (!categoryResult.success) {
      return errorResponse("تصنيف الدرس غير صالح", "VALIDATION_ERROR", 400);
    }

    const lessons = await lessonService.getPublishedLessons(categoryResult.data);
    return successResponse(lessons);
  } catch (error) {
    console.error("API Error in /api/lessons:", error);
    return errorResponse("تعذر جلب الدروس التعليمية", "INTERNAL_SERVER_ERROR", 500);
  }
}
