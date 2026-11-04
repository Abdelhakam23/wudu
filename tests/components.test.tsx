import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Button } from "../src/components/ui/button";
import { Badge } from "../src/components/ui/badge";
import { EmptyState } from "../src/components/shared/empty-state";
import { ErrorState } from "../src/components/shared/error-state";
import { SectionHeading } from "../src/components/shared/section-heading";
import { Breadcrumb } from "../src/components/shared/breadcrumb";
import { WuduProgress } from "../src/features/wudu/wudu-progress";
import { WuduStepNavigation } from "../src/features/wudu/wudu-step-navigation";
import { SalahProgress } from "../src/features/salah/salah-progress";
import { SalahStepNavigation } from "../src/features/salah/salah-step-navigation";

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

  it("renders Wudu progress with the current step", () => {
    render(<WuduProgress currentStep={3} totalSteps={10} />);
    expect(screen.getByText("3 من 10")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "3");
  });

  it("disables navigation at the first and last steps", () => {
    const { rerender } = render(
      <WuduStepNavigation
        isFirstStep
        isLastStep={false}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: "الخطوة السابقة" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "الخطوة التالية" })).toBeEnabled();

    rerender(
      <WuduStepNavigation
        isFirstStep={false}
        isLastStep
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: "الخطوة السابقة" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "الخطوة التالية" })).toBeDisabled();
  });

  it("renders Salah progress and guards prayer navigation boundaries", () => {
    const { rerender } = render(
      <SalahProgress currentStep={2} totalSteps={11} />
    );
    expect(screen.getByText("2 من 11")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "2");

    rerender(
      <SalahStepNavigation
        isFirstStep
        isLastStep={false}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: "موضع الصلاة السابق" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "موضع الصلاة التالي" })).toBeEnabled();
  });
});
