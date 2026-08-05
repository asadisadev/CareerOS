export type Trend = { label: string; value: number };

export const currentUser = {
  name: "Ayesha Malik",
  role: "Product Designer",
  email: "ayesha.malik@careeros.ai",
  plan: "Spark" as const,
  initials: "AM",
  location: "Karachi, PK",
};

export const scores = {
  resume: 86,
  portfolio: 72,
  ats: 91,
  matches: 24,
};

export const applicationTrend: Trend[] = [
  { label: "Mar", value: 4 },
  { label: "Apr", value: 9 },
  { label: "May", value: 7 },
  { label: "Jun", value: 14 },
  { label: "Jul", value: 19 },
  { label: "Aug", value: 26 },
];

export const scoreTrend = [
  { label: "Week 1", resume: 58, ats: 61 },
  { label: "Week 2", resume: 64, ats: 68 },
  { label: "Week 3", resume: 71, ats: 74 },
  { label: "Week 4", resume: 77, ats: 82 },
  { label: "Week 5", resume: 82, ats: 87 },
  { label: "Week 6", resume: 86, ats: 91 },
];

export const trafficSources = [
  { label: "LinkedIn", value: 412 },
  { label: "Direct", value: 286 },
  { label: "Search", value: 194 },
  { label: "GitHub", value: 121 },
  { label: "Referral", value: 64 },
];

export const activity = [
  { title: "ATS score improved to 91", meta: "Senior Product Designer resume", time: "12m ago", kind: "success" as const },
  { title: "New job match found", meta: "Vercel · Product Designer · 94% match", time: "1h ago", kind: "info" as const },
  { title: "Portfolio published", meta: "ayesha.careeros.site", time: "4h ago", kind: "success" as const },
  { title: "Cover letter generated", meta: "Linear · Design Engineer", time: "Yesterday", kind: "info" as const },
  { title: "Skill gap detected", meta: "Design systems tokens · intermediate", time: "2d ago", kind: "warning" as const },
];

export const aiSuggestions = [
  "Quantify 3 achievements in your latest role — recruiters weigh metrics 2x.",
  "Add “design systems” and “accessibility” keywords to pass Vercel’s ATS filter.",
  "Your portfolio hero lacks a clear value proposition. Generate one with AI.",
  "Two projects have no outcome section. Add impact to raise portfolio score by 11.",
];

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  match: number;
  posted: string;
  tags: string[];
  status?: "saved" | "applied" | "interview" | "offer" | "rejected";
};

export const jobs: Job[] = [
  { id: "j1", title: "Senior Product Designer", company: "Vercel", location: "Remote · US", salary: "$150k – $190k", type: "Full-time", match: 94, posted: "2d ago", tags: ["Design Systems", "Figma", "Next.js"] },
  { id: "j2", title: "Design Engineer", company: "Linear", location: "Remote · Global", salary: "$140k – $175k", type: "Full-time", match: 91, posted: "3d ago", tags: ["React", "Motion", "TypeScript"] },
  { id: "j3", title: "Product Designer II", company: "Stripe", location: "Dublin, IE", salary: "€95k – €120k", type: "Hybrid", match: 87, posted: "5d ago", tags: ["Payments", "Research", "Prototyping"] },
  { id: "j4", title: "UX Designer", company: "Notion", location: "Remote · EU", salary: "$120k – $150k", type: "Full-time", match: 83, posted: "1w ago", tags: ["Docs", "IA", "Systems"] },
  { id: "j5", title: "Senior UI Engineer", company: "Raycast", location: "Remote", salary: "$130k – $165k", type: "Contract", match: 79, posted: "1w ago", tags: ["Tailwind", "Radix", "A11y"] },
  { id: "j6", title: "Brand & Web Designer", company: "Framer", location: "Amsterdam, NL", salary: "€80k – €100k", type: "Full-time", match: 74, posted: "2w ago", tags: ["Web", "Brand", "Motion"] },
];

export const savedJobs = jobs.slice(1, 4).map((j) => ({ ...j, status: "saved" as const }));

export const applications: Job[] = [
  { ...jobs[0]!, status: "interview" },
  { ...jobs[2]!, status: "applied" },
  { ...jobs[3]!, status: "offer" },
  { ...jobs[4]!, status: "rejected" },
];


export const skillGaps = [
  { skill: "Design Systems", you: 82, market: 90 },
  { skill: "Prototyping", you: 74, market: 85 },
  { skill: "Accessibility", you: 55, market: 80 },
  { skill: "Frontend (React)", you: 68, market: 78 },
  { skill: "User Research", you: 61, market: 72 },
];

export const atsChecks = [
  { area: "Formatting", score: 96, note: "Clean single-column structure, parser friendly." },
  { area: "Keywords", score: 84, note: "Missing: design tokens, WCAG, roadmap ownership." },
  { area: "Grammar", score: 93, note: "2 passive-voice sentences detected." },
  { area: "Achievements", score: 78, note: "4 of 9 bullets lack measurable outcomes." },
  { area: "Skills", score: 89, note: "Strong coverage. Consider grouping by category." },
];

export const resumeTemplates = [
  { id: "t1", name: "Aurora", tone: "Modern minimal", pro: false },
  { id: "t2", name: "Sterling", tone: "Executive serif", pro: false },
  { id: "t3", name: "Vector", tone: "Technical grid", pro: true },
  { id: "t4", name: "Northline", tone: "Editorial", pro: true },
  { id: "t5", name: "Compact", tone: "One-page dense", pro: true },
  { id: "t6", name: "Signal", tone: "Bold headings", pro: true },
];

export const portfolioThemes = [
  { id: "p1", name: "Monolith", tone: "Dark, typographic", pro: false },
  { id: "p2", name: "Lumen", tone: "Light, airy", pro: false },
  { id: "p3", name: "Prism", tone: "Gradient accents", pro: false },
  { id: "p4", name: "Studio", tone: "Case-study first", pro: true },
  { id: "p5", name: "Terminal", tone: "Mono developer", pro: true },
  { id: "p6", name: "Gallery", tone: "Image heavy", pro: true },
];

export const portfolioSectionCatalog = [
  "Hero", "About", "Skills", "Experience", "Education", "Projects", "Certificates",
  "Achievements", "Testimonials", "Blog", "Gallery", "Timeline", "Contact", "FAQ",
  "Services", "Pricing", "Clients", "Awards", "Publications", "Languages",
  "Statistics", "Volunteer", "Research",
] as const;

export const coachPrompts = [
  "Review my resume for a senior design role",
  "Build me a 90-day learning roadmap",
  "What interview questions should I expect at Stripe?",
  "Rewrite my portfolio hero to sound more senior",
  "How do I explain a 9-month career gap?",
];

export const coachThread = [
  {
    role: "assistant" as const,
    content:
      "Hi Ayesha — I reviewed your latest resume and portfolio. Your ATS score is strong at 91, but 4 of 9 experience bullets lack measurable outcomes. Want me to rewrite them with impact metrics?",
  },
  {
    role: "user" as const,
    content: "Yes, and tell me what skills I should learn next for senior design roles.",
  },
  {
    role: "assistant" as const,
    content:
      "Rewritten bullets are queued in your resume editor. For senior roles, prioritise: 1) design systems governance, 2) accessibility (WCAG 2.2) — your biggest gap at 55 vs market 80, 3) narrative case studies. A 6-week plan is in your roadmap.",
  },
];

export const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Start your professional identity today.",
    features: [
      "1 portfolio",
      "Up to 5 sections",
      "3 themes",
      "1 resume · 2 templates",
      "Basic ATS analysis",
      "Basic AI assistance",
      "5 job suggestions daily",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Spark",
    price: "$19",
    period: "per month",
    description: "Everything you need to get hired faster.",
    features: [
      "Unlimited portfolios & sections",
      "Unlimited AI generations",
      "Premium themes + custom domain",
      "Advanced ATS + LinkedIn optimizer",
      "Cover letters & interview prep",
      "AI career coach",
      "Analytics, SEO & blog",
      "Unlimited job recommendations",
    ],
    cta: "Upgrade to Spark",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "per seat",
    description: "For universities, bootcamps and recruiters.",
    features: [
      "White label & custom branding",
      "Organization management",
      "Bulk user provisioning + SSO",
      "Recruiter dashboard",
      "Candidate tracking",
      "API access",
      "Org-wide analytics",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

export const testimonials = [
  { name: "Daniel Okafor", role: "Frontend Engineer @ Shopify", quote: "I rebuilt my resume and portfolio in an evening. Three interviews the same week — the ATS panel alone was worth it.", initials: "DO" },
  { name: "Mira Chen", role: "Product Designer @ Figma", quote: "CareerOS felt like having a career coach on retainer. The skill-gap analysis told me exactly what to learn.", initials: "MC" },
  { name: "Tomás Rivera", role: "Data Analyst @ Spotify", quote: "The job match scoring is uncanny. I stopped mass-applying and started targeting roles I actually fit.", initials: "TR" },
  { name: "Priya Nair", role: "CS Graduate", quote: "As a new grad with no network, the hosted portfolio gave me something real to send recruiters.", initials: "PN" },
];

export const faqs = [
  { q: "Is CareerOS AI free to use?", a: "Yes. The Free plan includes one portfolio with five sections, one resume, basic ATS analysis and five daily job suggestions — no card required." },
  { q: "Will my resume actually pass ATS filters?", a: "Our ATS engine scores formatting, keywords, grammar, achievements and skills against the target job description, then shows the exact fixes that raise your score." },
  { q: "Can I host my portfolio on my own domain?", a: "Spark and Enterprise plans support custom domains with automatic SSL, SEO metadata and visitor analytics." },
  { q: "How does the AI Career Coach work?", a: "The coach reads your resume, portfolio and target roles, then gives grounded advice: rewrite suggestions, learning roadmaps and interview question drills." },
  { q: "Do you support teams and universities?", a: "Enterprise adds organization management, bulk provisioning, SSO, recruiter dashboards, candidate tracking and white labelling." },
  { q: "Can I export my documents?", a: "Export resumes to PDF instantly. DOCX export and portfolio source export are available on paid plans." },
];

export const adminUsers = [
  { name: "Daniel Okafor", email: "daniel@okafor.dev", plan: "Spark", status: "Active", joined: "Aug 2, 2026" },
  { name: "Mira Chen", email: "mira@chen.design", plan: "Spark", status: "Active", joined: "Jul 28, 2026" },
  { name: "Tomás Rivera", email: "tomas@rivera.io", plan: "Free", status: "Trialing", joined: "Jul 21, 2026" },
  { name: "Priya Nair", email: "priya.nair@uni.edu", plan: "Free", status: "Active", joined: "Jul 14, 2026" },
  { name: "Northwind University", email: "ops@northwind.edu", plan: "Enterprise", status: "Active", joined: "Jun 30, 2026" },
  { name: "Jonas Weber", email: "jonas@weber.co", plan: "Spark", status: "Past due", joined: "Jun 12, 2026" },
];

export const supportTickets = [
  { id: "T-2481", subject: "Custom domain not verifying", user: "Mira Chen", priority: "High", status: "Open" },
  { id: "T-2478", subject: "PDF export missing icons", user: "Daniel Okafor", priority: "Medium", status: "In progress" },
  { id: "T-2470", subject: "Billing invoice request", user: "Jonas Weber", priority: "Low", status: "Resolved" },
  { id: "T-2465", subject: "SSO metadata upload", user: "Northwind University", priority: "High", status: "In progress" },
];

export const aiUsage = [
  { label: "Mon", value: 1240 },
  { label: "Tue", value: 1810 },
  { label: "Wed", value: 2120 },
  { label: "Thu", value: 1960 },
  { label: "Fri", value: 2480 },
  { label: "Sat", value: 1120 },
  { label: "Sun", value: 940 },
];

export const invoices = [
  { id: "INV-10241", date: "Aug 1, 2026", amount: "$19.00", status: "Paid" },
  { id: "INV-10188", date: "Jul 1, 2026", amount: "$19.00", status: "Paid" },
  { id: "INV-10122", date: "Jun 1, 2026", amount: "$19.00", status: "Paid" },
  { id: "INV-10067", date: "May 1, 2026", amount: "$19.00", status: "Paid" },
];

export const resumeExperience = [
  {
    id: "e1",
    role: "Senior Product Designer",
    company: "Northwind Labs",
    period: "2023 — Present",
    bullets: [
      "Led redesign of the onboarding flow, lifting activation 34% in two quarters.",
      "Built and governed a 120-component design system adopted by 4 product teams.",
      "Partnered with engineering to ship an accessible (WCAG 2.2 AA) checkout.",
    ],
  },
  {
    id: "e2",
    role: "Product Designer",
    company: "Beacon Health",
    period: "2021 — 2023",
    bullets: [
      "Shipped a patient portal used by 90k monthly users.",
      "Ran 40+ usability sessions that reshaped the triage experience.",
    ],
  },
];
