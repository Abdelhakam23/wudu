"use client";

import { FormEvent, useRef } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HadithFiltersProps {
  q?: string;
  topic: string;
  collection?: string;
  grading?: string;
}

export function HadithFilters({
  q,
  topic,
  collection,
  grading,
}: HadithFiltersProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string" && value.trim()) params.set(key, value);
    });
    window.location.href = `/hadiths?${params.toString()}`;
  };

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      className="grid gap-3 rounded-lg border border-border/80 bg-card p-4 md:grid-cols-[2fr_1fr_1fr_auto]"
    >
      <label className="sr-only" htmlFor="hadith-q">
        البحث في الأحاديث
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute start-3 top-3 h-5 w-5 text-primary" />
        <Input
          id="hadith-q"
          name="q"
          defaultValue={q}
          placeholder="ابحث في نص الحديث أو الراوي أو الشرح"
          className="ps-10"
        />
      </div>
      <select
        name="topic"
        defaultValue={topic}
        aria-label="موضوع الحديث"
        className="h-11 rounded-md border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <option value="all">كل الموضوعات</option>
        <option value="wudu">الوضوء</option>
        <option value="salah">الصلاة</option>
        <option value="general_purification">الطهارة العامة</option>
      </select>
      <select
        name="grading"
        defaultValue={grading || ""}
        aria-label="درجة الحديث"
        className="h-11 rounded-md border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <option value="">كل الدرجات</option>
        <option value="صحيح">صحيح</option>
        <option value="صحيح متفق عليه">صحيح متفق عليه</option>
      </select>
      <select
        name="collection"
        defaultValue={collection || ""}
        aria-label="مصدر الحديث"
        className="h-11 rounded-md border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:col-span-2"
      >
        <option value="">كل المصادر</option>
        <option value="صحيح البخاري">صحيح البخاري</option>
        <option value="صحيح مسلم">صحيح مسلم</option>
        <option value="جامع الترمذي">جامع الترمذي</option>
      </select>
      <div className="flex gap-2">
        <Button type="submit" className="gap-2">
          <Search className="h-4 w-4" />
          بحث
        </Button>
        {(q || topic !== "all" || collection) && (
          <Button asChild type="button" variant="outline" aria-label="مسح الفلاتر">
            <a href="/hadiths">
              <X className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </form>
  );
}
