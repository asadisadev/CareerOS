import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Check, GripVertical, Sparkles, X } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Skeleton } from "../../../components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../components/ui/tooltip";
import { cn } from "../../../lib/utils";
import { scoreTone } from "../../../data/resume";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Formats a `YYYY-MM` value using the resume's date style setting. */
export function formatResumeDate(value: string, style: "short" | "long" | "numeric"): string {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!year) return value;
  if (!month) return year;
  const index = Number(month) - 1;
  const name = MONTHS[index] ?? "";
  if (style === "numeric") return `${month}/${year}`;
  if (style === "long") return `${name} ${year}`;
  return `${name.slice(0, 3)} ${year}`;
}

export function dateRange(
  start: string,
  end: string,
  current: boolean,
  style: "short" | "long" | "numeric",
): string {
  const from = formatResumeDate(start, style);
  const to = current ? "Present" : formatResumeDate(end, style);
  if (!from && !to) return "";
  return [from, to].filter(Boolean).join(" — ");
}

export function ScorePill({ value, className }: { value: number; className?: string }) {
  const tone = scoreTone(value);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold",
        tone === "good" && "bg-success/12 text-success",
        tone === "warning" && "bg-warning/15 text-warning",
        tone === "critical" && "bg-destructive/12 text-destructive",
        className,
      )}
    >
      {value}
    </span>
  );
}

// In shared.tsx, update the Field component:
export function Field({
  label,
  children,
  hint,
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  htmlFor?: string;
}) {
  return (
    <div className="space-y-1.5 w-full">
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function IconButton({
  label,
  onClick,
  children,
  disabled,
  className,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label={label}
          onClick={onClick}
          disabled={disabled}
          className={cn("h-8 w-8 text-muted-foreground hover:text-foreground", className)}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

/**
 * AI suggestion surface. Deliberately visually distinct from user content and
 * never applied automatically — the user must accept it.
 */
export function AiSuggestion({
  loading,
  suggestion,
  onApply,
  onReject,
  label = "AI suggestion",
}: {
  loading: boolean;
  suggestion: string | null;
  onApply: () => void;
  onReject: () => void;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  if (!loading && !suggestion) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-primary/25 bg-primary/[0.05] p-3"
    >
      <div className="mb-2 flex items-center gap-2">
        <Badge variant="secondary" className="gap-1 rounded-full bg-primary/12 text-primary">
          <Sparkles className="h-3 w-3" /> {label}
        </Badge>
        <span className="text-[0.7rem] text-muted-foreground">Review before applying</span>
      </div>
      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>
      ) : (
        <>
          <p className="text-sm leading-relaxed">{suggestion}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button type="button" size="sm" variant="hero" onClick={onApply}>
              <Check /> Apply
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={onReject}>
              <X /> Reject
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                if (suggestion) void navigator.clipboard?.writeText(suggestion);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
}

/** Lightweight HTML5 drag-and-drop reorder wrapper. */
export function useDragReorder(onReorder: (from: number, to: number) => void) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  return {
    dragIndex,
    overIndex,
    handlers: (index: number) => ({
      draggable: true,
      onDragStart: () => setDragIndex(index),
      onDragEnter: () => setOverIndex(index),
      onDragOver: (event: React.DragEvent) => event.preventDefault(),
      onDragEnd: () => {
        if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
          onReorder(dragIndex, overIndex);
        }
        setDragIndex(null);
        setOverIndex(null);
      },
    }),
  };
}

export function DragHandle({ label }: { label: string }) {
  return (
    <span
      className="grid h-7 w-6 shrink-0 cursor-grab place-items-center rounded-md text-muted-foreground/70 hover:bg-muted"
      aria-label={label}
      role="button"
      tabIndex={-1}
    >
      <GripVertical className="h-4 w-4" />
    </span>
  );
}

export function EditorSectionShell({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h2 className="truncate font-display text-lg font-bold">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
      </header>
      {children}
    </motion.section>
  );
}

export function ItemCard({
  title,
  subtitle,
  children,
  actions,
  dragProps,
  active,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  actions?: ReactNode;
  dragProps?: Record<string, unknown>;
  active?: boolean;
}) {
  return (
    <div
      {...dragProps}
      className={cn(
        "rounded-2xl border border-border bg-card/70 p-4 transition-shadow",
        active && "border-primary/40 shadow-lg",
      )}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="flex min-w-0 items-start gap-2">
          {dragProps && <DragHandle label={`Reorder ${title}`} />}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{title || "Untitled"}</p>
            {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex shrink-0 items-center gap-0.5">{actions}</div>}
      </div>
      {children && <div className="mt-4 space-y-4">{children}</div>}
    </div>
  );
}
