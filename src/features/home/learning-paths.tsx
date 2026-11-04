import Link from "next/link";
import { ArrowLeft, Droplets, HeartHandshake, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";

export function LearningPaths() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          centered
          badge="مسارات التعلم الرئيسية"
          title="اختر مسار التعلم للبدء"
          description="مساران تعليميان متكاملان يقدمان الشرح العملي المصور وفق سنة المصطفى ﷺ مع الأدلة والتوضيحات."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {/* Card 1: Wudu */}
          <Card className="flex flex-col overflow-hidden hover:shadow-elevation transition-all duration-300 border-border/80 group">
            <div className="aspect-[16/10] bg-brand-sage/40 relative overflow-hidden p-4 flex items-center justify-center">
              <ImageWithFallback
                src="/images/wudu/step-02.svg"
                alt="مسار تعلم الوضوء خطوة بخطوة"
                width={500}
                height={320}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 start-4">
                <Badge variant="success" className="gap-1 shadow-sm px-3 py-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>١٠ خطوات تعليمية</span>
                </Badge>
              </div>
            </div>

            <CardHeader className="text-right">
              <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">
                صفة الوضوء الكاملة
              </CardTitle>
              <CardDescription className="text-base text-foreground/70">
                تعلم كيفية الوضوء الصحيح كما توضأ النبي ﷺ، مع بيان الشروط والواجبات وتجنب الأخطاء الشائعة.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2.5 text-right text-sm text-foreground/80 flex-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>شروط صحة الوضوء ونواقضه</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>التمييز بين الفروض والسنن المؤكدة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>حديث عثمان بن عفان رضي الله عنه في الصحيحين</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>الأذكار والأدعية الواردة بعد الوضوء</span>
              </div>
            </CardContent>

            <CardFooter className="pt-4 border-t border-border/60">
              <Button asChild className="w-full gap-2 font-semibold text-base py-5">
                <Link href="/wudu">
                  <span>ابدأ مسار الوضوء الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2: Salah */}
          <Card className="flex flex-col overflow-hidden hover:shadow-elevation transition-all duration-300 border-border/80 group">
            <div className="aspect-[16/10] bg-brand-sage/40 relative overflow-hidden p-4 flex items-center justify-center">
              <ImageWithFallback
                src="/images/salah/step-03.svg"
                alt="مسار تعلم الصلاة خطوة بخطوة"
                width={500}
                height={320}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 start-4">
                <Badge variant="accent" className="gap-1 shadow-sm px-3 py-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-primary" />
                  <span>١١ موضعاً تفصيلياً</span>
                </Badge>
              </div>
            </div>

            <CardHeader className="text-right">
              <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">
                صفة صلاة النبي ﷺ
              </CardTitle>
              <CardDescription className="text-base text-foreground/70">
                تعلم أركان الصلاة وواجباتها وهيئاتها بالترتيب من تكبيرة الإحرام حتى التسليمتين، مع الأذكار المشكولة.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2.5 text-right text-sm text-foreground/80 flex-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>شروط صحة الصلاة والاستعداد لها</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>هيئة كل موضع (الركوع، السجود، الجلوس، التورّك)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>الأدعية والتشهد والصلاة الإبراهيمية مشكولة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>تفصيل ركعات الصلوات الخمس المفروضة</span>
              </div>
            </CardContent>

            <CardFooter className="pt-4 border-t border-border/60">
              <Button asChild className="w-full gap-2 font-semibold text-base py-5">
                <Link href="/salah">
                  <span>ابدأ مسار الصلاة الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
