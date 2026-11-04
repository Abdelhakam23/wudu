import Link from "next/link";
import { BookOpen, Sparkles, ArrowLeft } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl bg-white p-8 rounded-xl shadow-card border border-border">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>منصة تعليم الوضوء والصلاة</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          تعلم الطهارة والصلاة خطوة بخطوة
        </h1>
        
        <p className="text-foreground/80 mb-8 text-base sm:text-lg leading-relaxed">
          منصة إسلامية موثوقة تقدم شرحاً مبسطاً لصفة الوضوء والصلاة الصحيحة مع الرسوم التوضيحية والأحاديث النبوية المعتمدة.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/wudu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover transition-colors font-medium text-base shadow-subtle"
          >
            <span>ابدأ تعلم الوضوء</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link
            href="/salah"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium text-base border border-border"
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <span>تعلم الصلاة</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
