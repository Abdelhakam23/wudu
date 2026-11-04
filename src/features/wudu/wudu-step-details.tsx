import { CheckCircle2 } from "lucide-react";
import type { ILessonStep } from "@/types";

interface WuduStepDetailsProps {
  step: Pick<ILessonStep, "description" | "detailedExplanation" | "notes">;
}

export function WuduStepDetails({ step }: WuduStepDetailsProps) {
  return (
    <div className="space-y-5">
      <p className="text-lg font-semibold leading-relaxed text-foreground">
        {step.description}
      </p>
      <p className="leading-8 text-foreground/75">{step.detailedExplanation}</p>
      {step.notes.length > 0 && (
        <div className="rounded-lg border border-brand-gold/30 bg-brand-lightGold/30 p-4">
          <h4 className="mb-3 font-bold text-foreground">تنبيهات مهمة</h4>
          <ul className="space-y-2 text-sm leading-7 text-foreground/75">
            {step.notes.map((note) => (
              <li key={note} className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
