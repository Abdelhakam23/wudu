import * as React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, toArabicDigits } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="صفحات النتائج"
      className={cn("flex items-center justify-center gap-2 py-4", className)}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="gap-1"
        aria-label="الصفحة السابقة"
      >
        <ChevronRight className="w-4 h-4" />
        <span className="hidden sm:inline">السابق</span>
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <Button
              key={p}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(p)}
              className={cn("w-9 h-9 p-0 font-medium", isActive && "shadow-subtle")}
              aria-current={isActive ? "page" : undefined}
            >
              {toArabicDigits(p)}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="gap-1"
        aria-label="الصفحة التالية"
      >
        <span className="hidden sm:inline">التالي</span>
        <ChevronLeft className="w-4 h-4" />
      </Button>
    </nav>
  );
}
