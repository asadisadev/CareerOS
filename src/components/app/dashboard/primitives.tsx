import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import * as Icons from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import { cn } from "../../../lib/utils";

export function DynIcon({ name, className }: { name: string; className?: string }) {
  const Comp = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Circle;
  return <Comp className={className} />;
}

export function AnimatedCounter({
  value,
  duration = 1100,
  suffix,
}: {
  value: number;
  duration?: number;
  suffix?: string | undefined;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown.toLocaleString()}
      {suffix && <span className="text-base font-semibold text-muted-foreground">{suffix}</span>}
    </span>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function DashCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <Card className={cn("rounded-3xl border-border/70 shadow-soft", className)}>
      <CardHeader className="flex-row flex-wrap items-start justify-between gap-3 pb-4">
        <div className="min-w-0 space-y-1">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {action}
      </CardHeader>
      <CardContent className={cn("space-y-4", contentClassName)}>{children}</CardContent>
    </Card>
  );
}

export function CardSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <Card className="rounded-3xl border-border/70">
      <CardContent className="space-y-3 p-6">
        <Skeleton className="h-4 w-1/3" />
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-xl" />
        ))}
      </CardContent>
    </Card>
  );
}

export function ProgressBar({
  value,
  tone = "primary",
  className,
}: {
  value: number;
  tone?: "primary" | "success" | "warning" | "destructive";
  className?: string;
}) {
  const toneClass =
    tone === "success"
      ? "bg-success"
      : tone === "warning"
        ? "bg-warning"
        : tone === "destructive"
          ? "bg-destructive"
          : "bg-gradient-brand";
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={cn("h-full rounded-full", toneClass)}
      />
    </div>
  );
}
