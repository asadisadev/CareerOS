import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "mx-auto max-w-2xl text-center items-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center rounded-full border border-border bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {description && (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
