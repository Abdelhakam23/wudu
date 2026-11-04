import { Badge } from "@/components/ui/badge";
import type { StepClassification } from "@/types";

const classificationLabels: Record<StepClassification, string> = {
  obligatory: "فرض",
  sunnah: "سنة",
  recommended: "مستحب",
  educational: "إرشادي",
};

const classificationVariants: Record<
  StepClassification,
  "default" | "success" | "accent" | "secondary"
> = {
  obligatory: "default",
  sunnah: "success",
  recommended: "accent",
  educational: "secondary",
};

interface WuduStepClassificationProps {
  classification: StepClassification;
}

export function WuduStepClassification({
  classification,
}: WuduStepClassificationProps) {
  return (
    <Badge variant={classificationVariants[classification]}>
      {classificationLabels[classification]}
    </Badge>
  );
}
