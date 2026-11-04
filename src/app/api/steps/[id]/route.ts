import { NextRequest } from "next/server";
import { lessonService } from "@/services/lesson.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { objectIdSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const idValidation = objectIdSchema.safeParse(params.id);
    if (!idValidation.success) {
      return errorResponse("معرف الخطوة غير صالح", "INVALID_ID", 400);
    }

    const step = await lessonService.getStepById(params.id);
    if (!step) {
      return errorResponse("الخطوة المطلوبة غير موجودة", "NOT_FOUND", 404);
    }

    return successResponse(step);
  } catch (error) {
    console.error(`API Error in /api/steps/${params.id}:`, error);
    return errorResponse("تعذر جلب تفاصيل الخطوة", "INTERNAL_SERVER_ERROR", 500);
  }
}
