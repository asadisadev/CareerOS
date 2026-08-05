import { cn } from "@/lib/utils";

export function ScoreRing({
  value,
  label,
  size = 132,
  tone = "primary",
}: {
  value: number;
  label?: string;
  size?: number;
  tone?: "primary" | "success" | "warning";
}) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const toneClass =
    tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-primary";

  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("transition-all duration-700 ease-out", toneClass)}
          stroke="currentColor"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-2xl font-extrabold leading-none">{value}</span>
        {label && (
          <span className="mt-1 text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
