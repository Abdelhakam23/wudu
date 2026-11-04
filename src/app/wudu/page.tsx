import { ArrowLeft, CheckCircle2, Info, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WuduLearningExperience } from "@/features/wudu/wudu-learning-experience";
import { hadithService } from "@/services/hadith.service";
import { lessonService } from "@/services/lesson.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "تعلم الوضوء خطوة بخطوة",
  description: "دليل عربي مصور لتعلم صفة الوضوء الصحيحة مع الأحاديث والمراجع.",
  alternates: { canonical: "/wudu" },
  openGraph: {
    title: "تعلم الوضوء خطوة بخطوة",
    description: "دليل عربي مصور لتعلم صفة الوضوء الصحيحة.",
    url: "/wudu",
  },
};

const conditions = [
  "النية محلها القلب، ويقصد المسلم رفع الحدث واستباحة الصلاة.",
  "استعمال ماء طهور مع إزالة ما يمنع وصوله إلى البشرة.",
  "غسل الأعضاء المفروضة بالترتيب الوارد في آية الوضوء.",
  "إتمام غسل الأعضاء والعناية ببلوغ الماء إلى المواضع الواجبة.",
];

const commonMistakes = [
  "ترك جزء من العضو دون ماء، وخاصة ما بين الأصابع وعقبي القدمين.",
  "الإسراف في استعمال الماء أو اعتقاد أن التثليث واجب في كل عضو.",
  "تقديم عضو على آخر أو ترك الترتيب في الخطوات المفروضة.",
  "التلفظ بالنية؛ فالنية عمل قلبي، والتسمية شيء آخر عند بداية الوضوء.",
];

export default async function WuduPage() {
  const [{ lesson, steps }, hadithResult] = await Promise.all([
    lessonService.getLessonWithSteps("wudu"),
    hadithService.getVerifiedHadiths({ topic: "wudu", limit: 3 }),
  ]);

  if (!lesson) {
    return (
      <main className="container flex min-h-[50vh] items-center justify-center px-4">
        <Card className="max-w-xl text-center">
          <CardContent className="p-8">
            <h1 className="mb-3 text-2xl font-bold">تعذر تحميل درس الوضوء</h1>
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
          <Breadcrumb items={[{ label: "تعلم الوضوء" }]} />
          <div className="grid items-center gap-8 py-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <Badge variant="success">مسار تعليمي موثوق</Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                {lesson.title}
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-foreground/75">
                {lesson.description}
              </p>
              <a
                href="#wudu-steps"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                ابدأ التعلم خطوة بخطوة
                <ArrowLeft className="h-4 w-4" />
              </a>
            </div>
            <div className="flex justify-center">
              <ImageWithFallback
                src={lesson.coverImage}
                alt="رسم توضيحي لمسار تعلم الوضوء"
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
                لماذا نتعلم الوضوء؟
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 leading-8 text-foreground/75">
              <p>{lesson.introduction}</p>
              <p>
                الوضوء عبادة وطهارة شرعها الله قبل الصلاة، وقد بيّنت آية الوضوء
                في سورة المائدة الأعضاء التي يُعتنى بها في الطهارة.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                ضوابط عامة قبل البدء
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-7 text-foreground/75">
                {conditions.map((condition) => (
                  <li key={condition} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-6 text-foreground/60">
                هذه خلاصة تعليمية، وقد تختلف بعض تفاصيل الفقه بين المذاهب؛ فاسأل
                أهل العلم عند الحاجة.
              </p>
            </CardContent>
          </Card>
        </section>

        <WuduLearningExperience steps={steps} />

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>أحاديث في فضل الوضوء وصفته</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {hadithResult.data.map((hadith) => (
                <article
                  key={hadith.id}
                  className="border-b border-border/70 pb-5 last:border-0 last:pb-0"
                >
                  <p className="font-traditional text-lg leading-9 text-foreground">
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
            title="وضوء صحيح يبدأ بالعلم وينتهي بالإتقان"
            description="راجع ترتيب الخطوات، وأعط كل عضو حقه من الماء دون إسراف، ثم اختم بالأذكار الواردة في الدرس."
            className="[&_h2]:text-primary-foreground [&_p]:text-primary-foreground/80 [&_span]:bg-primary-foreground/15 [&_span]:text-primary-foreground"
          />
        </section>
      </div>
    </main>
  );
}
