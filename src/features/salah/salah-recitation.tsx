import type { ILessonStep } from "@/types";

export function SalahRecitation({
  recitationArabic,
  recitationTranslation,
}: Pick<ILessonStep, "recitationArabic" | "recitationTranslation">) {
  if (!recitationArabic) return null;

  return (
    <div className="rounded-lg bg-primary-light/60 p-4">
      <h4 className="mb-2 font-bold text-primary">الذكر أو التلاوة</h4>
      <p className="font-traditional text-xl leading-[2.2] text-foreground">
        {recitationArabic}
      </p>
      {recitationTranslation && (
        <p className="mt-2 text-sm leading-6 text-foreground/60" dir="ltr">
          {recitationTranslation}
        </p>
      )}
    </div>
  );
}
