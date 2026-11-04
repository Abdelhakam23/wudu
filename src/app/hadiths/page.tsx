import { BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { HadithCard } from "@/features/hadith/hadith-card";
import { HadithFilters } from "@/features/hadith/hadith-filters";
import { HadithPagination } from "@/features/hadith/hadith-pagination";
import { hadithService } from "@/services/hadith.service";
import type { HadithTopic } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مكتبة الأحاديث النبوية",
  description: "مكتبة عربية للأحاديث الموثقة المتعلقة بالوضوء والصلاة والطهارة.",
  alternates: { canonical: "/hadiths" },
  openGraph: {
    title: "مكتبة الأحاديث النبوية",
    description: "أحاديث موثقة مع الراوي والمصدر ودرجة الحديث.",
    url: "/hadiths",
  },
};

interface HadithPageProps {
  searchParams: {
    q?: string;
    topic?: string;
    collection?: string;
    grading?: string;
    page?: string;
  };
}

export default async function HadithsPage({ searchParams }: HadithPageProps) {
  const topic =
    searchParams.topic === "wudu" ||
    searchParams.topic === "salah" ||
    searchParams.topic === "general_purification"
      ? searchParams.topic
      : "all";
  const page = Math.max(1, Number(searchParams.page) || 1);
  const result = await hadithService.getVerifiedHadiths({
    q: searchParams.q,
    topic: topic as HadithTopic | "all",
    collection: searchParams.collection,
    grading: searchParams.grading,
    page,
    limit: 6,
  });
  const query = new URLSearchParams();
  if (searchParams.q) query.set("q", searchParams.q);
  if (topic !== "all") query.set("topic", topic);
  if (searchParams.collection) query.set("collection", searchParams.collection);
  if (searchParams.grading) query.set("grading", searchParams.grading);

  return (
    <main>
      <section className="bg-brand-sage/35">
        <div className="container px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "الأحاديث النبوية" }]} />
          <SectionHeading
            badge="مكتبة موثقة"
            title="الأحاديث النبوية في الطهارة والصلاة"
            description="اقرأ النص العربي، وتعرّف على الراوي والمصدر ودرجة الحديث، مع الحفاظ على المراجع الأصلية."
          />
        </div>
      </section>

      <div className="container space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <HadithFilters
          q={searchParams.q}
          topic={topic}
          collection={searchParams.collection}
          grading={searchParams.grading}
        />
        <div className="flex items-center justify-between text-sm text-foreground/65">
          <span>عدد النتائج: {result.total}</span>
          <span>
            الصفحة {result.page} من {Math.max(result.totalPages, 1)}
          </span>
        </div>
        {result.data.length === 0 ? (
          <EmptyState
            title="لا توجد أحاديث مطابقة"
            description="جرّب تغيير كلمة البحث أو اختيار موضوع آخر."
          />
        ) : (
          <section className="grid gap-6 lg:grid-cols-2" aria-label="نتائج الأحاديث">
            {result.data.map((hadith) => (
              <HadithCard key={hadith.id} hadith={hadith} />
            ))}
          </section>
        )}
        <HadithPagination
          page={result.page}
          totalPages={result.totalPages}
          query={query.toString()}
        />
        <Card className="border-primary/20 bg-primary-light/35">
          <CardContent className="flex items-start gap-3 p-5 text-sm leading-7 text-foreground/75">
            <BookOpen className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <p>
              تُعرض هنا السجلات التي تحمل حالة توثيق موثقة فقط. أما أي بيانات
              مستقبلية من مصدر خارجي فلن تُنشر قبل المراجعة والاعتماد.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
