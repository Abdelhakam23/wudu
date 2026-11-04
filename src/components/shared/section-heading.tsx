import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-2 mb-8",
        centered ? "text-center mx-auto max-w-2xl" : "text-right",
        className
      )}
    >
      {badge && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary tracking-wide">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
