import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex-1 min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <Spinner size="lg" />
      <p className="text-sm text-foreground/60 font-medium">جارٍ تحميل المحتوى...</p>
    </div>
  );
}
