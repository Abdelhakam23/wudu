import { successResponse, errorResponse } from "@/lib/api-response";
import { categoriesData } from "@/lib/seed/category-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return successResponse(
      categoriesData.map((category, index) => ({
        ...category,
        id: `category-${index + 1}`,
      }))
    );
  } catch (error) {
    console.error("API Error in /api/categories:", error);
    return errorResponse("تعذر جلب التصنيفات", "INTERNAL_SERVER_ERROR", 500);
  }
}
