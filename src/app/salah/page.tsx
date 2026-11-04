import { ArrowLeft, CheckCircle2, Info, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalahLearningExperience } from "@/features/salah/salah-learning-experience";
import { hadithService } from "@/services/hadith.service";
import { lessonService } from "@/services/lesson.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "تعلم الصلاة خطوة بخطوة",
  description: "دليل عربي مصور لصفة صلاة النبي ﷺ مع الأذكار والمراجع.",
  alternates: { canonical: "/salah" },
  openGraph: {
    title: "تعلم الصلاة خطوة بخطوة",
    description: "دليل عربي مصور لصفة الصلاة الصحيحة.",
    url: "/salah",
  },
};

const conditions = [
  "دخول وقت الصلاة مع الطهارة من الحدث والنجس.",
  "ستر العورة واستقبال القبلة مع القدرة.",
  "النية بالقلب، وأداء الصلاة بطمأنينة وترتيب.",
  "القيام في الفرض للقادر، والمحافظة على أركان الصلاة وواجباتها.",
];

const preparation = [
  "توضأ واستحضر عظمة الوقوف بين يدي الله.",
  "تأكد من طهارة البدن والثوب والمكان.",
  "صلِّ إلى القبلة بعد دخول الوقت، واقطع ما يشغلك.",
];

const commonMistakes = [
  "العجلة وترك الطمأنينة في الركوع أو السجود أو الاعتدال.",
  "ترك قراءة الفاتحة في موضعها أو عدم تعلم الأذكار الأساسية.",
  "عدم إتمام السجود على الأعضاء السبعة.",
  "الانشغال بالنظر والحركة بما يضعف الخشوع.",
];

const prayerCounts = [
  ["الفجر", "ركعتان", "التشهد الأخير بعد الركعة الثانية"],
  ["الظهر", "أربع ركعات", "تشهد أول بعد الثانية وأخير بعد الرابعة"],
  ["العصر", "أربع ركعات", "تشهد أول بعد الثانية وأخير بعد الرابعة"],
  ["المغرب", "ثلاث ركعات", "تشهد أول بعد الثانية وأخير بعد الثالثة"],
  ["العشاء", "أربع ركعات", "تشهد أول بعد الثانية وأخير بعد الرابعة"],
];

export default async function SalahPage() {
  const [{ lesson, steps }, hadithResult] = await Promise.all([
    lessonService.getLessonWithSteps("salah"),
    hadithService.getVerifiedHadiths({ topic: "salah", limit: 3 }),
  ]);

  if (!lesson) {
    return (
      <main className="container flex min-h-[50vh] items-center justify-center px-4">
        <Card className="max-w-xl text-center">
          <CardContent className="p-8">
            <h1 className="mb-3 text-2xl font-bold">تعذر تحميل درس الصلاة</h1>
            <p className="text-foreground/70">
              لا تتوفر بيانات الدرس حالياً. يرجى المحاولة مرة أخرى لاحقاً.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main>
      <section className="bg-brand-sage/35">
        <div className="container px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "تعلم الصلاة" }]} />
          <div className="grid items-center gap-8 py-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <Badge variant="accent">مسار الصلاة خطوة بخطوة</Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                {lesson.title}
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-foreground/75">
                {lesson.description}
              </p>
              <a
                href="#salah-steps"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                ابدأ التعلم خطوة بخطوة
                <ArrowLeft className="h-4 w-4" />
              </a>
            </div>
            <div className="flex justify-center">
              <ImageWithFallback
                src={lesson.coverImage}
                alt="رسم توضيحي لمسار تعلم الصلاة"
                width={520}
                height={320}
                className="max-h-72 w-full max-w-md object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container space-y-16 px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                معنى الصلاة وأهميتها
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 leading-8 text-foreground/75">
              <p>{lesson.introduction}</p>
              <p>
                هذا الدرس يشرح المواضع الأساسية والأذكار الواردة في البيانات
                الموثقة للمشروع، مع التنبيه إلى أن بعض التفاصيل الفقهية فيها
                خلاف معتبر.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                شروط واستعداد الصلاة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-7 text-foreground/75">
                {[...conditions, ...preparation].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <SalahLearningExperience steps={steps} />

        <section>
          <SectionHeading
            centered
            badge="الصلوات الخمس"
            title="عدد الركعات وموضع التشهد"
            description="توضح هذه الخلاصة كيف يختلف عدد الركعات والتشهد بين الصلوات المفروضة."
          />
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[560px] text-right text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="p-4">الصلاة</th>
                  <th className="p-4">عدد الركعات</th>
                  <th className="p-4">التشهد</th>
                </tr>
              </thead>
              <tbody>
                {prayerCounts.map(([name, count, tashahhud]) => (
                  <tr key={name} className="border-t border-border/70">
                    <td className="p-4 font-semibold">{name}</td>
                    <td className="p-4">{count}</td>
                    <td className="p-4 text-foreground/70">{tashahhud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>أحاديث في صفة الصلاة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {hadithResult.data.map((hadith) => (
                <article
                  key={hadith.id}
                  className="border-b border-border/70 pb-5 last:border-0 last:pb-0"
                >
                  <p className="font-traditional text-lg leading-9">
                    {hadith.arabicText}
                  </p>
                  <p className="mt-2 text-sm text-foreground/65">
                    {hadith.narrator} · {hadith.collection} · {hadith.grading}
                  </p>
                </article>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>أخطاء شائعة ننتبه لها</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 leading-8 text-foreground/75">
                {commonMistakes.map((mistake) => (
                  <li key={mistake} className="flex items-start gap-2">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-xl bg-primary p-7 text-primary-foreground md:p-10">
          <SectionHeading
            badge="خلاصة المسار"
            title="صلِّ كما رأيت النبي ﷺ يصلي"
            description="تعلم الترتيب، واحفظ الأذكار الأساسية، وأدِّ كل ركن بطمأنينة وخشوع."
            className="[&_h2]:text-primary-foreground [&_p]:text-primary-foreground/80 [&_span]:bg-primary-foreground/15 [&_span]:text-primary-foreground"
          />
        </section>
      </div>
    </main>
  );
}
