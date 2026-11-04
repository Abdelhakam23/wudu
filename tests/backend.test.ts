import { describe, it, expect } from "vitest";
import {
  objectIdSchema,
  searchQuerySchema,
  hadithFilterSchema,
} from "../src/lib/validations";
import { successResponse, errorResponse } from "../src/lib/api-response";

describe("Validation Schemas", () => {
  it("validates valid MongoDB ObjectId", () => {
    const validId = "507f1f77bcf86cd799439011";
    expect(objectIdSchema.safeParse(validId).success).toBe(true);
  });

  it("rejects invalid MongoDB ObjectId", () => {
    const invalidId = "123-not-an-id";
    expect(objectIdSchema.safeParse(invalidId).success).toBe(false);
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
