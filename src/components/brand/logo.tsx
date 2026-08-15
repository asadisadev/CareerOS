import { cn } from "../../lib/utils";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M6 16.5 12 5l6 11.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-foreground"
          />
          <circle cx="12" cy="19" r="1.6" className="fill-current text-primary-foreground" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-display text-[1.05rem] font-extrabold tracking-tight">
          CareerOS <span className="text-gradient">AI</span>
        </span>
      )}
    </span>
  );
}
