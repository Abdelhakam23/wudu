interface WuduProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function WuduProgress({
  currentStep,
  totalSteps,
}: WuduProgressProps) {
  const percentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div aria-label="تقدم التعلم" className="space-y-2">
      <div className="flex items-center justify-between text-sm font-semibold text-foreground/70">
        <span>تقدمك في المسار</span>
        <span>
          {currentStep} من {totalSteps}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep}
        className="h-2 overflow-hidden rounded-full bg-brand-sage"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
