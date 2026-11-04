import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import type { ILessonStep } from "@/types";

export function SalahPositionImage({
  step,
}: {
  step: Pick<ILessonStep, "image" | "imageAlt" | "title" | "order">;
}) {
  return (
    <div className="flex min-h-[260px] items-center justify-center rounded-xl bg-brand-sage/35 p-5 md:min-h-[360px]">
      <ImageWithFallback
        src={step.image}
        alt={step.imageAlt || step.title}
        width={640}
        height={420}
        className="h-full max-h-[330px] w-full max-w-[520px] object-contain"
        fallbackText={`الصورة التوضيحية للموضع ${step.order}`}
      />
    </div>
  );
}
