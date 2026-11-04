import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IHadith } from "@/types";

export function HadithDetails({ hadith }: { hadith: IHadith }) {
  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">حالة التوثيق: موثق</Badge>
          {hadith.grading && <Badge variant="accent">{hadith.grading}</Badge>}
        </div>
        <CardTitle className="font-traditional text-3xl leading-[2] md:text-4xl">
          نص الحديث
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-7">
        <blockquote className="rounded-lg bg-primary-light/60 p-5 font-traditional text-2xl leading-[2.2]">
          {hadith.arabicText}
        </blockquote>
        <dl className="grid gap-4 text-sm leading-7 sm:grid-cols-2">
          <div>
            <dt className="font-bold text-primary">الراوي</dt>
            <dd>{hadith.narrator}</dd>
          </div>
          <div>
            <dt className="font-bold text-primary">المصدر والمجموعة</dt>
            <dd>{hadith.collection}</dd>
          </div>
          {hadith.book && (
            <div>
              <dt className="font-bold text-primary">الكتاب</dt>
              <dd>{hadith.book}</dd>
            </div>
          )}
          {hadith.chapter && (
            <div>
              <dt className="font-bold text-primary">الباب</dt>
              <dd>{hadith.chapter}</dd>
            </div>
          )}
          {hadith.hadithNumber && (
            <div>
              <dt className="font-bold text-primary">رقم الحديث</dt>
              <dd>{hadith.hadithNumber}</dd>
            </div>
          )}
        </dl>
        {hadith.explanation && (
          <div className="border-t border-border/70 pt-5 leading-8">
            <h2 className="mb-2 font-bold">شرح مختصر موثق</h2>
            <p className="text-foreground/75">{hadith.explanation}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-3 border-t border-border/70 pt-5">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/hadiths">
              <ArrowRight className="h-4 w-4" />
              العودة إلى مكتبة الأحاديث
            </Link>
          </Button>
          {hadith.sourceUrl && (
            <Button asChild className="gap-2">
              <a href={hadith.sourceUrl} target="_blank" rel="noreferrer">
                فتح المصدر الأصلي
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
