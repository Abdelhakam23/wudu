import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { IHadith } from "@/types";

export function HadithCard({ hadith }: { hadith: IHadith }) {
  return (
    <Card id={`hadith-${hadith.id}`} className="flex h-full scroll-mt-24 flex-col border-border/80">
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success">موثق</Badge>
          <Badge variant="secondary">
            {hadith.topic === "wudu"
              ? "الوضوء"
              : hadith.topic === "salah"
                ? "الصلاة"
                : "الطهارة"}
          </Badge>
          {hadith.grading && <Badge variant="accent">{hadith.grading}</Badge>}
        </div>
        <CardTitle className="font-traditional text-2xl leading-[2]">
          {hadith.arabicText}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 text-sm leading-7 text-foreground/70">
        <p>
          <span className="font-semibold text-foreground">الراوي:</span>{" "}
          {hadith.narrator}
        </p>
        <p>
          <span className="font-semibold text-foreground">المصدر:</span>{" "}
          {hadith.collection}
        </p>
        {(hadith.book || hadith.chapter || hadith.hadithNumber) && (
          <p>
            {[hadith.book, hadith.chapter, hadith.hadithNumber]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
        {hadith.explanation && (
          <p className="border-t border-border/70 pt-3">{hadith.explanation}</p>
        )}
      </CardContent>
      <CardFooter className="flex-wrap gap-2">
        <Button asChild size="sm" className="gap-2">
          <Link href={`/hadiths/${hadith.id}`}>
            التفاصيل
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        {hadith.sourceUrl && (
          <Button asChild size="sm" variant="outline" className="gap-2">
            <a href={hadith.sourceUrl} target="_blank" rel="noreferrer">
              المصدر الأصلي
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
