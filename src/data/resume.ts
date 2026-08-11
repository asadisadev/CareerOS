/**
 * Resume Builder domain model + mock data.
 *
 * Everything in this file is frontend-only. All async helpers are shaped like
 * the future API surface (Promise-returning, cancellable inputs) so they can be
 * swapped for real endpoints (AI service / ATS engine / database) without
 * touching components.
 */

export type Plan = "free" | "spark" | "enterprise";

export type SectionKind =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "achievements"
  | "languages"
  | "volunteer"
  | "publications"
  | "awards"
  | "custom";

export interface SectionMeta {
  id: string;
  kind: SectionKind;
  title: string;
  visible: boolean;
  removable: boolean;
  /** Free-form description, used by custom sections. */
  description?: string;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photoUrl: string;
  twitter: string;
  behance: string;
  dribbble: string;
  otherLinks: { id: string; label: string; url: string }[];
}

export interface SummaryContent {
  summary: string;
  objective: string;
}

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Freelance";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
  description: string;
  coursework: string[];
}

export type SkillCategory =
  | "Technical Skills"
  | "Soft Skills"
  | "Tools"
  | "Languages"
  | "Frameworks"
  | "Databases"
  | "Cloud"
  | "Other";

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  description: string;
  technologies: string[];
  repoUrl: string;
  demoUrl: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  features: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expirationDate: string;
  credentialId: string;
  credentialUrl: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  metrics: string;
}

export type LanguageProficiency =
  | "Basic"
  | "Conversational"
  | "Professional"
  | "Fluent"
  | "Native";

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: LanguageProficiency;
}

export interface CustomBlock {
  id: string;
  heading: string;
  subheading: string;
  date: string;
  body: string;
}

export interface CustomSectionContent {
  description: string;
  blocks: CustomBlock[];
}

export interface ResumeStyle {
  templateId: string;
  fontFamily: "Inter Tight" | "Plus Jakarta Sans" | "Georgia" | "Times New Roman";
  fontSize: number;
  headingSize: number;
  lineHeight: number;
  margin: number;
  sectionSpacing: number;
  sectionStyle: "underline" | "bar" | "plain" | "boxed";
  dateStyle: "short" | "long" | "numeric";
  accent: string;
  layout: "single" | "sidebar";
  showPhoto: boolean;
  showIcons: boolean;
}

export interface ResumeContent {
  personal: PersonalInfo;
  summary: SummaryContent;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  languages: LanguageItem[];
  volunteer: ExperienceItem[];
  publications: CustomBlock[];
  awards: AchievementItem[];
  /** keyed by section id for custom sections */
  custom: Record<string, CustomSectionContent>;
}

export interface ResumeVersion {
  id: string;
  label: string;
  note: string;
  createdAt: string;
  atsScore: number;
}

export type ShareVisibility = "private" | "link" | "public";

export interface Resume {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
  sections: SectionMeta[];
  content: ResumeContent;
  style: ResumeStyle;
  versions: ResumeVersion[];
  share: { visibility: ShareVisibility; url: string };
}

export interface TemplateDef {
  id: string;
  name: string;
  description: string;
  tier: "free" | "spark";
  layout: ResumeStyle["layout"];
  accent: string;
  sectionStyle: ResumeStyle["sectionStyle"];
}

export const RESUME_TEMPLATES: TemplateDef[] = [
  {
    id: "minimal-ats",
    name: "Minimal ATS",
    description: "Single column, plain headings, maximum parser reliability.",
    tier: "free",
    layout: "single",
    accent: "#1f2937",
    sectionStyle: "underline",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Classic hierarchy with subtle rules between sections.",
    tier: "free",
    layout: "single",
    accent: "#334155",
    sectionStyle: "bar",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Balanced whitespace with an accent-tinted header.",
    tier: "spark",
    layout: "single",
    accent: "#4f46e5",
    sectionStyle: "bar",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Serif headings for senior leadership positioning.",
    tier: "spark",
    layout: "single",
    accent: "#0f172a",
    sectionStyle: "plain",
  },
  {
    id: "developer",
    name: "Developer",
    description: "Skill-forward sidebar tuned for engineering roles.",
    tier: "spark",
    layout: "sidebar",
    accent: "#0ea5e9",
    sectionStyle: "bar",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Expressive accents for design and brand roles.",
    tier: "spark",
    layout: "sidebar",
    accent: "#db2777",
    sectionStyle: "boxed",
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Airy type scale with restrained accent detail.",
    tier: "spark",
    layout: "single",
    accent: "#7c3aed",
    sectionStyle: "underline",
  },
  {
    id: "tech",
    name: "Tech",
    description: "Dense two-column layout for deep skill matrices.",
    tier: "spark",
    layout: "sidebar",
    accent: "#0d9488",
    sectionStyle: "bar",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Formal structure aligned to enterprise recruiters.",
    tier: "spark",
    layout: "single",
    accent: "#1d4ed8",
    sectionStyle: "boxed",
  },
  {
    id: "academic",
    name: "Academic",
    description: "Publication-first ordering for research profiles.",
    tier: "spark",
    layout: "single",
    accent: "#4338ca",
    sectionStyle: "plain",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Refined typography with a polished header band.",
    tier: "spark",
    layout: "single",
    accent: "#6d28d9",
    sectionStyle: "bar",
  },
];

export const SECTION_LIBRARY: { kind: SectionKind; title: string; icon: string; hint: string }[] = [
  { kind: "personal", title: "Personal Information", icon: "User", hint: "Contact and links" },
  { kind: "summary", title: "Professional Summary", icon: "AlignLeft", hint: "Positioning statement" },
  { kind: "experience", title: "Work Experience", icon: "Briefcase", hint: "Roles and impact" },
  { kind: "education", title: "Education", icon: "GraduationCap", hint: "Degrees and coursework" },
  { kind: "skills", title: "Skills", icon: "Wrench", hint: "Grouped capabilities" },
  { kind: "projects", title: "Projects", icon: "FolderGit2", hint: "Shipped work" },
  { kind: "certifications", title: "Certifications", icon: "BadgeCheck", hint: "Credentials" },
  { kind: "achievements", title: "Achievements", icon: "Trophy", hint: "Measurable wins" },
  { kind: "languages", title: "Languages", icon: "Languages", hint: "Proficiency levels" },
  { kind: "volunteer", title: "Volunteer Experience", icon: "HeartHandshake", hint: "Community work" },
  { kind: "publications", title: "Publications", icon: "BookOpen", hint: "Papers and articles" },
  { kind: "awards", title: "Awards", icon: "Medal", hint: "Recognition" },
  { kind: "custom", title: "Custom Section", icon: "Plus", hint: "Anything else" },
];

export const PLAN_FEATURES: Record<Plan, { label: string; resumeLimit: number; templates: "free" | "all" }> = {
  free: { label: "Free", resumeLimit: 1, templates: "free" },
  spark: { label: "Spark", resumeLimit: Infinity, templates: "all" },
  enterprise: { label: "Enterprise", resumeLimit: Infinity, templates: "all" },
};

export const SPARK_BENEFITS = [
  "Unlimited resumes and saved versions",
  "Advanced ATS analysis with keyword scoring",
  "Job-specific resume optimization",
  "AI achievement rewriting and cover letters",
  "All premium templates and DOCX export",
];

export const uid = () => Math.random().toString(36).slice(2, 10);

export function emptyPersonal(): PersonalInfo {
  return {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    photoUrl: "",
    twitter: "",
    behance: "",
    dribbble: "",
    otherLinks: [],
  };
}

export function defaultSections(): SectionMeta[] {
  return [
    { id: "personal", kind: "personal", title: "Personal Information", visible: true, removable: false },
    { id: "summary", kind: "summary", title: "Professional Summary", visible: true, removable: true },
    { id: "experience", kind: "experience", title: "Work Experience", visible: true, removable: true },
    { id: "education", kind: "education", title: "Education", visible: true, removable: true },
    { id: "skills", kind: "skills", title: "Skills", visible: true, removable: true },
    { id: "projects", kind: "projects", title: "Projects", visible: true, removable: true },
    { id: "certifications", kind: "certifications", title: "Certifications", visible: true, removable: true },
  ];
}

export function defaultStyle(): ResumeStyle {
  return {
    templateId: "minimal-ats",
    fontFamily: "Inter Tight",
    fontSize: 10.5,
    headingSize: 13,
    lineHeight: 1.45,
    margin: 44,
    sectionSpacing: 18,
    sectionStyle: "underline",
    dateStyle: "short",
    accent: "#1f2937",
    layout: "single",
    showPhoto: false,
    showIcons: true,
  };
}

export function emptyContent(): ResumeContent {
  return {
    personal: emptyPersonal(),
    summary: { summary: "", objective: "" },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
    volunteer: [],
    publications: [],
    awards: [],
    custom: {},
  };
}

export function createBlankResume(name = "Untitled Resume"): Resume {
  const now = new Date().toISOString();
  return {
    id: uid(),
    name,
    createdAt: now,
    updatedAt: now,
    sections: defaultSections(),
    content: emptyContent(),
    style: defaultStyle(),
    versions: [],
    share: { visibility: "private", url: "" },
  };
}

/* ------------------------------------------------------------------ */
/* Mock seed data                                                      */
/* ------------------------------------------------------------------ */

function seedResume(): Resume {
  return {
    id: "res_frontend",
    name: "Frontend Developer Resume",
    createdAt: "2026-07-28T09:12:00.000Z",
    updatedAt: "2026-08-10T16:04:00.000Z",
    sections: [
      ...defaultSections(),
      { id: "achievements", kind: "achievements", title: "Achievements", visible: true, removable: true },
      { id: "languages", kind: "languages", title: "Languages", visible: false, removable: true },
    ],
    style: { ...defaultStyle(), templateId: "professional", sectionStyle: "bar", accent: "#334155" },
    versions: [
      {
        id: "v1",
        label: "Version 1",
        note: "Initial draft imported from LinkedIn",
        createdAt: "2026-07-28T09:12:00.000Z",
        atsScore: 61,
      },
      {
        id: "v2",
        label: "Version 2",
        note: "Optimized for Frontend Developer at Northwind",
        createdAt: "2026-08-04T11:41:00.000Z",
        atsScore: 78,
      },
      {
        id: "v3",
        label: "Version 3",
        note: "Optimized for Full Stack Developer",
        createdAt: "2026-08-10T16:04:00.000Z",
        atsScore: 84,
      },
    ],
    share: { visibility: "private", url: "" },
    content: {
      personal: {
        ...emptyPersonal(),
        fullName: "Amara Chen",
        title: "Senior Frontend Engineer",
        email: "amara.chen@example.com",
        phone: "+1 (415) 555-0148",
        location: "San Francisco, CA",
        website: "amarachen.dev",
        linkedin: "linkedin.com/in/amarachen",
        github: "github.com/amarachen",
      },
      summary: {
        summary:
          "Senior frontend engineer with 7 years building accessible, high-performance product interfaces for B2B SaaS. Led a design-system migration used by 40+ engineers and cut median page load by 38%.",
        objective:
          "Seeking a senior product engineering role where design quality and performance are treated as product features.",
      },
      experience: [
        {
          id: uid(),
          role: "Senior Frontend Engineer",
          company: "Northwind Analytics",
          location: "San Francisco, CA",
          employmentType: "Full-time",
          startDate: "2023-02",
          endDate: "",
          current: true,
          description:
            "Own the customer-facing analytics workspace used by 12,000 weekly active users.",
          responsibilities: [
            "Lead frontend architecture for the analytics workspace across 4 squads",
            "Partner with design on a shared component library and review process",
          ],
          achievements: [
            "Cut median dashboard load time from 3.4s to 2.1s by code-splitting and query batching",
            "Migrated 180 legacy components to the design system, removing 24k lines of CSS",
          ],
        },
        {
          id: uid(),
          role: "Frontend Engineer",
          company: "Loophole Labs",
          location: "Remote",
          employmentType: "Full-time",
          startDate: "2020-06",
          endDate: "2023-01",
          current: false,
          description: "Built billing, onboarding and admin surfaces for a developer platform.",
          responsibilities: ["Shipped onboarding flow used by every new workspace"],
          achievements: [
            "Increased trial-to-paid conversion by 18% through a rebuilt onboarding checklist",
          ],
        },
      ],
      education: [
        {
          id: uid(),
          degree: "B.S. Computer Science",
          institution: "University of Washington",
          location: "Seattle, WA",
          startDate: "2015-09",
          endDate: "2019-06",
          grade: "3.8 GPA",
          description: "Focus on human-computer interaction and distributed systems.",
          coursework: ["Interaction Design", "Distributed Systems", "Algorithms"],
        },
      ],
      skills: [
        { id: uid(), name: "TypeScript", category: "Technical Skills", level: 5 },
        { id: uid(), name: "React", category: "Frameworks", level: 5 },
        { id: uid(), name: "Next.js", category: "Frameworks", level: 4 },
        { id: uid(), name: "Accessibility (WCAG)", category: "Technical Skills", level: 4 },
        { id: uid(), name: "Playwright", category: "Tools", level: 4 },
        { id: uid(), name: "PostgreSQL", category: "Databases", level: 3 },
        { id: uid(), name: "AWS", category: "Cloud", level: 3 },
        { id: uid(), name: "Mentoring", category: "Soft Skills", level: 4 },
      ],
      projects: [
        {
          id: uid(),
          name: "Prism UI",
          role: "Creator",
          description:
            "Open-source React component library with a token-driven theming layer and 98% a11y coverage.",
          technologies: ["React", "TypeScript", "Tailwind"],
          repoUrl: "github.com/amarachen/prism-ui",
          demoUrl: "prism-ui.dev",
          startDate: "2024-03",
          endDate: "",
          achievements: ["2.1k GitHub stars and 40+ external contributors"],
          features: ["Theme tokens", "Headless primitives"],
        },
      ],
      certifications: [
        {
          id: uid(),
          name: "AWS Certified Developer – Associate",
          organization: "Amazon Web Services",
          issueDate: "2024-05",
          expirationDate: "2027-05",
          credentialId: "AWS-DA-88213",
          credentialUrl: "aws.amazon.com/verification",
        },
      ],
      achievements: [
        {
          id: uid(),
          title: "Performance Guild Lead",
          organization: "Northwind Analytics",
          date: "2025-01",
          description: "Founded an internal guild that shipped a shared performance budget.",
          metrics: "38% median load-time reduction across 6 products",
        },
      ],
      languages: [
        { id: uid(), name: "English", proficiency: "Native" },
        { id: uid(), name: "Mandarin", proficiency: "Fluent" },
      ],
      volunteer: [],
      publications: [],
      awards: [],
      custom: {},
    },
  };
}

export const MOCK_RESUMES: Resume[] = [seedResume()];

export const CURRENT_PLAN: Plan = "free";

/* ------------------------------------------------------------------ */
/* Derived analysis (mock ATS engine)                                  */
/* ------------------------------------------------------------------ */

export interface AtsBreakdown {
  overall: number;
  keywords: number;
  formatting: number;
  skills: number;
  experience: number;
  education: number;
  readability: number;
  achievements: number;
  completeness: number;
}

export interface AtsRecommendation {
  id: string;
  title: string;
  severity: "critical" | "warning" | "good";
  why: string;
  how: string;
  sectionId: string;
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function sectionCompletion(resume: Resume, section: SectionMeta): number {
  const c = resume.content;
  switch (section.kind) {
    case "personal": {
      const p = c.personal;
      const required = [p.fullName, p.title, p.email, p.phone, p.location, p.linkedin];
      return clamp((required.filter(Boolean).length / required.length) * 100);
    }
    case "summary":
      return c.summary.summary.length > 320 ? 100 : clamp((c.summary.summary.length / 320) * 100);
    case "experience": {
      if (!c.experience.length) return 0;
      const scores = c.experience.map((e) => {
        const filled = [e.role, e.company, e.startDate, e.description].filter(Boolean).length / 4;
        const bullets = Math.min(e.achievements.length / 2, 1);
        return filled * 0.6 + bullets * 0.4;
      });
      return clamp((scores.reduce((a, b) => a + b, 0) / scores.length) * 100);
    }
    case "education":
      return c.education.length ? 100 : 0;
    case "skills":
      return clamp((Math.min(c.skills.length, 10) / 10) * 100);
    case "projects": {
      if (!c.projects.length) return 0;
      const scores = c.projects.map(
        (p) => [p.name, p.description, p.technologies.length ? "x" : "", p.achievements.length ? "x" : ""].filter(Boolean).length / 4,
      );
      return clamp((scores.reduce((a, b) => a + b, 0) / scores.length) * 100);
    }
    case "certifications":
      return c.certifications.length ? 100 : 0;
    case "achievements":
      return c.achievements.length ? 100 : 0;
    case "languages":
      return c.languages.length ? 100 : 0;
    case "volunteer":
      return c.volunteer.length ? 100 : 0;
    case "publications":
      return c.publications.length ? 100 : 0;
    case "awards":
      return c.awards.length ? 100 : 0;
    case "custom": {
      const custom = c.custom[section.id];
      return custom && custom.blocks.length ? 100 : 0;
    }
    default:
      return 0;
  }
}

const ACTION_VERBS = [
  "led",
  "built",
  "shipped",
  "designed",
  "migrated",
  "reduced",
  "increased",
  "launched",
  "owned",
  "improved",
  "cut",
  "scaled",
];

export function analyzeAts(resume: Resume): AtsBreakdown {
  const c = resume.content;
  const bullets = [
    ...c.experience.flatMap((e) => [...e.achievements, ...e.responsibilities]),
    ...c.projects.flatMap((p) => p.achievements),
  ];
  const measurable = bullets.filter((b) => /\d/.test(b)).length;
  const strongVerbs = bullets.filter((b) =>
    ACTION_VERBS.some((v) => b.toLowerCase().startsWith(v)),
  ).length;

  const keywords = clamp(30 + Math.min(c.skills.length, 12) * 4 + Math.min(bullets.length, 8) * 2.5);
  const formatting = clamp(
    100 -
      (resume.style.fontSize < 9.5 ? 12 : 0) -
      (resume.style.margin < 32 ? 10 : 0) -
      (resume.style.layout === "sidebar" ? 8 : 0) -
      (resume.style.showPhoto ? 10 : 0),
  );
  const skills = clamp((Math.min(c.skills.length, 14) / 14) * 100);
  const experience = clamp(sectionCompletion(resume, { id: "experience", kind: "experience", title: "", visible: true, removable: true }));
  const education = c.education.length ? 92 : 30;
  const readability = clamp(
    92 - Math.max(0, c.summary.summary.length - 520) / 6 - (bullets.some((b) => b.length > 220) ? 12 : 0),
  );
  const achievements = clamp((measurable / Math.max(bullets.length, 1)) * 100 * 0.7 + (strongVerbs ? 30 : 0));
  const visible = resume.sections.filter((s) => s.visible);
  const completeness = clamp(
    visible.reduce((sum, s) => sum + sectionCompletion(resume, s), 0) / Math.max(visible.length, 1),
  );

  const overall = clamp(
    keywords * 0.18 +
      formatting * 0.12 +
      skills * 0.14 +
      experience * 0.16 +
      education * 0.08 +
      readability * 0.1 +
      achievements * 0.12 +
      completeness * 0.1,
  );

  return {
    overall,
    keywords,
    formatting,
    skills,
    experience,
    education,
    readability,
    achievements,
    completeness,
  };
}

export function atsRecommendations(resume: Resume, ats: AtsBreakdown): AtsRecommendation[] {
  const c = resume.content;
  const bullets = c.experience.flatMap((e) => [...e.achievements, ...e.responsibilities]);
  const out: AtsRecommendation[] = [];

  if (ats.achievements < 65) {
    out.push({
      id: "measurable",
      title: "Add measurable achievements",
      severity: ats.achievements < 40 ? "critical" : "warning",
      why: "Recruiters and ranking models weight quantified outcomes far higher than duty lists.",
      how: "Add a number to at least two bullets per role — percent, time saved, revenue, or scale.",
      sectionId: "experience",
    });
  }
  if (ats.keywords < 70) {
    out.push({
      id: "keywords",
      title: "Improve keyword alignment",
      severity: "warning",
      why: "Most applicant tracking systems rank on term overlap with the job posting.",
      how: "Mirror exact tooling and role vocabulary from the target job description.",
      sectionId: "skills",
    });
  }
  if (c.summary.summary.length < 200) {
    out.push({
      id: "summary",
      title: "Strengthen your professional summary",
      severity: c.summary.summary.length ? "warning" : "critical",
      why: "The summary is the first parsed block and frames every bullet below it.",
      how: "Write 3 lines: seniority + domain, one signature result, and what you want next.",
      sectionId: "summary",
    });
  }
  if (c.skills.length < 10) {
    out.push({
      id: "skills",
      title: "Add relevant technical skills",
      severity: "warning",
      why: "Sparse skills sections fail keyword screens even with strong experience.",
      how: "List only tools you can defend in an interview, grouped by category.",
      sectionId: "skills",
    });
  }
  if (!bullets.some((b) => ACTION_VERBS.some((v) => b.toLowerCase().startsWith(v)))) {
    out.push({
      id: "verbs",
      title: "Use stronger action verbs",
      severity: "warning",
      why: "Passive phrasing hides ownership and reads as generic.",
      how: 'Start bullets with verbs like "Led", "Shipped", "Reduced" instead of "Worked on".',
      sectionId: "experience",
    });
  }
  if (ats.formatting < 90) {
    out.push({
      id: "formatting",
      title: "Reduce formatting that can break parsing",
      severity: "warning",
      why: "Photos, multi-column layouts and very small type can be dropped by parsers.",
      how: "Switch to a single-column layout, keep body text at 10pt or larger.",
      sectionId: "personal",
    });
  }
  if (!c.projects.length) {
    out.push({
      id: "projects",
      title: "Add at least one project",
      severity: "warning",
      why: "Projects provide keyword surface and proof of hands-on work.",
      how: "Add one shipped project with the stack and one measurable outcome.",
      sectionId: "projects",
    });
  }
  if (!out.length) {
    out.push({
      id: "healthy",
      title: "No blocking issues detected",
      severity: "good",
      why: "Your structure, keywords and achievements are all within recommended ranges.",
      how: "Re-run job-specific optimization before each application.",
      sectionId: "summary",
    });
  }
  return out;
}

export interface QualityWarning {
  id: string;
  label: string;
  tone: "critical" | "warning";
}

export function qualityWarnings(resume: Resume): QualityWarning[] {
  const c = resume.content;
  const out: QualityWarning[] = [];
  const bullets = c.experience.flatMap((e) => [...e.achievements, ...e.responsibilities]);
  if (!bullets.some((b) => /\d/.test(b)))
    out.push({ id: "no-metrics", label: "No measurable achievements", tone: "critical" });
  if (!c.personal.linkedin) out.push({ id: "no-linkedin", label: "Missing LinkedIn URL", tone: "warning" });
  if (!c.projects.length) out.push({ id: "no-projects", label: "No projects listed", tone: "warning" });
  if (c.summary.summary.length > 600)
    out.push({ id: "long-summary", label: "Summary is too long", tone: "warning" });
  if (c.skills.length < 6)
    out.push({ id: "thin-skills", label: "Skills section is incomplete", tone: "warning" });
  if (c.experience.length > 6)
    out.push({ id: "too-long", label: "Resume exceeds recommended length", tone: "warning" });
  if (resume.style.showPhoto || resume.style.layout === "sidebar")
    out.push({ id: "format", label: "Formatting may reduce ATS readability", tone: "warning" });
  return out;
}

export interface QualityScore {
  overall: number;
  categories: { label: string; value: number }[];
}

export function qualityScore(resume: Resume, ats: AtsBreakdown): QualityScore {
  const categories = [
    { label: "Content", value: ats.completeness },
    { label: "Structure", value: ats.formatting },
    { label: "ATS", value: ats.overall },
    { label: "Skills", value: ats.skills },
    { label: "Experience", value: ats.experience },
    { label: "Achievements", value: ats.achievements },
  ];
  const overall = clamp(categories.reduce((a, b) => a + b.value, 0) / categories.length);
  return { overall, categories };
}

export function scoreTone(value: number): "good" | "warning" | "critical" {
  if (value >= 80) return "good";
  if (value >= 60) return "warning";
  return "critical";
}

export function scoreLabel(value: number): string {
  const tone = scoreTone(value);
  return tone === "good" ? "Good" : tone === "warning" ? "Needs Improvement" : "Critical";
}

/* ------------------------------------------------------------------ */
/* Mock service layer (swap for real APIs later)                       */
/* ------------------------------------------------------------------ */

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export type AiAction =
  | "improve"
  | "generate"
  | "shorten"
  | "expand"
  | "professional"
  | "ats"
  | "achievement"
  | "bullet";

/**
 * Placeholder for the future AI Gateway call. Rewrites are deterministic and
 * only reshape text the user already provided — no invented experience.
 */
export async function mockAiRewrite(action: AiAction, input: string): Promise<string> {
  await delay(900);
  const base = input.trim().replace(/\.$/, "");
  if (!base) {
    return "Add a first draft in your own words — the assistant only reshapes information you provide.";
  }
  switch (action) {
    case "shorten":
      return base.split(/\s+/).slice(0, 22).join(" ") + ".";
    case "expand":
      return `${base}, with measurable outcomes, the tools involved, and the scope of the audience or team affected.`;
    case "professional":
      return base.charAt(0).toUpperCase() + base.slice(1) + ", delivered in collaboration with product and design partners.";
    case "ats":
      return `${base.charAt(0).toUpperCase()}${base.slice(1)} — using industry-standard terminology recruiters search for.`;
    case "achievement":
    case "bullet":
      return `Developed and optimized ${base.replace(/^(worked on|did|made)\s*/i, "")}, improving usability and performance for the teams that depend on it.`;
    case "generate":
    case "improve":
    default:
      return `${base.charAt(0).toUpperCase()}${base.slice(1)}, using a clear structure that highlights ownership, tools and the outcome delivered.`;
  }
}

export interface JobAnalysis {
  title: string;
  company: string;
  requiredSkills: string[];
  preferredSkills: string[];
  keywords: string[];
  experience: string;
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  missingKeywords: string[];
  recommendations: string[];
}

/** Mock JD parser + comparison. Replace with the real ATS engine later. */
export async function mockAnalyzeJob(resume: Resume, jd: string): Promise<JobAnalysis> {
  await delay(1200);
  const text = jd.toLowerCase();
  const dictionary = [
    "react",
    "typescript",
    "next.js",
    "graphql",
    "node.js",
    "testing",
    "accessibility",
    "design systems",
    "performance",
    "aws",
    "docker",
    "ci/cd",
    "postgresql",
    "figma",
  ];
  const found = dictionary.filter((k) => text.includes(k));
  const keywords = found.length ? found : dictionary.slice(0, 6);
  const owned = resume.content.skills.map((s) => s.name.toLowerCase());
  const matchingSkills = keywords.filter((k) => owned.some((o) => o.includes(k) || k.includes(o)));
  const missingSkills = keywords.filter((k) => !matchingSkills.includes(k));
  const firstLine = jd.trim().split("\n")[0] ?? "";
  return {
    title: firstLine.slice(0, 60) || "Frontend Developer",
    company: /at\s+([A-Z][\w& ]+)/.exec(jd)?.[1]?.trim() ?? "Target company",
    requiredSkills: keywords.slice(0, Math.ceil(keywords.length / 2)),
    preferredSkills: keywords.slice(Math.ceil(keywords.length / 2)),
    keywords,
    experience: /(\d+)\+?\s*years/.exec(text)?.[0] ?? "3+ years",
    matchScore: clamp(42 + (matchingSkills.length / Math.max(keywords.length, 1)) * 55),
    matchingSkills,
    missingSkills,
    missingKeywords: missingSkills.slice(0, 5),
    recommendations: [
      "Mirror the posting's exact job title in your professional summary.",
      `Work ${missingSkills.slice(0, 3).join(", ") || "the posting's core tooling"} into experience bullets where you genuinely used them.`,
      "Move the most relevant role's achievements to the top of that entry.",
    ],
  };
}

export interface ParsedImport {
  experience: number;
  education: number;
  skills: number;
  projects: number;
  certifications: number;
}

/** Mock resume parsing. Real implementation will call a parsing API. */
export async function mockParseResume(file: File): Promise<ParsedImport> {
  await delay(1600);
  if (!/\.(pdf|docx)$/i.test(file.name)) {
    throw new Error("Unsupported file type. Upload a PDF or DOCX file.");
  }
  return { experience: 3, education: 1, skills: 14, projects: 2, certifications: 1 };
}
