import { NextRequest } from "next/server";
import { searchService } from "@/services/search.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { searchQuerySchema } from "@/lib/validations";
import { checkPublicRateLimit, getClientAddress } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const rateLimit = checkPublicRateLimit(`search:${getClientAddress(request)}`);
    if (!rateLimit.allowed) {
      return errorResponse(
        "تم تجاوز حد الطلبات، يرجى المحاولة بعد قليل",
        "RATE_LIMITED",
        429,
        { retryAfterSeconds: rateLimit.retryAfterSeconds }
      );
    }
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || "all";

    if (!q.trim()) {
      return successResponse([]);
    }

    const validation = searchQuerySchema.safeParse({ q, category });
    if (!validation.success) {
      return errorResponse("استعلام البحث غير صالح", "VALIDATION_ERROR", 400, validation.error.format());
    }

    const results = await searchService.search(
      validation.data.q,
      validation.data.category,
      validation.data.page,
      validation.data.limit
    );
    return successResponse(results.data, {
      page: results.page,
      limit: results.limit,
      total: results.total,
      totalPages: results.totalPages,
    });
  } catch (error) {
    console.error("API Error in /api/search:", error);
    return errorResponse("حدث خطأ أثناء البحث", "INTERNAL_SERVER_ERROR", 500);
  }
}
