import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.string().default("3000"),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: z.string().default("منصة تعليم الوضوء والصلاة"),
  MONGODB_URI: z.string().default("mongodb://localhost:27017/wudu_salah_db"),
  MONGODB_DB_NAME: z.string().default("wudu_salah_db"),
  ADMIN_JWT_SECRET: z.string().default("dev_secret_key_for_local_testing_only_must_be_changed_in_prod_1234567890"),
  SESSION_MAX_AGE_DAYS: z.coerce.number().default(7),
  SUNNAH_API_KEY: z.string().optional(),
  DORAR_API_KEY: z.string().optional(),
});

export const env = envSchema.superRefine((values, context) => {
  if (
    values.NODE_ENV === "production" &&
    values.ADMIN_JWT_SECRET.includes("dev_secret_key_for_local_testing_only")
  ) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["ADMIN_JWT_SECRET"],
      message: "ADMIN_JWT_SECRET must be replaced with a production secret",
    });
  }
}).parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
  SESSION_MAX_AGE_DAYS: process.env.SESSION_MAX_AGE_DAYS,
  SUNNAH_API_KEY: process.env.SUNNAH_API_KEY,
  DORAR_API_KEY: process.env.DORAR_API_KEY,
});

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  url: env.NEXT_PUBLIC_APP_URL,
  description: "منصة تعليمية إسلامية موثوقة لتعليم الوضوء والصلاة",
};
