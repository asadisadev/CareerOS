import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  hint,
  className,
}: {
  label: string;
  value: string;
  delta?: number;
  icon: LucideIcon;
  hint?: string;
  className?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <Card className={cn("relative overflow-hidden rounded-2xl shadow-soft", className)}>
      <span className="pointer-events-none absolute inset-x-0 top-0 h-24 surface-glow" />
      <CardContent className="relative flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            <Icon className="h-4.5 w-4.5" />
          </span>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <span className="font-display text-3xl font-extrabold leading-none">{value}</span>
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                positive ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive",
              )}
            >
              {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(delta)}%
            </span>
          )}
        </div>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}
