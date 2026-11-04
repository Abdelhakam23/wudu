import Link from "next/link";
import { ArrowLeft, BookOpen, Quote, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { hadithService } from "@/services/hadith.service";

export async function FeaturedHadith() {
  const hadith = await hadithService.getFeaturedHadith();

  if (!hadith) return null;

  return (
    <section className="py-16 md:py-20 bg-brand-sage/20 border-y border-border/60">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="bg-card rounded-2xl border border-border shadow-elevation p-6 sm:p-10 md:p-12 relative overflow-hidden text-right">
          {/* Subtle gold quote mark in background */}
          <div
            aria-hidden="true"
            className="absolute top-4 start-6 text-brand-lightGold/20 select-none pointer-events-none"
          >
            <Quote className="w-24 h-24 sm:w-32 sm:h-32 rotate-180" />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div className="inline-flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-foreground">
                  حديث نبوي شريف موثق
                </span>
              </div>
              <Badge variant="success" className="gap-1 px-3 py-1 text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{hadith.grading || "صحيح متفق عليه"}</span>
              </Badge>
            </div>

            {/* Sacred Arabic Hadith Text in Noto Naskh Arabic */}
            <blockquote className="font-traditional text-lg sm:text-xl md:text-2xl text-foreground font-semibold leading-[2.2] sm:leading-[2.4]">
              {hadith.arabicText}
            </blockquote>

            {/* Short verified explanation */}
            {hadith.explanation && (
              <div className="bg-secondary/60 rounded-lg p-4 text-sm sm:text-base text-foreground/80 leading-relaxed border-r-4 border-primary">
                <p>
                  <strong className="text-primary font-bold">شرح الحديث: </strong>
                  {hadith.explanation}
                </p>
              </div>
            )}

            {/* Narrator and Source attribution */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/60 text-xs sm:text-sm text-foreground/70">
              <div className="space-y-1">
                <div>
                  <span className="font-semibold text-foreground">الراوي: </span>
                  <span>{hadith.narrator}</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">المصدر: </span>
                  <span>{hadith.collection}</span>
                  {hadith.hadithNumber && (
                    <span className="text-muted-foreground ms-1">
                      (رقم {hadith.hadithNumber})
                    </span>
                  )}
                </div>
              </div>

              <div>
                <Button asChild variant="outline" size="sm" className="gap-1.5 border-primary/30 hover:border-primary">
                  <Link href="/hadiths">
                    <span>تصفح جميع الأحاديث</span>
                    <ArrowLeft className="w-4 h-4 text-primary" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
