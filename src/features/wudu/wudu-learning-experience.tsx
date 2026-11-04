"use client";

import { useState } from "react";
import { List, CheckCircle2 } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { WuduProgress } from "@/features/wudu/wudu-progress";
import { WuduStep } from "@/features/wudu/wudu-step";
import { WuduStepNavigation } from "@/features/wudu/wudu-step-navigation";
import type { ILessonStep } from "@/types";

interface WuduLearningExperienceProps {
  steps: ILessonStep[];
}

export function WuduLearningExperience({
  steps,
}: WuduLearningExperienceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (steps.length === 0) {
    return (
      <EmptyState
        title="لا توجد خطوات متاحة حالياً"
        description="تعذر العثور على خطوات هذا الدرس. يرجى المحاولة مرة أخرى لاحقاً."
      />
    );
  }

  const currentStep = steps[currentIndex];
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === steps.length - 1;

  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <section id="wudu-steps" className="scroll-mt-24 space-y-6">
      <div className="flex items-center gap-3">
        <List className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold md:text-3xl">خطوات الوضوء</h2>
      </div>
      <WuduProgress
        currentStep={currentIndex + 1}
        totalSteps={steps.length}
      />
      <div className="flex gap-2 overflow-x-auto pb-2" aria-label="اختيار خطوة">
        {steps.map((step, index) => (
          <Button
            key={step.id}
            type="button"
            variant={index === currentIndex ? "default" : "outline"}
            size="sm"
            onClick={() => goToStep(index)}
            aria-current={index === currentIndex ? "step" : undefined}
            className="shrink-0 gap-1.5"
          >
            {index < currentIndex && <CheckCircle2 className="h-3.5 w-3.5" />}
            {step.order}
          </Button>
        ))}
      </div>
      <WuduStep step={currentStep} />
      <WuduStepNavigation
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onPrevious={() => goToStep(currentIndex - 1)}
        onNext={() => goToStep(currentIndex + 1)}
      />
      {isLastStep && (
        <p className="rounded-lg bg-brand-sage/45 p-4 text-center font-semibold text-primary">
          أحسنت! أتممت خطوات الوضوء، ويمكنك مراجعة أي خطوة بالضغط عليها.
        </p>
      )}
    </section>
  );
}
