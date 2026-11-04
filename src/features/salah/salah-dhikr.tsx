export function SalahDhikr({ text }: { text: string }) {
  return (
    <p className="rounded-md border border-border/70 bg-card p-3 text-sm leading-7 text-foreground/70">
      <span className="font-bold text-primary">تنبيه الذكر: </span>
      {text}
    </p>
  );
}
