import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WuduStepNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function WuduStepNavigation({
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
}: WuduStepNavigationProps) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-border/70 pt-5 sm:flex-row sm:justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep}
        className="gap-2"
        aria-label="الخطوة السابقة"
      >
        <ArrowRight className="h-4 w-4" />
        السابقة
      </Button>
      <Button
        type="button"
        onClick={onNext}
        disabled={isLastStep}
        className="gap-2"
        aria-label="الخطوة التالية"
      >
        التالية
        <ArrowLeft className="h-4 w-4" />
      </Button>
    </div>
  );
}
