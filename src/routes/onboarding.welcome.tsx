import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Clock, FileText, MessagesSquare, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome to CareerOS AI — Let's build your profile" },
      {
        name: "description",
        content: "A 3-minute AI interview turns your experience into a resume, portfolio and job matches.",
      },
      { property: "og:title", content: "Welcome to CareerOS AI" },
      {
        property: "og:description",
        content: "We'll build your career profile using AI in about three minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WelcomePage,
});

const steps = [
  {
    icon: MessagesSquare,
    title: "Answer a short AI interview",
    body: "22 quick questions about your experience, skills and goals.",
  },
  {
    icon: Sparkle,
    title: "We generate your profile",
    body: "Skills, achievements and summaries structured for ATS parsers.",
  },
  {
    icon: FileText,
    title: "Resume + portfolio ready",
    body: "Edit anything afterwards — nothing is locked in.",
  },
];

function WelcomePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> Estimated time: 3 minutes
        </span>
        <div className="space-y-4">
          <h1 className="text-balance font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Welcome to <span className="text-gradient">CareerOS AI</span>
          </h1>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            We'll build your career profile using AI. Answer a few questions and we'll turn them into
            an ATS-ready resume, a hosted portfolio and matched job roles.
          </p>
        </div>

        <div className="grid gap-3 text-left sm:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
              className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/12 text-primary">
                <step.icon className="h-4.5 w-4.5" />
              </span>
              <h2 className="mt-3 text-sm font-semibold">{step.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
            <Link to="/onboarding/interview">
              Let's begin <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="xl" className="w-full sm:w-auto">
            <Link to="/app">Skip for now</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
