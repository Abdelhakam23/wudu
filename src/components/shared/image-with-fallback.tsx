"use client";

import * as React from "react";
import Image, { ImageProps } from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackText?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackText,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  if (error || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex flex-col items-center justify-center bg-secondary/50 border border-border/80 rounded-md p-6 text-muted-foreground select-none aspect-video w-full",
          className
        )}
      >
        <ImageIcon className="w-10 h-10 mb-2 opacity-50 text-primary" />
        <span className="text-xs text-center font-medium">
          {fallbackText || alt || "صورة توضيحية تعليمية"}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-md", className)}>
      {loading && (
        <div className="absolute inset-0 bg-muted/60 animate-pulse rounded-md" />
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300 object-cover",
          loading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        {...props}
      />
    </div>
  );
}
