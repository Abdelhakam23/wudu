import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends Omit<ButtonProps, "size"> {
  "aria-label": string;
  size?: "sm" | "default" | "lg";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8 p-1.5",
      default: "h-10 w-10 p-2",
      lg: "h-12 w-12 p-3",
    };

    return (
      <Button
        ref={ref}
        size="icon"
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";
