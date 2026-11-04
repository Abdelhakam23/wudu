import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WuduStepClassification } from "@/features/wudu/wudu-step-classification";
import { SalahPositionImage } from "@/features/salah/salah-position-image";
import { SalahStepDetails } from "@/features/salah/salah-step-details";
import { SalahRecitation } from "@/features/salah/salah-recitation";
import { SalahReferences } from "@/features/salah/salah-references";
import type { ILessonStep } from "@/types";

export function SalahStep({ step }: { step: ILessonStep }) {
  return (
    <Card id={`step-${step.order}`} className="scroll-mt-24 overflow-hidden border-border/80">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <SalahPositionImage step={step} />
        <div>
          <CardHeader className="gap-3 pb-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-primary">
                الموضع {step.order}
              </span>
              <WuduStepClassification classification={step.classification} />
            </div>
            <CardTitle className="text-2xl leading-relaxed">{step.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <SalahStepDetails step={step} />
            <SalahRecitation
              recitationArabic={step.recitationArabic}
              recitationTranslation={step.recitationTranslation}
            />
            <SalahReferences references={step.references} />
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
