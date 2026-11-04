import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toArabicDigits } from "@/lib/utils";

export function HadithPagination({
  page,
  totalPages,
  query,
}: {
  page: number;
  totalPages: number;
  query: string;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hrefFor = (nextPage: number) => {
    const params = new URLSearchParams(query);
    params.set("page", String(nextPage));
    return `/hadiths?${params.toString()}`;
  };

  return (
    <nav aria-label="صفحات مكتبة الأحاديث" className="flex flex-wrap justify-center gap-2 py-4">
      <Button asChild variant="outline" size="sm">
        <Link
          href={hrefFor(page - 1)}
          aria-disabled={page <= 1}
          className={page <= 1 ? "pointer-events-none opacity-50" : ""}
        >
          <ChevronRight className="h-4 w-4" />
          السابق
        </Link>
      </Button>
      {pages.map((item) => (
        <Button key={item} asChild variant={item === page ? "default" : "outline"} size="sm">
          <Link href={hrefFor(item)} aria-current={item === page ? "page" : undefined}>
            {toArabicDigits(item)}
          </Link>
        </Button>
      ))}
      <Button asChild variant="outline" size="sm">
        <Link
          href={hrefFor(page + 1)}
          aria-disabled={page >= totalPages}
          className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
        >
          التالي
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>
    </nav>
  );
}
