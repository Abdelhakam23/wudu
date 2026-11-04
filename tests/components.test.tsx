import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Button } from "../src/components/ui/button";
import { Badge } from "../src/components/ui/badge";
import { EmptyState } from "../src/components/shared/empty-state";
import { ErrorState } from "../src/components/shared/error-state";
import { SectionHeading } from "../src/components/shared/section-heading";
import { Breadcrumb } from "../src/components/shared/breadcrumb";

describe("Shared UI Components", () => {
  it("renders Button correctly with children", () => {
    render(<Button>اضغط هنا</Button>);
    expect(screen.getByRole("button", { name: "اضغط هنا" })).toBeInTheDocument();
  });

  it("renders Badge correctly", () => {
    render(<Badge variant="success">سنة مؤكدة</Badge>);
    expect(screen.getByText("سنة مؤكدة")).toBeInTheDocument();
  });

  it("renders SectionHeading with title and description", () => {
    render(
      <SectionHeading
        badge="تعليمي"
        title="شروط الوضوء"
        description="شرح مبسط للشروط الواجب توفرها"
      />
    );
    expect(screen.getByText("شروط الوضوء")).toBeInTheDocument();
    expect(screen.getByText("تعليمي")).toBeInTheDocument();
    expect(screen.getByText("شرح مبسط للشروط الواجب توفرها")).toBeInTheDocument();
  });

  it("renders EmptyState with action button", () => {
    render(
      <EmptyState
        title="لا توجد نتائج"
        description="جرب البحث بكلمة أخرى"
        actionText="إعادة تعيين"
        onAction={() => {}}
      />
    );
    expect(screen.getByText("لا توجد نتائج")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "إعادة تعيين" })).toBeInTheDocument();
  });

  it("renders ErrorState with retry button", () => {
    render(
      <ErrorState
        title="فشل الاتصال"
        message="يرجى التحقق من الشبكة"
        onRetry={() => {}}
      />
    );
    expect(screen.getByText("فشل الاتصال")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /إعادة المحاولة/i })).toBeInTheDocument();
  });

  it("renders Breadcrumb correctly", () => {
    render(
      <Breadcrumb
        items={[
          { label: "تعلم الوضوء", href: "/wudu" },
          { label: "غسل اليدين" },
        ]}
      />
    );
    expect(screen.getByText("تعلم الوضوء")).toBeInTheDocument();
    expect(screen.getByText("غسل اليدين")).toBeInTheDocument();
  });
});
