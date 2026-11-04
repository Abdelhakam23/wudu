import { BookOpen } from "lucide-react";
import type { IReference } from "@/types";

interface WuduStepReferencesProps {
  references: IReference[];
}

export function WuduStepReferences({
  references,
}: WuduStepReferencesProps) {
  if (references.length === 0) return null;

  return (
    <div className="border-t border-border/70 pt-4">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
        <BookOpen className="h-4 w-4 text-primary" />
        المراجع
      </h4>
      <ul className="space-y-2 text-sm text-foreground/70">
        {references.map((reference) => (
          <li key={`${reference.title}-${reference.source}`}>
            <span className="font-semibold text-foreground">
              {reference.title}:
            </span>{" "}
            {reference.source}
          </li>
        ))}
      </ul>
    </div>
  );
}
