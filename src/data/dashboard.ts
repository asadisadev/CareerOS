export const profile = {
  name: "Ayesha Malik",
  firstName: "Ayesha",
  role: "Product Designer → Full Stack Developer",
  completion: 72,
};

export const dailyInsight = {
  title: "Improve your Resume skills section",
  body: "Your skills block is missing 6 high-signal keywords recruiters filter for. Adding them lifts your ATS score by an estimated 8%.",
  impact: "+8% ATS",
  time: "15 minutes",
  confidence: 92,
};

export type OverviewMetric = {
  label: string;
  value: number;
  suffix?: string;
  delta: number;
  hint: string;
  icon: string;
};

export const overviewMetrics: OverviewMetric[] = [
  { label: "Resume score", value: 86, suffix: "/100", delta: 6, hint: "2 bullets need metrics", icon: "FileText" },
  { label: "Portfolio score", value: 72, suffix: "/100", delta: 4, hint: "Add outcomes to 2 projects", icon: "LayoutTemplate" },
  { label: "ATS score", value: 91, suffix: "/100", delta: 9, hint: "Top 8% of designers", icon: "ShieldCheck" },
  { label: "Job matches", value: 24, delta: 12, hint: "6 above 90% fit", icon: "Briefcase" },
  { label: "Applications sent", value: 18, delta: 5, hint: "4 awaiting response", icon: "Send" },
  { label: "Recruiter views", value: 137, delta: 21, hint: "Peak on Tuesdays", icon: "Eye" },
  { label: "Interview invites", value: 5, delta: 2, hint: "1 scheduled this week", icon: "CalendarCheck" },
  { label: "Learning progress", value: 68, suffix: "%", delta: 8, hint: "Full-stack track", icon: "GraduationCap" },
];

export const timeline = [
  { title: "Resume updated", detail: "Senior Product Designer · v7 saved", time: "12m ago", tone: "info" as const, icon: "FileText" },
  { title: "Portfolio published", detail: "ayesha.careeros.site is live", time: "2h ago", tone: "success" as const, icon: "Globe" },
  { title: "ATS score improved", detail: "82 → 91 after keyword pass", time: "5h ago", tone: "success" as const, icon: "ShieldCheck" },
  { title: "Applied to React Developer", detail: "Linear · via CareerOS one-click", time: "Yesterday", tone: "info" as const, icon: "Send" },
  { title: "Interview scheduled", detail: "Vercel · Aug 13, 4:00 PM PKT", time: "Yesterday", tone: "warning" as const, icon: "CalendarCheck" },
  { title: "LinkedIn optimized", detail: "Headline + About rewritten", time: "2d ago", tone: "info" as const, icon: "Linkedin" },
];

export const coachPromptChips = [
  "Review my resume",
  "Improve portfolio",
  "Find jobs",
  "Practice interview",
  "Suggest projects",
  "Learning roadmap",
];

export type MatchJob = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  remote: boolean;
  match: number;
  reasons: string[];
};

export const matchJobs: MatchJob[] = [
  { id: "m1", title: "Senior Product Designer", company: "Vercel", logo: "V", location: "Remote · US", salary: "$150k – $190k", remote: true, match: 94, reasons: ["Design systems", "Next.js", "Portfolio"] },
  { id: "m2", title: "React Developer", company: "Linear", logo: "L", location: "Remote · Global", salary: "$140k – $175k", remote: true, match: 92, reasons: ["React", "Node", "Portfolio"] },
  { id: "m3", title: "Product Designer II", company: "Stripe", logo: "S", location: "Dublin, IE", salary: "€95k – €120k", remote: false, match: 87, reasons: ["Payments", "Research"] },
  { id: "m4", title: "Design Engineer", company: "Raycast", logo: "R", location: "Remote · EU", salary: "$130k – $165k", remote: true, match: 83, reasons: ["Tailwind", "A11y", "Motion"] },
];

export const skillGap = {
  current: [
    { skill: "Design systems", value: 88 },
    { skill: "React", value: 74 },
    { skill: "TypeScript", value: 69 },
  ],
  missing: [
    { skill: "Node.js APIs", value: 32 },
    { skill: "System design", value: 24 },
    { skill: "Accessibility (WCAG)", value: 55 },
  ],
  recommended: ["Postgres basics", "Testing with Vitest", "Design tokens governance"],
  learningTime: "6 weeks · ~5h / week",
};

export const portfolioAnalytics = {
  stats: [
    { label: "Portfolio views", value: 1284 },
    { label: "Unique visitors", value: 863 },
    { label: "Downloads", value: 214 },
    { label: "Contact requests", value: 37 },
    { label: "GitHub clicks", value: 152 },
    { label: "Resume downloads", value: 96 },
  ],
  series: [
    { label: "Mar", views: 180, visitors: 120 },
    { label: "Apr", views: 260, visitors: 175 },
    { label: "May", views: 320, visitors: 210 },
    { label: "Jun", views: 480, visitors: 315 },
    { label: "Jul", views: 620, visitors: 428 },
    { label: "Aug", views: 812, visitors: 561 },
  ],
};

export const resumeAnalytics = {
  stats: [
    { label: "Resume downloads", value: 96 },
    { label: "Resume versions", value: 7 },
    { label: "Keywords added", value: 42 },
  ],
  series: [
    { label: "W1", ats: 61, downloads: 4 },
    { label: "W2", ats: 68, downloads: 9 },
    { label: "W3", ats: 74, downloads: 12 },
    { label: "W4", ats: 82, downloads: 18 },
    { label: "W5", ats: 87, downloads: 24 },
    { label: "W6", ats: 91, downloads: 29 },
  ],
};

export const goal = {
  title: "Become a Full Stack Developer",
  progress: 68,
  deadline: "Dec 15, 2026",
  today: [
    { label: "Finish Node.js routing module", done: true },
    { label: "Rewrite 3 resume bullets with metrics", done: false },
    { label: "Apply to 2 matched roles", done: false },
  ],
  weekly: [
    { label: "Ship portfolio case study #3", done: false },
    { label: "Complete 2 mock interviews", done: false },
    { label: "Reach ATS 95", done: false },
  ],
};

export const upcomingEvents = [
  { kind: "Interview", title: "Vercel · Design Engineer loop", when: "Thu, Aug 13 · 4:00 PM", tone: "primary" as const, icon: "CalendarCheck" },
  { kind: "Deadline", title: "Stripe application closes", when: "Fri, Aug 14", tone: "destructive" as const, icon: "Clock" },
  { kind: "Learning", title: "Node.js API module due", when: "Sat, Aug 15", tone: "success" as const, icon: "GraduationCap" },
  { kind: "Reminder", title: "Follow up with Linear recruiter", when: "Mon, Aug 17", tone: "warning" as const, icon: "Bell" },
];

export const quickActions = [
  { label: "Generate resume", icon: "FileText", to: "/app/resume" as const },
  { label: "Create portfolio", icon: "LayoutTemplate", to: "/app/portfolio" as const },
  { label: "Improve ATS", icon: "ShieldCheck", to: "/app/ats" as const },
  { label: "Cover letter", icon: "PenLine", to: "/app/resume" as const },
  { label: "Practice interview", icon: "Mic", to: "/app/interview" as const },
  { label: "Ask AI", icon: "Sparkles", to: "/app/coach" as const },
];

export const achievements = [
  { label: "First resume", detail: "Created Aug 2", unlocked: true, icon: "FileText" },
  { label: "Portfolio published", detail: "Live on custom domain", unlocked: true, icon: "Globe" },
  { label: "100 ATS", detail: "9 points to go", unlocked: false, icon: "ShieldCheck" },
  { label: "First interview", detail: "Vercel loop booked", unlocked: true, icon: "CalendarCheck" },
  { label: "10 applications", detail: "18 sent", unlocked: true, icon: "Send" },
  { label: "Profile complete", detail: "72% · 3 steps left", unlocked: false, icon: "UserCheck" },
];

export const roadmap = [
  { track: "Frontend", progress: 82, next: "Advanced React patterns", icon: "MonitorSmartphone" },
  { track: "Backend", progress: 46, next: "Node + Postgres APIs", icon: "Server" },
  { track: "AI", progress: 38, next: "LLM app fundamentals", icon: "Bot" },
  { track: "System design", progress: 24, next: "Caching & queues", icon: "Network" },
  { track: "Communication", progress: 71, next: "Stakeholder storytelling", icon: "MessagesSquare" },
  { track: "Soft skills", progress: 64, next: "Negotiation basics", icon: "HeartHandshake" },
];

export const notifications = [
  { title: "New 94% job match", detail: "Vercel · Senior Product Designer", time: "8m", unread: true },
  { title: "ATS score improved", detail: "82 → 91 on your latest resume", time: "5h", unread: true },
  { title: "Recruiter viewed your portfolio", detail: "Stripe · Design hiring team", time: "1d", unread: false },
  { title: "Interview reminder", detail: "Vercel loop on Aug 13, 4:00 PM", time: "1d", unread: false },
];

export const messages = [
  { from: "Maya (Vercel recruiter)", preview: "Great portfolio — can we chat Thursday?", time: "2h", initials: "MV" },
  { from: "CareerOS Coach", preview: "Your rewritten bullets are ready to review.", time: "6h", initials: "AI" },
];
