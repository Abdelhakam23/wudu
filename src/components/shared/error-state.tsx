import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "حدث خطأ غير متوقع",
  message = "تعذر تحميل البيانات المطلوبة، يرجى المحاولة مرة أخرى.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center bg-rose-50/50 rounded-lg border border-semantic-error/20 my-4",
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center text-semantic-error mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h4 className="text-lg font-bold text-foreground mb-1.5">{title}</h4>
      <p className="text-sm text-foreground/70 max-w-sm mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="border-semantic-error/30 text-semantic-error hover:bg-rose-100/50"
        >
          <RefreshCw className="w-4 h-4 me-2" />
          <span>إعادة المحاولة</span>
        </Button>
      )}
    </div>
  );
}
