import { NextRequest } from "next/server";
import { hadithService } from "@/services/hadith.service";
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
      return errorResponse("معرف الحديث غير صالح", "INVALID_ID", 400);
    }

    const hadith = await hadithService.getHadithById(params.id);
    if (!hadith) {
      return errorResponse("الحديث المطلوب غير موجود", "NOT_FOUND", 404);
    }

    return successResponse(hadith);
  } catch (error) {
    console.error(`API Error in /api/hadiths/${params.id}:`, error);
    return errorResponse("تعذر جلب تفاصيل الحديث", "INTERNAL_SERVER_ERROR", 500);
  }
}
