import * as React from "react";
import { FolderOpen, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon = FolderOpen,
  actionText,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center bg-card rounded-lg border border-dashed border-border/80 my-4",
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-primary-light/50 flex items-center justify-center text-primary mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-lg font-bold text-foreground mb-1.5">{title}</h4>
      {description && (
        <p className="text-sm text-foreground/70 max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {actionText && onAction && (
        <Button onClick={onAction} variant="outline" size="sm">
          {actionText}
        </Button>
      )}
    </div>
  );
}
