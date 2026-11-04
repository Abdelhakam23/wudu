import { NextRequest } from "next/server";
import { hadithService } from "@/services/hadith.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { hadithFilterSchema } from "@/lib/validations";
import { checkPublicRateLimit, getClientAddress } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const rateLimit = checkPublicRateLimit(`hadiths:${getClientAddress(request)}`);
    if (!rateLimit.allowed) {
      return errorResponse(
        "تم تجاوز حد الطلبات، يرجى المحاولة بعد قليل",
        "RATE_LIMITED",
        429,
        { retryAfterSeconds: rateLimit.retryAfterSeconds }
      );
    }
    const { searchParams } = new URL(request.url);
    const rawParams = {
      q: searchParams.get("q") || undefined,
      topic: searchParams.get("topic") || "all",
      collection: searchParams.get("collection") || undefined,
      grading: searchParams.get("grading") || undefined,
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
    };

    const parsed = hadithFilterSchema.safeParse(rawParams);
    if (!parsed.success) {
      return errorResponse("معايير البحث غير صالحة", "VALIDATION_ERROR", 400, parsed.error.format());
    }

    const result = await hadithService.getVerifiedHadiths(parsed.data);
    return successResponse(result.data, {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    });
  } catch (error) {
    console.error("API Error in /api/hadiths:", error);
    return errorResponse("تعذر جلب الأحاديث النبوية", "INTERNAL_SERVER_ERROR", 500);
  }
}
