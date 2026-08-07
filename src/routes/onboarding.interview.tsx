import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  FileText,
  Globe,
  Loader2,
  Pencil,
  SkipForward,
  Sparkle,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { interviewQuestions } from "@/data/onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding/interview")({
  head: () => ({
    meta: [
      { title: "AI Career Interview — CareerOS AI" },
      {
        name: "description",
        content: "A guided AI conversation that turns your experience into a career profile.",
      },
      { property: "og:title", content: "AI Career Interview — CareerOS AI" },
      {
        property: "og:description",
        content: "22 questions, three minutes, one complete career profile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InterviewPage,
});

function Avatar({ role }: { role: "ai" | "user" }) {
  if (role === "ai") {
    return (
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
        <Sparkle className="h-4 w-4" />
      </span>
    );
  }
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-muted text-xs font-semibold">
      You
    </span>
  );
}

function TypingBubble() {
  return (
    <div className="flex items-end gap-2.5">
      <Avatar role="ai" />
      <div className="flex gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
          />
        ))}
      </div>
    </div>
  );
}

function InterviewPage() {
  const navigate = useNavigate();
  const total = interviewQuestions.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [complete, setComplete] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const question = interviewQuestions[step]!;
  const progress = useMemo(
    () => Math.round((Object.keys(answers).length / total) * 100),
    [answers, total],
  );

  useEffect(() => {
    setDraft(answers[question.id] ?? "");
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 650);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [step, typing, complete, generating]);

  async function finish(final: Record<string, string>) {
    setAnswers(final);
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 2200));
    setGenerating(false);
    setComplete(true);
    toast.success("Career profile generated");
  }

  function next() {
    const value = draft.trim();
    if (!value && !question.optional) {
      toast.error("This one helps us a lot", { description: "Add an answer or pick a suggestion." });
      return;
    }
    const updated = { ...answers, [question.id]: value || "Skipped" };
    if (step === total - 1) {
      void finish(updated);
      return;
    }
    setAnswers(updated);
    setStep((s) => s + 1);
  }

  function skip() {
    const updated = { ...answers, [question.id]: "Skipped" };
    if (step === total - 1) {
      void finish(updated);
      return;
    }
    setAnswers(updated);
    setStep((s) => s + 1);
  }

  if (generating) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 py-16">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <p className="text-sm font-medium">Generating your career profile…</p>
        </div>
        <div className="space-y-3 rounded-3xl border border-border bg-card/70 p-6 backdrop-blur">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="h-3 w-3/4" />
          <div className="grid gap-3 pt-3 sm:grid-cols-2">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (complete) {
    return <ProfileGenerated onContinue={() => navigate({ to: "/app" })} />;
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
      <div className="sticky top-0 z-10 space-y-2 bg-background/80 pb-4 pt-1 backdrop-blur">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium text-foreground">AI Career Interview</span>
          <span>
            Question {step + 1} of {total}
          </span>
        </div>
        <Progress value={Math.round(((step + 1) / total) * 100)} className="h-1.5" />
      </div>

      <div className="flex-1 space-y-5 py-4">
        {interviewQuestions.slice(0, step + 1).map((q, i) => (
          <div key={q.id} className="space-y-3">
            {i === step && typing ? (
              <TypingBubble />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5"
              >
                <Avatar role="ai" />
                <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
                  <p className="text-sm leading-relaxed">{q.prompt}</p>
                  {q.hint ? (
                    <p className="mt-1 text-xs text-muted-foreground">{q.hint}</p>
                  ) : null}
                </div>
              </motion.div>
            )}

            {i < step && answers[q.id] ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-end gap-2.5"
              >
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  className="group max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-left text-sm text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {answers[q.id]}
                  <span className="mt-1 flex items-center gap-1 text-[11px] opacity-70">
                    <Pencil className="h-3 w-3" /> Edit answer
                  </span>
                </button>
                <Avatar role="user" />
              </motion.div>
            ) : null}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div
        className={cn(
          "sticky bottom-0 space-y-3 bg-background/85 pb-4 pt-3 backdrop-blur transition-opacity duration-300",
          typing && "pointer-events-none opacity-40",
        )}
      >


            {question.options ? (
              <div className="flex flex-wrap gap-2">
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDraft(option)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                      draft === option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : null}

            {question.suggestions ? (
              <div className="flex flex-wrap gap-2">
                {question.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() =>
                      setDraft((d) => (d.trim() ? `${d.replace(/,\s*$/, "")}, ${s}` : s))
                    }
                    className="rounded-full border border-dashed border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="rounded-2xl border border-border bg-card p-2.5">
              {question.multiline ? (
                <Textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={question.placeholder ?? "Type your answer…"}
                  rows={3}
                  className="resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              ) : (
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      next();
                    }
                  }}
                  placeholder={question.placeholder ?? "Type your answer…"}
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              )}
              <div className="flex items-center justify-between gap-2 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                >
                  <ArrowLeft /> Back
                </Button>
                <div className="flex items-center gap-2">
                  {question.optional ? (
                    <Button variant="ghost" size="sm" onClick={skip}>
                      <SkipForward /> Skip
                    </Button>
                  ) : null}
                  <Button variant="hero" size="sm" onClick={next}>
                    {step === total - 1 ? "Generate profile" : "Next"} <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-center text-[11px] text-muted-foreground">
              {progress}% answered · you can edit any answer by tapping it
            </p>
      </div>

    </div>
  );
}

function ProfileGenerated({ onContinue }: { onContinue: () => void }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setValue(35), 250);
    return () => clearTimeout(t);
  }, []);

  const cards = [
    { icon: FileText, title: "Resume ready", body: "ATS score 82 · 1 page · Modern template" },
    { icon: Globe, title: "Portfolio ready", body: "Minimal theme · 3 sections drafted" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-8 py-12"
    >
      <div className="space-y-4 text-center">
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 210, damping: 16 }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-success/15 text-success"
        >
          <Check className="h-7 w-7" />
        </motion.span>
        <h1 className="font-display text-3xl font-extrabold">Career profile generated</h1>
        <p className="text-sm text-muted-foreground">
          Here's your starting point. Complete the remaining sections to boost your match rate.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card/70 p-6 backdrop-blur">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Profile completion</span>
          <span className="font-display text-2xl font-extrabold text-gradient">{value}%</span>
        </div>
        <Progress value={value} className="mt-3 h-2 transition-all" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {cards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary/12 text-primary">
                  <card.icon className="h-4 w-4" />
                </span>
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  {card.title}
                  <CircleCheck className="h-3.5 w-3.5 text-success" />
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button variant="hero" size="xl" className="w-full sm:w-auto" onClick={onContinue}>
          Continue to dashboard <ArrowRight />
        </Button>
        <Button asChild variant="ghost" size="xl" className="w-full sm:w-auto">
          <Link to="/app/resume">Review my resume</Link>
        </Button>
      </div>
    </motion.div>
  );
}
