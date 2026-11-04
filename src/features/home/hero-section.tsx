import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 border-b border-border/60 bg-gradient-to-b from-background via-brand-sage/20 to-background">
      {/* Decorative background circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 start-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl -z-10"
      />

      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Right Column: Hero Headline & CTAs (RTL start) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light text-primary text-xs sm:text-sm font-semibold border border-primary/20 shadow-subtle">
              <Sparkles className="w-4 h-4 text-accent fill-accent" />
              <span>منصة إسلامية تعليمية موثوقة للأجيال</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.25] sm:leading-[1.2]">
              تعلم صفة <span className="text-primary">الوضوء</span> و
              <span className="text-primary">الصلاة</span> الصحيحة خطوة بخطوة
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl">
              دليلك الشامل لتعلم الطهارة والصلاة على هدي النبي ﷺ، بشرح مبسط ورسوم توضيحية مرسومة بدقة وأحاديث نبوية صحيحة موثقة، لتؤدي عبادتك بيقين وخشوع.
            </p>

            {/* Quick Benefits Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-foreground/80 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0" />
                <span>رسوم تعليمية واضحة لكل خطوة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0" />
                <span>أحاديث مخرجة من الصحيحين</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0" />
                <span>تمييز دقيق بين الأركان والسنن</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0" />
                <span>أذكار مشكولة لتيسير الحفظ والتلاوة</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <Button asChild size="lg" className="gap-2 shadow-card font-semibold text-base sm:text-lg">
                <Link href="/wudu">
                  <span>ابدأ تعلم الوضوء</span>
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 font-semibold text-base sm:text-lg border-primary/30 hover:bg-primary/5 hover:border-primary"
              >
                <Link href="/salah">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>تعلم الصلاة</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Left Column: Visual Artwork Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[7/5] rounded-2xl overflow-hidden shadow-elevation border border-border/80 bg-card p-3">
              <ImageWithFallback
                src="/images/hero/hero-illustration.svg"
                alt="رسم توضيحي لمنصة تعليم الوضوء والصلاة على هدي النبي صلى الله عليه وسلم"
                width={700}
                height={500}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
