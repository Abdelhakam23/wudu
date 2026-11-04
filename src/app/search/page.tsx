import { Search } from "lucide-react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlobalSearch } from "@/features/search/global-search";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "البحث في المنصة",
  description: "ابحث بالعربية في دروس الوضوء والصلاة والأحاديث الموثقة.",
  alternates: { canonical: "/search" },
};

export default function SearchPage() {
  return (
    <main>
      <section className="bg-brand-sage/35">
        <div className="container px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "البحث" }]} />
          <SectionHeading
            badge="بحث شامل"
            title="ابحث في دروس المنصة"
            description="ابحث بالعربية في دروس الوضوء والصلاة وخطواتهما والأحاديث النبوية الموثقة."
          />
        </div>
      </section>
      <div className="container px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <Search className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">نتائج البحث</h2>
        </div>
        <GlobalSearch />
      </div>
    </main>
  );
}
