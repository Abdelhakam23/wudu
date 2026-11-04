"use client";

import { Button } from "@/components/ui/button";
import { toArabicDigits } from "@/lib/utils";

export function SearchPagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="صفحات البحث" className="flex items-center justify-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        السابق
      </Button>
      <span className="px-2 text-sm text-foreground/70">
        {toArabicDigits(page)} من {toArabicDigits(totalPages)}
      </span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        التالي
      </Button>
    </nav>
  );
}
