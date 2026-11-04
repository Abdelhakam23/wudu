import { describe, it, expect } from "vitest";
import {
  objectIdSchema,
  hadithIdSchema,
  searchQuerySchema,
  hadithFilterSchema,
  lessonCategorySchema,
  lessonSlugSchema,
} from "../src/lib/validations";
import { successResponse, errorResponse } from "../src/lib/api-response";
import { checkPublicRateLimit } from "../src/lib/security";

describe("Validation Schemas", () => {
  it("validates a valid object identifier", () => {
    const validId = "507f1f77bcf86cd799439011";
    expect(objectIdSchema.safeParse(validId).success).toBe(true);
  });

  it("rejects an invalid object identifier", () => {
    const invalidId = "123-not-an-id";
    expect(objectIdSchema.safeParse(invalidId).success).toBe(false);
  });

  it("accepts verified seed Hadith identifiers", () => {
    expect(hadithIdSchema.safeParse("hadith-1").success).toBe(true);
    expect(hadithIdSchema.safeParse("hadith-nope").success).toBe(false);
  });

  it("validates search query within valid length and category", () => {
    const valid = { q: "الوضوء", category: "wudu", page: 1, limit: 10 };
    const result = searchQuerySchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects empty search query", () => {
    const invalid = { q: "", category: "all" };
    const result = searchQuerySchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("validates hadith filters with defaults", () => {
    const emptyFilter = {};
    const parsed = hadithFilterSchema.safeParse(emptyFilter);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.topic).toBe("all");
      expect(parsed.data.page).toBe(1);
      expect(parsed.data.limit).toBe(10);
    }
  });

  it("validates lesson categories and safe slugs", () => {
    expect(lessonCategorySchema.safeParse("wudu").success).toBe(true);
    expect(lessonCategorySchema.safeParse("admin").success).toBe(false);
    expect(lessonSlugSchema.safeParse("complete-wudu-guide").success).toBe(true);
    expect(lessonSlugSchema.safeParse("../admin").success).toBe(false);
  });

  it("limits repeated public requests", () => {
    const key = `test-rate-limit-${Date.now()}`;
    expect(checkPublicRateLimit(key, 1, 60_000).allowed).toBe(true);
    expect(checkPublicRateLimit(key, 1, 60_000).allowed).toBe(false);
  });
});

describe("API Response Utilities", () => {
  it("generates correct successResponse structure", async () => {
    const res = successResponse({ test: 123 }, { total: 1 });
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data).toEqual({ test: 123 });
    expect(json.meta?.total).toBe(1);
    expect(res.status).toBe(200);
  });

  it("generates correct errorResponse structure", async () => {
    const res = errorResponse("رسالة الخطأ", "TEST_ERROR", 400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error?.message).toBe("رسالة الخطأ");
    expect(json.error?.code).toBe("TEST_ERROR");
    expect(res.status).toBe(400);
  });
});
