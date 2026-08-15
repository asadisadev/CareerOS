import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Lock, Sparkles, Trophy } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { AnimatedCounter, DashCard, DynIcon, ProgressBar, Reveal } from "./primitives";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import {
  achievements,
  portfolioAnalytics,
  quickActions,
  resumeAnalytics,
  roadmap,
  skillGap,
} from "../../../data/dashboard";
import { cn } from "../../../lib/utils";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--popover)",
  color: "var(--popover-foreground)",
  fontSize: 12,
};

export function SkillGapAnalysis() {
  const groups = [
    { title: "Current skills", items: skillGap.current, tone: "success" as const },
    { title: "Missing skills", items: skillGap.missing, tone: "destructive" as const },
  ];

  return (
    <Reveal>
      <DashCard
        title="Skill gap analysis"
        description={`Estimated learning time · ${skillGap.learningTime}`}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.title} className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {g.title}
              </p>
              {g.items.map((s) => (
                <div key={s.skill} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{s.skill}</span>
                    <span className="text-muted-foreground">{s.value}%</span>
                  </div>
                  <ProgressBar value={s.value} tone={g.tone} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="space-y-2 rounded-2xl border border-border/70 bg-muted/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recommended next
          </p>
          <div className="flex flex-wrap gap-1.5">
            {skillGap.recommended.map((r) => (
              <span
                key={r}
                className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="hero" size="sm">
            <Link to="/app/roadmap">Start learning</Link>
          </Button>
          <Button asChild variant="soft" size="sm">
            <Link to="/app/coach">Ask AI</Link>
          </Button>
        </div>
      </DashCard>
    </Reveal>
  );
}

export function PortfolioAnalytics() {
  return (
    <Reveal>
      <DashCard title="Portfolio analytics" description="Last 6 months of visitor behaviour.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {portfolioAnalytics.stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border/70 p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-display text-xl font-extrabold">
                <AnimatedCounter value={s.value} />
              </p>
            </div>
          ))}
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioAnalytics.series} margin={{ left: -18, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="views"
                stroke="var(--color-chart-1)"
                strokeWidth={2.5}
                fill="url(#viewsFill)"
              />
              <Line type="monotone" dataKey="visitors" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </DashCard>
    </Reveal>
  );
}

export function ResumeAnalytics() {
  return (
    <Reveal delay={0.05}>
      <DashCard title="Resume analytics" description="ATS trend and download velocity.">
        <div className="grid grid-cols-3 gap-3">
          {resumeAnalytics.stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border/70 p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-display text-xl font-extrabold">
                <AnimatedCounter value={s.value} />
              </p>
            </div>
          ))}
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={resumeAnalytics.series} margin={{ left: -18, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="ats" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="downloads" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DashCard>
    </Reveal>
  );
}

export function QuickActions() {
  return (
    <Reveal>
      <DashCard title="Quick actions" description="Jump straight into your next move.">
        <div className="grid gap-3 sm:grid-cols-2">
          {quickActions.map((a) => (
            <motion.div key={a.label} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
              <Link
                to={a.to}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-soft transition-colors hover:border-primary/40 hover:bg-primary-soft/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <DynIcon name={a.icon} className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold">{a.label}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </Link>
            </motion.div>
          ))}
        </div>
      </DashCard>
    </Reveal>
  );
}

export function Achievements() {
  return (
    <Reveal delay={0.05}>
      <DashCard title="Achievements" description="Milestones you unlocked on CareerOS.">
        <div className="grid gap-3 sm:grid-cols-2">
          {achievements.map((a) => (
            <div
              key={a.label}
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-4",
                a.unlocked ? "border-primary/25 bg-primary-soft/40" : "border-border/70 bg-muted/20",
              )}
            >
              <span
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                  a.unlocked ? "bg-gradient-brand text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {a.unlocked ? <DynIcon name={a.icon} className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{a.label}</p>
                <p className="truncate text-xs text-muted-foreground">{a.detail}</p>
              </div>
              {a.unlocked && <Trophy className="ml-auto h-4 w-4 shrink-0 text-warning" />}
            </div>
          ))}
        </div>
      </DashCard>
    </Reveal>
  );
}

export function LearningRoadmap() {
  return (
    <Reveal>
      <DashCard
        title="Learning roadmap"
        description="Six tracks generated from your target role."
        action={
          <Badge variant="secondary" className="rounded-full">
            <Sparkles className="mr-1 h-3 w-3" /> AI generated
          </Badge>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {roadmap.map((t) => (
            <Card key={t.track} className="rounded-2xl border-border/70 shadow-soft">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
                    <DynIcon name={t.icon} className="h-4 w-4" />
                  </span>
                  <p className="font-semibold">{t.track}</p>
                  <span className="ml-auto text-sm font-semibold text-muted-foreground">
                    {t.progress}%
                  </span>
                </div>
                <ProgressBar value={t.progress} />
                <p className="text-xs text-muted-foreground">Next · {t.next}</p>
                <Button
                  variant="soft"
                  size="sm"
                  className="w-full"
                  onClick={() => toast.success("Track resumed", { description: t.next })}
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashCard>
    </Reveal>
  );
}

export function DashboardFooter() {
  const links = [
    { label: "Tips", to: "/how-it-works" as const },
    { label: "Privacy", to: "/" as const },
    { label: "Support", to: "/app/help" as const },
    { label: "Documentation", to: "/features" as const },
  ];
  return (
    <footer className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
      <p>© 2026 CareerOS AI — your AI career operating system.</p>
      <nav className="flex flex-wrap items-center gap-4">
        {links.map((l) => (
          <Link key={l.label} to={l.to} className="transition-colors hover:text-foreground">
            {l.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
