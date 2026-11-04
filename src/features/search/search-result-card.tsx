import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { SearchResultItem } from "@/repositories/search.repository";

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        part.toLocaleLowerCase("ar") === query.trim().toLocaleLowerCase("ar") ? (
          <mark key={`${part}-${index}`} className="rounded bg-accent-light px-1">
            {part}
          </mark>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        )
      )}
    </>
  );
}

export function SearchResultCard({
  result,
  query,
}: {
  result: SearchResultItem;
  query: string;
}) {
  return (
    <Card className="flex h-full flex-col border-border/80">
      <CardHeader className="gap-2">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">{result.categoryName}</Badge>
          {result.badge && <Badge variant="success">{result.badge}</Badge>}
        </div>
        <CardTitle className="text-xl leading-relaxed">
          <HighlightedText text={result.title} query={query} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="leading-8 text-foreground/70">
          <HighlightedText text={result.snippet} query={query} />
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href={result.url}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          فتح المحتوى
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
