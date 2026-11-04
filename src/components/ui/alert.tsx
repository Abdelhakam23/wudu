import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-md border p-4 [&>svg~*]:pe-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:end-4 [&>svg]:top-4 [&>svg]:text-foreground text-right",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground border-border",
        destructive:
          "border-semantic-error/30 text-semantic-error dark:border-semantic-error [&>svg]:text-semantic-error bg-rose-50/50",
        warning:
          "border-semantic-warning/30 text-semantic-warning bg-amber-50/50 [&>svg]:text-semantic-warning",
        success:
          "border-semantic-success/30 text-semantic-success bg-emerald-50/50 [&>svg]:text-semantic-success",
        info:
          "border-semantic-info/30 text-semantic-info bg-blue-50/50 [&>svg]:text-semantic-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-foreground/80 leading-relaxed [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
