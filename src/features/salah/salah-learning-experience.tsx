"use client";

import { useState } from "react";
import { CheckCircle2, List } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { SalahProgress } from "@/features/salah/salah-progress";
import { SalahStep } from "@/features/salah/salah-step";
import { SalahStepNavigation } from "@/features/salah/salah-step-navigation";
import type { ILessonStep } from "@/types";

export function SalahLearningExperience({ steps }: { steps: ILessonStep[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (steps.length === 0) {
    return (
      <EmptyState
        title="لا توجد مواضع متاحة حالياً"
        description="تعذر العثور على خطوات درس الصلاة. يرجى المحاولة لاحقاً."
      />
    );
  }

  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) setCurrentIndex(index);
  };
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === steps.length - 1;

  return (
    <section id="salah-steps" className="scroll-mt-24 space-y-6">
      <div className="flex items-center gap-3">
        <List className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold md:text-3xl">تسلسل الصلاة</h2>
      </div>
      <SalahProgress currentStep={currentIndex + 1} totalSteps={steps.length} />
      <div className="flex gap-2 overflow-x-auto pb-2" aria-label="اختيار موضع الصلاة">
        {steps.map((step, index) => (
          <Button
            key={step.id}
            type="button"
            size="sm"
            variant={index === currentIndex ? "default" : "outline"}
            onClick={() => goToStep(index)}
            aria-current={index === currentIndex ? "step" : undefined}
            className="shrink-0 gap-1.5"
          >
            {index < currentIndex && <CheckCircle2 className="h-3.5 w-3.5" />}
            {step.order}
          </Button>
        ))}
      </div>
      <SalahStep step={steps[currentIndex]} />
      <SalahStepNavigation
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onPrevious={() => goToStep(currentIndex - 1)}
        onNext={() => goToStep(currentIndex + 1)}
      />
      {isLastStep && (
        <p className="rounded-lg bg-brand-sage/45 p-4 text-center font-semibold text-primary">
          أحسنت! راجعت تسلسل الصلاة من التكبير إلى التسليم.
        </p>
      )}
    </section>
  );
}
