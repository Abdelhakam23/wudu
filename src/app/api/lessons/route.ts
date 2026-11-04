import { NextRequest } from "next/server";
import { lessonService } from "@/services/lesson.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { LessonCategory } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");

    const category =
      categoryParam === "wudu" || categoryParam === "salah"
        ? (categoryParam as LessonCategory)
        : undefined;

    const lessons = await lessonService.getPublishedLessons(category);
    return successResponse(lessons);
  } catch (error) {
    console.error("API Error in /api/lessons:", error);
    return errorResponse("تعذر جلب الدروس التعليمية", "INTERNAL_SERVER_ERROR", 500);
  }
}
