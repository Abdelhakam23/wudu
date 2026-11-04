import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WuduStepClassification } from "@/features/wudu/wudu-step-classification";
import { WuduStepDetails } from "@/features/wudu/wudu-step-details";
import { WuduStepImage } from "@/features/wudu/wudu-step-image";
import { WuduStepReferences } from "@/features/wudu/wudu-step-references";
import type { ILessonStep } from "@/types";

interface WuduStepProps {
  step: ILessonStep;
}

export function WuduStep({ step }: WuduStepProps) {
  return (
    <Card id={`step-${step.order}`} className="scroll-mt-24 overflow-hidden border-border/80">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <WuduStepImage step={step} />
        <div>
          <CardHeader className="gap-3 pb-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-primary">
                الخطوة {step.order}
              </span>
              <WuduStepClassification classification={step.classification} />
            </div>
            <CardTitle className="text-2xl leading-relaxed">
              {step.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <WuduStepDetails step={step} />
            <WuduStepReferences references={step.references} />
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
