import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function AuthFade({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn("space-y-7", className)}
    >
      {children}
    </motion.div>
  );
}

export function AuthHeading({ title, subtitle }: { title: ReactNode; subtitle?: ReactNode }) {
  return (
    <div className="space-y-2">
      <h1 className="font-display text-2xl font-extrabold">{title}</h1>
      {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}

export function AuthError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      role="alert"
      className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      {message}
    </motion.p>
  );
}
