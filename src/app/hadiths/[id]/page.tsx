import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { HadithDetails } from "@/features/hadith/hadith-details";
import { hadithService } from "@/services/hadith.service";

export const dynamic = "force-dynamic";

export default async function HadithDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const hadith = await hadithService.getHadithById(params.id);
  if (!hadith || hadith.verificationStatus !== "verified") notFound();

  return (
    <main className="container space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "الأحاديث النبوية", href: "/hadiths" },
          { label: "تفاصيل الحديث" },
        ]}
      />
      <HadithDetails hadith={hadith} />
    </main>
  );
}
