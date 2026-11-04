export const APP_NAME = "منصة تعليم الوضوء والصلاة";
export const APP_DESCRIPTION =
  "منصة تعليمية إسلامية موثوقة لتعليم صفة الوضوء والصلاة خطوة بخطوة بالأدلة النبوية والرسوم التوضيحية لجميع الفئات العمرية.";

export const NAV_LINKS = [
  { label: "الرئيسية", href: "/" },
  { label: "تعلم الوضوء", href: "/wudu" },
  { label: "تعلم الصلاة", href: "/salah" },
  { label: "الأحاديث النبوية", href: "/hadiths" },
  { label: "البحث", href: "/search" },
] as const;

export const STEP_CLASSIFICATION = {
  OBLIGATORY: "obligatory", // فرض / واجب
  SUNNAH: "sunnah", // سنة مؤكدة / سنة
  RECOMMENDED: "recommended", // مستحب / فضيلة
  EDUCATIONAL: "educational", // تنبيه أو شرح تعليمي
} as const;

export const STEP_CLASSIFICATION_LABELS: Record<string, { label: string; badgeVariant: "default" | "secondary" | "outline" | "success" | "warning" }> = {
  obligatory: { label: "فرض / ركن", badgeVariant: "default" },
  sunnah: { label: "سنة مؤكدة", badgeVariant: "success" },
  recommended: { label: "مستحب", badgeVariant: "secondary" },
  educational: { label: "إرشادي", badgeVariant: "outline" },
};
