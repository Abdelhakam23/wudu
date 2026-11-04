"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchPagination } from "@/features/search/search-pagination";
import { SearchResultCard } from "@/features/search/search-result-card";
import type { ApiResponse } from "@/types";
import type { SearchResultItem } from "@/repositories/search.repository";

const suggestions = ["الوضوء", "الصلاة", "الركوع", "الفاتحة", "الطهارة"];

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const trimmed = submittedQuery.trim();
    if (!trimmed) {
      setResults([]);
      setTotal(0);
      setTotalPages(0);
      return;
    }

    const controller = new AbortController();
    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      q: trimmed,
      category,
      page: String(page),
      limit: "9",
    });

    fetch(`/api/search?${params.toString()}`, { signal: controller.signal })
      .then(async (response) => {
        const body = (await response.json()) as ApiResponse<SearchResultItem[]>;
        if (!response.ok || !body.success || !body.data) {
          throw new Error(body.error?.message || "تعذر تنفيذ البحث");
        }
        return body;
      })
      .then((body) => {
        if (currentRequest !== requestId.current) return;
        setResults(body.data || []);
        setTotal(body.meta?.total || 0);
        setTotalPages(body.meta?.totalPages || 0);
      })
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        if (currentRequest === requestId.current) {
          setError("تعذر تحميل نتائج البحث. حاول مرة أخرى.");
        }
      })
      .finally(() => {
        if (currentRequest === requestId.current) setLoading(false);
      });

    return () => controller.abort();
  }, [submittedQuery, category, page]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      if (submittedQuery) setSubmittedQuery("");
      return;
    }
    if (trimmed === submittedQuery) return;
    const timeout = window.setTimeout(() => {
      setPage(1);
      setSubmittedQuery(trimmed);
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [query, submittedQuery]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSubmittedQuery(query.trim());
  };

  const chooseSuggestion = (value: string) => {
    setQuery(value);
    setPage(1);
    setSubmittedQuery(value);
  };

  const clear = () => {
    setQuery("");
    setSubmittedQuery("");
    setPage(1);
    setError(null);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="space-y-3">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-3 h-5 w-5 text-primary" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث في الوضوء والصلاة والأحاديث..."
              aria-label="كلمة البحث"
              maxLength={100}
              className="ps-10"
            />
          </div>
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
            aria-label="فئة البحث"
            className="h-11 rounded-md border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="all">كل المحتوى</option>
            <option value="wudu">الوضوء</option>
            <option value="salah">الصلاة</option>
            <option value="hadith">الأحاديث</option>
          </select>
          <Button type="submit" className="gap-2">
            <Search className="h-4 w-4" />
            بحث
          </Button>
          {(query || submittedQuery) && (
            <Button type="button" variant="outline" onClick={clear} aria-label="مسح البحث">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/65">
          <span>اقتراحات:</span>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => chooseSuggestion(suggestion)}
              className="rounded-full border border-border px-3 py-1 hover:border-primary hover:text-primary"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </form>

      {loading && (
        <div
          className="rounded-lg border border-border bg-card p-8 text-center"
          role="status"
          aria-live="polite"
        >
          جارٍ البحث في المحتوى...
        </div>
      )}
      {error && <ErrorState message={error} onRetry={() => setSubmittedQuery(submittedQuery)} />}
      {!loading && !error && submittedQuery && results.length === 0 && (
        <EmptyState
          title="لا توجد نتائج"
          description="جرّب كلمة أخرى أو استخدم أحد الاقتراحات."
        />
      )}
      {!loading && !error && results.length > 0 && (
        <>
          <div
            className="flex items-center justify-between text-sm text-foreground/65"
            aria-live="polite"
          >
            <span>عدد النتائج: {total}</span>
            <span>نتائج موثقة من محتوى المنصة</span>
          </div>
          <section className="grid gap-6 lg:grid-cols-3" aria-label="نتائج البحث">
            {results.map((result) => (
              <SearchResultCard
                key={`${result.type}-${result.id}`}
                result={result}
                query={submittedQuery}
              />
            ))}
          </section>
          <SearchPagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
}
