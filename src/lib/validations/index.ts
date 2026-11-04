import { z } from "zod";

export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "معرف غير صالح");

export const searchQuerySchema = z.object({
  q: z
    .string()
    .min(1, "يرجى إدخال كلمة للبحث")
    .max(100, "كلمة البحث طويلة للغاية"),
  category: z.enum(["all", "wudu", "salah", "hadith"]).default("all"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export const hadithFilterSchema = z.object({
  topic: z.enum(["all", "wudu", "salah", "general_purification"]).default("all"),
  collection: z.string().optional(),
  grading: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export const lessonFilterSchema = z.object({
  category: z.enum(["all", "wudu", "salah"]).default("all"),
  status: z.enum(["published", "draft"]).default("published"),
});
