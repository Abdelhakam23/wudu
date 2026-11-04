"use client";

import * as React from "react";
import { ErrorState } from "@/components/shared/error-state";
import { PageContainer } from "@/components/layout/page-container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log error securely
    console.error("App boundary error caught:", error);
  }, [error]);

  return (
    <PageContainer className="flex items-center justify-center min-h-[50vh]">
      <ErrorState
        title="عذراً، حدث خطأ أثناء معالجة الطلب"
        message="نعتذر عن هذا الخطأ الفني، يمكنك محاولة إعادة تحميل الصفحة أو العودة للصفحة الرئيسية."
        onRetry={reset}
        className="max-w-md w-full shadow-card"
      />
    </PageContainer>
  );
}
