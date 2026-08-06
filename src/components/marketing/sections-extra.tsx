import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Bot,
  Braces,
  Check,
  CircleSlash,
  Clock,
  Eye,
  FileWarning,
  PenLine,
  ScanSearch,
  SearchX,
  Sparkles,
  UserRound,
} from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/marketing/sections";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

/* ------------------------------- Trusted by ------------------------------- */

const audiences = ["Students", "Developers", "Designers", "Freelancers", "Professionals"];
const companies = ["Northwind", "Beacon Health", "Lumina Labs", "Orbit Pay", "Verity", "Kite Studio"];

export function TrustedBy() {
  return (
    <section className="border-y border-border bg-card/40 px-5 py-12 lg:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by 142,000+ career builders and hiring teams
        </p>
        <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {companies.map((c) => (
            <div
              key={c}
              className="flex min-w-0 items-center justify-center gap-2 rounded-xl border border-border/70 bg-card px-3 py-3 opacity-80 transition-opacity hover:opacity-100"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-gradient-brand text-[10px] font-extrabold text-primary-foreground">
                {c.charAt(0)}
              </span>
              <span className="truncate font-display text-sm font-bold tracking-tight">{c}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {audiences.map((a) => (
            <Badge key={a} variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">
              {a}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Problems -------------------------------- */

const problems = [
  {
    icon: PenLine,
    title: "Writing resumes is painful",
    body: "Blank page, unclear structure, and no idea which bullet points recruiters actually read.",
  },
  {
    icon: Braces,
    title: "Portfolios never get built",
    body: "Great work sits in folders because building and hosting a personal site takes weeks.",
  },
  {
    icon: SearchX,
    title: "Applications go unanswered",
    body: "Hundreds of applications, no replies, and zero feedback on what went wrong.",
  },
  {
    icon: FileWarning,
    title: "ATS filters are invisible",
    body: "75% of resumes are rejected by software before a human ever opens them.",
  },
  {
    icon: CircleSlash,
    title: "Finding the right jobs is noise",
    body: "Job boards show thousands of roles with no signal about which ones actually fit you.",
  },
  {
    icon: Clock,
    title: "Interview prep is guesswork",
    body: "No structured practice, no company context, and no honest feedback before the real call.",
  },
];

export function Problem() {
  return (
    <Section id="problem">
      <SectionHeading
        eyebrow="The problem"
        title="Job hunting is broken — and it isn't your fault"
        description="The average candidate sends 100+ applications for a single offer, competing against software they can't see and rankings they can't influence."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((p, i) => (
          <motion.div key={p.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.04 }}>
            <Card className="h-full rounded-2xl border-destructive/15 bg-destructive/[0.03] shadow-soft">
              <CardContent className="space-y-3 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-destructive/10 text-destructive">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-bold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------- Portfolio templates --------------------------- */

type Preset = { name: string; tone: string; swatch: string; pro?: boolean };

const portfolioPresets: Preset[] = [
  { name: "Minimal", tone: "Whitespace-first, typographic", swatch: "from-slate-200 to-slate-50" },
  { name: "Developer", tone: "Mono type, repo-style project grid", swatch: "from-emerald-300 to-teal-100" },
  { name: "Creative", tone: "Bold colour blocks, image-led", swatch: "from-fuchsia-300 to-orange-200" },
  { name: "Corporate", tone: "Structured, credential-forward", swatch: "from-blue-300 to-sky-100" },
  { name: "Dark", tone: "High-contrast night canvas", swatch: "from-zinc-700 to-zinc-900", pro: true },
  { name: "Glass", tone: "Blurred layers, soft depth", swatch: "from-violet-300 to-cyan-200", pro: true },
  { name: "Modern", tone: "Gradient accents, case-study first", swatch: "from-indigo-300 to-pink-200", pro: true },
];

export function PortfolioShowcase() {
  return (
    <Section id="portfolio-builder" className="border-t border-border">
      <SectionHeading
        eyebrow="Portfolio builder"
        title="Seven portfolio themes, published on your own domain"
        description="Pick a theme, drop in your projects, and CareerOS hosts it with SSL, SEO metadata and visitor analytics included."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioPresets.map((t, i) => (
          <motion.div key={t.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.04 }}>
            <Card className="group h-full overflow-hidden rounded-3xl shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift">
              <div className={`relative aspect-[16/10] border-b border-border bg-gradient-to-br ${t.swatch} p-5`}>
                <div className="h-full rounded-2xl bg-card/90 p-4 shadow-lift backdrop-blur">
                  <div className="h-3 w-2/3 rounded bg-foreground/80" />
                  <div className="mt-2 h-1.5 w-1/2 rounded bg-muted-foreground/40" />
                  <div className="mt-4 grid grid-cols-3 gap-1.5">
                    {[0, 1, 2, 3, 4, 5].map((k) => (
                      <span key={k} className="aspect-square rounded-md bg-primary/15" />
                    ))}
                  </div>
                </div>
                {t.pro && (
                  <Badge className="absolute right-3 top-3 rounded-full bg-gradient-brand text-primary-foreground">
                    Spark
                  </Badge>
                )}
              </div>
              <CardContent className="flex items-center justify-between gap-3 p-5">
                <div className="min-w-0">
                  <p className="truncate font-display font-bold">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.tone}</p>
                </div>
                <Button asChild size="sm" variant="soft" className="shrink-0">
                  <Link to="/templates">
                    <Eye /> Preview
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

/* ----------------------------- Resume templates ---------------------------- */

const resumePresets = [
  { name: "Professional", tone: "Balanced classic layout" },
  { name: "ATS", tone: "Single column, parser-perfect" },
  { name: "Minimal", tone: "Quiet type, generous margins" },
  { name: "Creative", tone: "Accent sidebar for portfolios" },
  { name: "Executive", tone: "Serif headings, leadership focus" },
];

export function ResumeShowcase() {
  return (
    <Section id="resume-builder" className="border-t border-border bg-card/40">
      <SectionHeading
        eyebrow="Resume builder"
        title="Five resume templates, every one ATS-tested"
        description="Live preview while you edit, inline AI rewrites, and one-click PDF export that keeps parsing clean."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {resumePresets.map((t, i) => (
          <motion.div key={t.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
            <Card className="h-full overflow-hidden rounded-2xl shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift">
              <div className="border-b border-border bg-muted/50 p-4">
                <div className="aspect-[3/4] rounded-lg bg-card p-3 shadow-soft">
                  <div className="h-2 w-1/2 rounded bg-foreground/80" />
                  <div className="mt-1 h-1 w-1/3 rounded bg-muted-foreground/50" />
                  <div className="mt-3 space-y-1.5">
                    {[92, 78, 86, 64, 74, 58].map((w, idx) => (
                      <div
                        key={idx}
                        className="h-1 rounded bg-muted-foreground/25"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex gap-1">
                    {[0, 1, 2].map((k) => (
                      <span key={k} className="h-3 w-6 rounded-full bg-primary/15" />
                    ))}
                  </div>
                </div>
              </div>
              <CardContent className="space-y-1 p-4">
                <p className="truncate font-display font-bold">{t.name}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{t.tone}</p>
                <Button asChild size="sm" variant="ghost" className="mt-1 -ml-2">
                  <Link to="/templates">
                    Preview <ArrowRight />
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

/* ------------------------------- AI demo chat ------------------------------ */

const thread = [
  {
    role: "user" as const,
    text: "Build me a Full Stack Developer portfolio.",
  },
  {
    role: "assistant" as const,
    text: "Portfolio generated successfully — 7 sections with your GitHub projects, published to hamza.careeros.site.",
    chips: ["Hero", "Projects", "Skills", "Experience", "Contact"],
  },
  {
    role: "user" as const,
    text: "Now optimize my resume for a Senior Full Stack role at Stripe.",
  },
  {
    role: "assistant" as const,
    text: "Resume optimized. Added 9 missing keywords, quantified 4 bullets, and removed 2 parser-breaking tables. ATS Score is now 92%.",
    metrics: [
      { label: "ATS score", value: "92%" },
      { label: "Keywords matched", value: "38/41" },
      { label: "Match to role", value: "94%" },
    ],
  },
];

export function AiDemo() {
  return (
    <Section id="ai-coach" className="border-t border-border">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          align="left"
          eyebrow="AI career coach"
          title="Ask for it. Watch it get built."
          description="The coach reads your real resume, portfolio and target roles — then rewrites, generates and scores in the same conversation. No prompt engineering required."
        />
        <motion.div {...fadeUp}>
          <Card className="overflow-hidden rounded-3xl border-border shadow-lift">
            <div className="flex items-center gap-2.5 border-b border-border bg-muted/60 px-5 py-3.5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
                <Bot className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold">CareerOS Coach</p>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online
              </span>
            </div>
            <CardContent className="space-y-4 p-5 sm:p-6">
              {thread.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.15 }}
                  className={m.role === "user" ? "flex justify-end" : "flex gap-3"}
                >
                  {m.role === "assistant" && (
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                      <Sparkles className="h-4 w-4" />
                    </span>
                  )}
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground"
                        : "min-w-0 flex-1 space-y-3"
                    }
                  >
                    <p className={m.role === "user" ? "" : "text-sm leading-relaxed"}>{m.text}</p>
                    {m.chips && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.chips.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                    {m.metrics && (
                      <div className="grid gap-2 sm:grid-cols-3">
                        {m.metrics.map((x) => (
                          <div
                            key={x.label}
                            className="rounded-xl border border-border bg-card p-3 shadow-soft"
                          >
                            <p className="font-display text-lg font-extrabold text-primary">
                              {x.value}
                            </p>
                            <p className="text-[11px] text-muted-foreground">{x.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {m.role === "user" && (
                    <span className="mt-0.5 ml-3 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                      <UserRound className="h-4 w-4" />
                    </span>
                  )}
                </motion.div>
              ))}
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted/40 px-4 py-3">
                <ScanSearch className="h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="truncate text-sm text-muted-foreground">
                  Ask anything about your career…
                </p>
                <span className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </CardContent>
          </Card>
          <ul className="mt-5 grid gap-2 sm:grid-cols-3">
            {["Grounded in your documents", "Rewrites you approve", "Interview drills included"].map(
              (x) => (
                <li key={x} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" /> {x}
                </li>
              ),
            )}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
