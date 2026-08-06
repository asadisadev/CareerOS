import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  Check,
  FileText,
  Gauge,
  Globe,
  LayoutTemplate,
  LineChart,
  Mail,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Wand2,
} from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { faqs, plans, portfolioThemes, resumeTemplates, testimonials } from "@/data/mock";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 py-20 sm:py-24 lg:px-8 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-16 sm:pb-24 sm:pt-24 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 surface-glow" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-[0.35] grid-lines [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <motion.div {...fadeUp} className="min-w-0 space-y-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI career operating system
            <span className="text-muted-foreground">· v2.0</span>
          </span>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Build Your Career <span className="text-gradient">with AI</span>
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Create ATS-friendly resumes, generate professional portfolios, improve your career, and
            get hired faster using AI.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/auth/register">
                Start Free <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/how-it-works">
                <PlayCircle /> Watch Demo
              </Link>
            </Button>
          </div>

          <dl className="grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-7">
            {[
              { k: "142k", v: "Resumes optimized" },
              { k: "3.4x", v: "More interviews" },
              { k: "91%", v: "Avg. ATS score" },
            ].map((s) => (
              <div key={s.k} className="min-w-0">
                <dt className="font-display text-2xl font-extrabold">{s.k}</dt>
                <dd className="text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0"
        >
          <Card className="overflow-hidden rounded-3xl border-border shadow-lift">
            <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
              <span className="ml-2 truncate text-xs text-muted-foreground">
                careeros.ai/app — Resume score
              </span>
            </div>
            <CardContent className="space-y-5 p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-bold">
                    Senior Product Designer
                  </p>
                  <p className="text-xs text-muted-foreground">Tailored for Vercel · 94% match</p>
                </div>
                <Badge className="shrink-0 rounded-full bg-success/15 text-success">
                  ATS 91
                </Badge>
              </div>
              {[
                { label: "Formatting", value: 96 },
                { label: "Keywords", value: 84 },
                { label: "Achievements", value: 78 },
              ].map((row) => (
                <div key={row.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{row.label}</span>
                    <span className="text-muted-foreground">{row.value}</span>
                  </div>
                  <Progress value={row.value} className="h-2" />
                </div>
              ))}
              <div className="rounded-2xl border border-border bg-primary-soft/60 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Wand2 className="h-4 w-4" /> AI suggestion
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Quantify your design-system work: “governed 120 components across 4 teams”.
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="pointer-events-none absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-lift sm:block">
            <p className="text-xs text-muted-foreground">Portfolio published</p>
            <p className="text-sm font-semibold">ayesha.careeros.site</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: FileText,
    title: "Resume Builder",
    body: "Structured editor, live preview, multiple templates, PDF export and inline AI rewrites.",
  },
  {
    icon: LayoutTemplate,
    title: "Portfolio Builder",
    body: "23 section types, drag-to-reorder, premium themes and responsive live preview.",
  },
  {
    icon: Gauge,
    title: "ATS Optimization",
    body: "Score formatting, keywords, grammar, achievements and skills against any job description.",
  },
  {
    icon: Bot,
    title: "AI Career Coach",
    body: "Grounded advice on your real documents: reviews, roadmaps and interview drills.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job Matching",
    body: "Match scoring, skill-gap analysis, saved jobs and a full application tracker.",
  },
  {
    icon: Mail,
    title: "Cover Letters",
    body: "Role-specific letters generated from your resume and the target company's language.",
  },
  {
    icon: Globe,
    title: "Portfolio Hosting",
    body: "Custom domains, automatic SSL, SEO metadata and a built-in blog engine.",
  },
  {
    icon: LineChart,
    title: "Career Analytics",
    body: "Track portfolio visits, resume views, application funnel and score progression.",
  },
];

export function Features() {
  return (
    <Section id="features" className="border-t border-border">
      <SectionHeading
        eyebrow="Platform"
        title="One workspace for your entire career"
        description="Eight connected modules that share the same profile, so every improvement compounds across your resume, portfolio and applications."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div key={f.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.04 }}>
            <Card className="group h-full rounded-2xl shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
              <CardContent className="space-y-3 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-gradient-brand group-hover:text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-bold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

const steps = [
  { title: "Create Account", body: "Sign up free in seconds — email or Google. No credit card, no setup wizard." },
  { title: "Tell AI About Yourself", body: "Paste an old resume, connect LinkedIn, or answer six guided questions." },
  { title: "Generate Resume", body: "Pick a template and CareerOS writes structured, metric-driven bullet points." },
  { title: "Generate Portfolio", body: "Your projects become a hosted portfolio site with SEO and analytics built in." },
  { title: "Improve ATS Score", body: "Paste the job description and apply keyword, format and grammar fixes in one click." },
  { title: "Get Job Recommendations", body: "Receive scored matches daily and track every application through to the offer." },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-t border-border bg-card/40">
      <SectionHeading
        eyebrow="How it works"
        title="Six steps from blank page to shortlisted"
        description="Most users publish a portfolio and an ATS-optimized resume in under 30 minutes."
      />
      <ol className="relative mx-auto mt-14 max-w-3xl">
        <span
          aria-hidden="true"
          className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
        />
        {steps.map((s, i) => (
          <motion.li
            key={s.title}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.06 }}
            className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-5 pb-6 last:pb-0"
          >
            <span className="relative z-10 grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand font-display text-sm font-extrabold text-primary-foreground shadow-glow">
              {i + 1}
            </span>
            <Card className="rounded-2xl shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
              <CardContent className="space-y-1.5 p-5 sm:p-6">
                <h3 className="font-display text-base font-bold sm:text-lg">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </CardContent>
            </Card>
          </motion.li>
        ))}
      </ol>
    </Section>

  );
}

export function Templates() {
  return (
    <Section id="templates" className="border-t border-border">
      <SectionHeading
        eyebrow="Templates & themes"
        title="Designed by people who hire"
        description="Resume templates that parse cleanly through applicant tracking systems, and portfolio themes that look hand-built."
      />
      <div className="mt-14 space-y-10">
        <div>
          <h3 className="mb-4 font-display text-lg font-bold">Resume templates</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resumeTemplates.map((t) => (
              <Card key={t.id} className="group overflow-hidden rounded-2xl shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[4/3] border-b border-border bg-muted/50 p-5">
                  <div className="h-full rounded-lg bg-card p-4 shadow-soft">
                    <div className="h-2.5 w-1/2 rounded bg-foreground/80" />
                    <div className="mt-1.5 h-1.5 w-1/3 rounded bg-muted-foreground/50" />
                    <div className="mt-4 space-y-1.5">
                      {[90, 76, 84, 60, 70].map((w, idx) => (
                        <div
                          key={idx}
                          className="h-1.5 rounded bg-muted-foreground/25"
                          style={{ width: `${w}%` }}
                        />
                      ))}
                    </div>
                    <div className="mt-4 flex gap-1.5">
                      {[0, 1, 2].map((k) => (
                        <span key={k} className="h-4 w-10 rounded-full bg-primary/15" />
                      ))}
                    </div>
                  </div>
                  {t.pro && (
                    <Badge className="absolute right-3 top-3 rounded-full bg-gradient-brand text-primary-foreground">
                      Spark
                    </Badge>
                  )}
                </div>
                <CardContent className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{t.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{t.tone}</p>
                  </div>
                  <Button asChild size="sm" variant="soft">
                    <Link to="/app/resume">Use</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-display text-lg font-bold">Portfolio themes</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioThemes.map((t) => (
              <Card key={t.id} className="group overflow-hidden rounded-2xl shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[16/10] border-b border-border bg-gradient-brand/10 p-5">
                  <div className="h-full rounded-xl bg-card p-4 shadow-soft">
                    <div className="h-3 w-2/3 rounded bg-foreground/80" />
                    <div className="mt-2 h-1.5 w-1/2 rounded bg-muted-foreground/40" />
                    <div className="mt-4 grid grid-cols-3 gap-1.5">
                      {[0, 1, 2, 3, 4, 5].map((k) => (
                        <span key={k} className="aspect-square rounded-md bg-primary/12" />
                      ))}
                    </div>
                  </div>
                  {t.pro && (
                    <Badge className="absolute right-3 top-3 rounded-full bg-gradient-brand text-primary-foreground">
                      Spark
                    </Badge>
                  )}
                </div>
                <CardContent className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{t.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{t.tone}</p>
                  </div>
                  <Button asChild size="sm" variant="soft">
                    <Link to="/app/portfolio">Preview</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Pricing() {
  return (
    <Section id="pricing" className="border-t border-border bg-card/40">
      <SectionHeading
        eyebrow="Pricing"
        title="Start free. Upgrade when it pays for itself."
        description="No credit card to begin. Cancel anytime — your documents and portfolio stay yours."
      />
      <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <motion.div key={plan.name} {...fadeUp} className="h-full">
            <Card
              className={
                plan.highlighted
                  ? "relative h-full rounded-3xl border-primary/40 shadow-glow"
                  : "h-full rounded-3xl shadow-soft"
              }
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold text-primary-foreground">
                  Most popular
                </span>
              )}
              <CardContent className="flex h-full flex-col gap-6 p-7">
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold">{plan.name}</h3>
                  <p className="flex items-end gap-1.5">
                    <span className="font-display text-4xl font-extrabold">{plan.price}</span>
                    <span className="pb-1 text-sm text-muted-foreground">{plan.period}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  variant={plan.highlighted ? "hero" : "outline"}
                  className="w-full"
                >
                  <Link to={plan.name === "Enterprise" ? "/app/admin" : "/auth/register"}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export function Testimonials() {
  return (
    <Section className="border-t border-border">
      <SectionHeading
        eyebrow="Testimonials"
        title="Careers moved forward"
        description="Students, career switchers and senior professionals use CareerOS AI to land interviews faster."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <motion.div key={t.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
            <Card className="h-full rounded-2xl shadow-soft">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <div className="flex gap-0.5 text-warning">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">“{t.quote}”</p>
                <div className="flex min-w-0 items-center gap-3 border-t border-border pt-4">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className="bg-primary-soft text-xs font-bold text-primary">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{t.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export function Faq() {
  return (
    <Section className="border-t border-border bg-card/40">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Questions, answered"
          description="Everything else lives in our docs, or ask the AI coach inside the app."
        />
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section className="border-t border-border">
      <Card className="relative overflow-hidden rounded-3xl border-primary/30 shadow-glow">
        <span className="pointer-events-none absolute inset-0 bg-gradient-brand opacity-[0.08]" />
        <CardContent className="relative flex flex-col items-center gap-6 px-6 py-16 text-center">
          <Badge className="rounded-full bg-primary-soft text-primary">
            <BadgeCheck className="mr-1 h-3.5 w-3.5" /> Free forever plan
          </Badge>
          <h2 className="max-w-2xl text-balance text-3xl font-extrabold sm:text-4xl">
            Your next role starts with a better first impression
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            Build your resume, publish your portfolio and get matched — all in one afternoon.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/auth/register">
                Create your free account <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/pricing">Compare plans</Link>
            </Button>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" /> Your data stays private. Export or delete anytime.
          </p>
        </CardContent>
      </Card>
    </Section>
  );
}
