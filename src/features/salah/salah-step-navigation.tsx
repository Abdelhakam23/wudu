import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SalahStepNavigation({
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
}: {
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-border/70 pt-5 sm:flex-row sm:justify-between">
      <Button
        type="button"
        variant="outline"
        disabled={isFirstStep}
        onClick={onPrevious}
        aria-label="موضع الصلاة السابق"
        className="gap-2"
      >
        <ArrowRight className="h-4 w-4" />
        السابق
      </Button>
      <Button
        type="button"
        disabled={isLastStep}
        onClick={onNext}
        aria-label="موضع الصلاة التالي"
        className="gap-2"
      >
        التالي
        <ArrowLeft className="h-4 w-4" />
      </Button>
    </div>
  );
}
