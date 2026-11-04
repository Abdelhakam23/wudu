import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Category } from "@/models";
import { successResponse, errorResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find().sort({ order: 1 }).lean().exec();
    const data = categories.map((c) => ({
      id: (c._id as { toString(): string }).toString(),
      name: c.name,
      slug: c.slug,
      description: c.description,
      order: c.order,
    }));
    return successResponse(data);
  } catch (error) {
    console.error("API Error in /api/categories:", error);
    return errorResponse("تعذر جلب التصنيفات", "INTERNAL_SERVER_ERROR", 500);
  }
}
