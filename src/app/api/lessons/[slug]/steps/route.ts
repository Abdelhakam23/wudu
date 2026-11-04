import { NextRequest } from "next/server";
import { lessonService } from "@/services/lesson.service";
import { successResponse, errorResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
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
