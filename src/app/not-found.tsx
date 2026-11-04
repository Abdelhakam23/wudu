import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";

export default function NotFound() {
  return (
    <PageContainer className="flex-1 flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary mb-6">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
        الصفحة غير موجودة (404)
      </h1>
      <p className="text-foreground/70 max-w-md mb-8 text-base leading-relaxed">
        عذراً، الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله. يمكنك تصفح أقسام المنصة أو العودة للصفحة الرئيسية.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="default">
          <Link href="/" className="gap-2">
            <span>العودة للرئيسية</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/wudu">تعلم الوضوء</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/salah">تعلم الصلاة</Link>
        </Button>
      </div>
    </PageContainer>
  );
}
