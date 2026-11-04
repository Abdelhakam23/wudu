export function SalahProgress({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const percentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-semibold text-foreground/70">
        <span>تقدمك في مسار الصلاة</span>
        <span>
          {currentStep} من {totalSteps}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label="تقدم التعلم"
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
