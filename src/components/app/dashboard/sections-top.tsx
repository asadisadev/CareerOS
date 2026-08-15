import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Clock,
  MapPin,
  Send,
  Sparkles,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { AnimatedCounter, DashCard, DynIcon, ProgressBar, Reveal } from "./primitives";
import { ScoreRing } from "../../../components/common/score-ring";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import {
  coachPromptChips,
  dailyInsight,
  matchJobs,
  overviewMetrics,
  profile,
  timeline,
} from "../../../data/dashboard";
import { cn } from "../../../lib/utils";

function greeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Working late";
}

export function WelcomeSection() {
  const hello = greeting(new Date().getHours());

  return (
    <Reveal>
      <Card className="relative overflow-hidden rounded-3xl border-border/70 shadow-soft">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-40 surface-glow" />
        <CardContent className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
          <div className="min-w-0 space-y-3">
            <Badge variant="secondary" className="rounded-full">
              <Sparkles className="mr-1 h-3 w-3" /> AI Career Workspace
            </Badge>
            <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              {hello}, {profile.firstName}
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Ready to build your career today? You have 6 new matches above 90% fit and 3 quick
              wins that raise your ATS score.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button asChild variant="hero" size="sm">
                <Link to="/app/resume">Continue resume</Link>
              </Button>
              <Button asChild variant="soft" size="sm">
                <Link to="/app/jobs">Review matches</Link>
              </Button>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-border/70 bg-card/60 p-4">
            <ScoreRing value={profile.completion} label="Profile" />
            <div className="space-y-1 text-sm">
              <p className="font-semibold">Profile completion</p>
              <p className="text-muted-foreground">3 steps left</p>
              <Link
                to="/app/settings"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
              >
                Complete profile <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}

export function DailyInsight() {
  return (
    <Reveal delay={0.05}>
      <Card className="relative overflow-hidden rounded-3xl border-primary/25 bg-primary-soft/40 shadow-glow">
        <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <CardContent className="relative grid gap-6 p-6 lg:grid-cols-[1.6fr_1fr] lg:p-8">
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Today&apos;s career insight
            </p>
            <h2 className="font-display text-xl font-extrabold sm:text-2xl">{dailyInsight.title}</h2>
            <p className="max-w-2xl text-sm text-muted-foreground">{dailyInsight.body}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button asChild variant="hero" size="sm">
                <Link to="/app/resume">Improve resume</Link>
              </Button>
              <Button asChild variant="glass" size="sm">
                <Link to="/app/coach">Ask AI</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { label: "Projected impact", value: dailyInsight.impact },
              { label: "Estimated time", value: dailyInsight.time },
              { label: "AI confidence", value: `${dailyInsight.confidence}%` },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/70 bg-card/70 p-4 backdrop-blur"
              >
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="mt-1 font-display text-lg font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}

export function OverviewCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {overviewMetrics.map((m, i) => (
        <Reveal key={m.label} delay={i * 0.04}>
          <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
            <Card className="group relative h-full overflow-hidden rounded-3xl border-border/70 shadow-soft transition-shadow hover:shadow-glow">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-20 surface-glow opacity-0 transition-opacity group-hover:opacity-100" />
              <CardContent className="relative space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-medium text-muted-foreground">{m.label}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
                    <DynIcon name={m.icon} className="h-4 w-4" />
                  </span>
                </div>
                <p className="font-display text-3xl font-extrabold leading-none">
                  <AnimatedCounter value={m.value} suffix={m.suffix} />
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-muted-foreground">{m.hint}</span>
                  <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-success/12 px-2 py-0.5 text-xs font-semibold text-success">
                    +{m.delta}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}

export function RecentActivity() {
  return (
    <Reveal>
      <DashCard title="Recent activity" description="Everything your workspace did lately.">
        <ol className="relative space-y-5 border-l border-border pl-6">
          {timeline.map((item) => (
            <li key={item.title} className="relative">
              <span
                className={cn(
                  "absolute -left-[2.1rem] grid h-7 w-7 place-items-center rounded-full border border-border bg-card",
                  item.tone === "success" && "text-success",
                  item.tone === "warning" && "text-warning",
                  item.tone === "info" && "text-primary",
                )}
              >
                <DynIcon name={item.icon} className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>
            </li>
          ))}
        </ol>
      </DashCard>
    </Reveal>
  );
}

export function CoachCard() {
  return (
    <Reveal delay={0.05}>
      <Card className="relative h-full overflow-hidden rounded-3xl border-border/70 shadow-soft">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-28 surface-glow" />
        <CardContent className="relative space-y-4 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold">AI Career Coach</p>
              <p className="text-xs text-muted-foreground">Grounded in your resume & portfolio</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-muted/40 p-4 text-sm text-muted-foreground">
            “Your ATS score is strong at 91. Let&apos;s fix the 4 bullets missing metrics and you&apos;ll
            clear Vercel&apos;s filter comfortably.”
          </div>
          <div className="flex flex-wrap gap-2">
            {coachPromptChips.map((p) => (
              <button
                key={p}
                onClick={() => toast.success("Prompt queued", { description: p })}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/40 hover:bg-primary-soft hover:text-primary"
              >
                {p}
              </button>
            ))}
          </div>
          <Button asChild variant="hero" className="w-full">
            <Link to="/app/coach">
              Open chat <ArrowRight />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </Reveal>
  );
}

export function JobMatches() {
  return (
    <Reveal>
      <DashCard
        title="Job matches"
        description="Ranked by fit against your resume, skills and portfolio."
        action={
          <Button asChild variant="ghost" size="sm">
            <Link to="/app/jobs">
              View all <ArrowUpRight />
            </Link>
          </Button>
        }
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {matchJobs.map((job) => (
            <motion.article
              key={job.id}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-brand font-display text-base font-extrabold text-primary-foreground">
                    {job.logo}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{job.title}</p>
                    <p className="truncate text-sm text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                <Badge className="shrink-0 rounded-full bg-success/15 text-success hover:bg-success/15">
                  {job.match}% match
                </Badge>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {job.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Wallet className="h-3.5 w-3.5" /> {job.salary}
                </span>
                {job.remote && (
                  <Badge variant="secondary" className="rounded-full text-[0.65rem]">
                    Remote
                  </Badge>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Why you match</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.reasons.map((r) => (
                    <span
                      key={r}
                      className="rounded-full bg-primary-soft px-2.5 py-1 text-[0.7rem] font-medium text-primary"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex gap-2">
                <Button
                  size="sm"
                  variant="hero"
                  className="flex-1"
                  onClick={() => toast.success("Application drafted", { description: `${job.title} · ${job.company}` })}
                >
                  <Send /> Apply
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast("Saved to your list", { description: job.title })}
                >
                  <Bookmark /> Save
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </DashCard>
    </Reveal>
  );
}

export function UpcomingAndGoals({
  events,
  goal,
}: {
  events: { kind: string; title: string; when: string; tone: string; icon: string }[];
  goal: {
    title: string;
    progress: number;
    deadline: string;
    today: { label: string; done: boolean }[];
    weekly: { label: string; done: boolean }[];
  };
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Reveal>
        <DashCard title="Current goal" description={`Deadline · ${goal.deadline}`} className="h-full">
          <div className="space-y-2">
            <div className="flex items-end justify-between gap-3">
              <p className="font-display text-lg font-bold">{goal.title}</p>
              <span className="font-display text-2xl font-extrabold text-primary">
                {goal.progress}%
              </span>
            </div>
            <ProgressBar value={goal.progress} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Today's tasks", items: goal.today },
              { title: "This week", items: goal.weekly },
            ].map((group) => (
              <div key={group.title} className="space-y-2 rounded-2xl border border-border/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.title}
                </p>
                <ul className="space-y-2">
                  {group.items.map((t) => (
                    <li key={t.label} className="flex items-start gap-2 text-sm">
                      <span
                        className={cn(
                          "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border",
                          t.done ? "border-success bg-success/15 text-success" : "border-border",
                        )}
                      >
                        {t.done && <DynIcon name="Check" className="h-2.5 w-2.5" />}
                      </span>
                      <span className={t.done ? "text-muted-foreground line-through" : ""}>
                        {t.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DashCard>
      </Reveal>

      <Reveal delay={0.05}>
        <DashCard title="Upcoming" description="Interviews, deadlines and reminders." className="h-full">
          <ul className="space-y-3">
            {events.map((e) => (
              <li
                key={e.title}
                className="flex items-center gap-3 rounded-2xl border border-border/70 p-4"
              >
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                    e.tone === "primary" && "bg-primary-soft text-primary",
                    e.tone === "success" && "bg-success/12 text-success",
                    e.tone === "warning" && "bg-warning/15 text-warning",
                    e.tone === "destructive" && "bg-destructive/12 text-destructive",
                  )}
                >
                  <DynIcon name={e.icon} className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{e.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{e.kind}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {e.when}
                </span>
              </li>
            ))}
          </ul>
        </DashCard>
      </Reveal>
    </div>
  );
}
