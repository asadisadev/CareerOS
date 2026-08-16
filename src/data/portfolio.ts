/**
 * Portfolio Builder domain model + mock data.
 *
 * Everything here is frontend-only. Types are written so that the same shapes
 * can be returned by a real API later: swap the `MOCK_*` constants and the
 * `mock*` async helpers for network calls and nothing else has to change.
 */

import type { Plan } from "../data/resume";

export type { Plan };

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export type PortfolioSectionKind =
  | "hero"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "certificates"
  | "achievements"
  | "testimonials"
  | "services"
  | "blog"
  | "gallery"
  | "timeline"
  | "contact"
  | "faq"
  | "awards"
  | "publications"
  | "languages"
  | "statistics"
  | "volunteer"
  | "research"
  | "opensource"
  | "casestudies"
  | "clients"
  | "pricing"
  | "resume"
  | "videos"
  | "social"
  | "custom";

export interface SectionDef {
  kind: PortfolioSectionKind;
  title: string;
  icon: string;
  hint: string;
  spark?: boolean;
}

export const PORTFOLIO_SECTION_LIBRARY: SectionDef[] = [
  { kind: "hero", title: "Hero", icon: "Sparkles", hint: "Name, title and primary calls to action" },
  { kind: "about", title: "About", icon: "User", hint: "Your story, goals and interests" },
  { kind: "skills", title: "Skills", icon: "Wand2", hint: "Grouped skills with levels" },
  { kind: "projects", title: "Projects", icon: "FolderGit2", hint: "Showcase your best work" },
  { kind: "experience", title: "Experience", icon: "Briefcase", hint: "Roles, impact and stack" },
  { kind: "education", title: "Education", icon: "GraduationCap", hint: "Degrees and coursework" },
  { kind: "certificates", title: "Certificates", icon: "BadgeCheck", hint: "Credentials and IDs" },
  { kind: "achievements", title: "Achievements", icon: "Trophy", hint: "Measurable wins" },
  { kind: "testimonials", title: "Testimonials", icon: "Quote", hint: "Social proof from peers" },
  { kind: "services", title: "Services", icon: "Handshake", hint: "What you offer clients" },
  { kind: "blog", title: "Blog", icon: "PenLine", hint: "Articles and writing" },
  { kind: "gallery", title: "Gallery", icon: "Images", hint: "Visual work samples" },
  { kind: "timeline", title: "Timeline", icon: "GitCommitVertical", hint: "Career milestones" },
  { kind: "contact", title: "Contact", icon: "Mail", hint: "Email, socials and a form" },
  { kind: "faq", title: "FAQ", icon: "CircleHelp", hint: "Answer common questions", spark: true },
  { kind: "awards", title: "Awards", icon: "Medal", hint: "Recognition you received", spark: true },
  { kind: "publications", title: "Publications", icon: "BookOpen", hint: "Papers and articles", spark: true },
  { kind: "languages", title: "Languages", icon: "Languages", hint: "Spoken languages" },
  { kind: "statistics", title: "Statistics", icon: "BarChart3", hint: "Headline numbers", spark: true },
  { kind: "volunteer", title: "Volunteer", icon: "HeartHandshake", hint: "Community work", spark: true },
  { kind: "research", title: "Research", icon: "Microscope", hint: "Research work", spark: true },
  { kind: "opensource", title: "Open source", icon: "Github", hint: "Contributions and repos", spark: true },
  { kind: "casestudies", title: "Case studies", icon: "Layers", hint: "Deep dives into your work", spark: true },
  { kind: "clients", title: "Clients", icon: "Building2", hint: "Logos and companies", spark: true },
  { kind: "pricing", title: "Pricing", icon: "Tag", hint: "Packages and rates", spark: true },
  { kind: "resume", title: "Resume", icon: "FileText", hint: "Downloadable resume block" },
  { kind: "videos", title: "Videos", icon: "Video", hint: "Talks and demos", spark: true },
  { kind: "social", title: "Social links", icon: "Link2", hint: "All your profiles" },
  { kind: "custom", title: "Custom section", icon: "Blocks", hint: "Build your own with blocks", spark: true },
];

export interface PortfolioSection {
  id: string;
  kind: PortfolioSectionKind;
  title: string;
  visible: boolean;
  /** Only used by custom sections. */
  description?: string;
  blocks?: CustomBlock[];
}

export type CustomBlockType =
  | "text"
  | "image"
  | "button"
  | "link"
  | "video"
  | "cards"
  | "stats"
  | "list"
  | "quote";

export interface CustomBlock {
  id: string;
  type: CustomBlockType;
  title: string;
  value: string;
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface PortfolioProfile {
  fullName: string;
  professionalTitle: string;
  targetRole: string;
  shortDescription: string;
  photoUrl: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  socials: SocialLink[];
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  intro: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  showSocials: boolean;
}

export interface AboutContent {
  aboutMe: string;
  careerStory: string;
  goals: string;
  interests: string;
}

export type SkillGroupName =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "AI"
  | "Tools"
  | "Soft Skills"
  | "Languages";

export interface PortfolioSkill {
  id: string;
  name: string;
  group: SkillGroupName;
  level: number; // 0 - 100
  description: string;
}

export type SkillDisplayStyle = "bars" | "tags" | "cards" | "grid";

export interface CaseStudy {
  problem: string;
  research: string;
  solution: string;
  architecture: string;
  technology: string;
  implementation: string;
  challenges: string;
  results: string;
  lessons: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  role: string;
  githubUrl: string;
  liveUrl: string;
  images: string[];
  videoUrl: string;
  date: string;
  achievements: string[];
  featured: boolean;
  caseStudy?: CaseStudy;
}

export interface PortfolioExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface PortfolioEducation {
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

export interface PortfolioCertificate {
  id: string;
  name: string;
  organization: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
  imageUrl: string;
}

export interface PortfolioAchievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  metric: string;
}

export interface PortfolioTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  photoUrl: string;
  quote: string;
  linkedinUrl: string;
}

export interface PortfolioService {
  id: string;
  title: string;
  description: string;
  icon: string;
  startingPrice: string;
  cta: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  url: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  category: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  type: "education" | "experience" | "project" | "achievement" | "certificate";
}

export interface ContactContent {
  headline: string;
  message: string;
  email: string;
  showForm: boolean;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
}

export interface PortfolioContent {
  profile: PortfolioProfile;
  hero: HeroContent;
  about: AboutContent;
  skills: PortfolioSkill[];
  skillDisplay: SkillDisplayStyle;
  projects: PortfolioProject[];
  experience: PortfolioExperience[];
  education: PortfolioEducation[];
  certificates: PortfolioCertificate[];
  achievements: PortfolioAchievement[];
  testimonials: PortfolioTestimonial[];
  services: PortfolioService[];
  blog: BlogPost[];
  gallery: GalleryItem[];
  timeline: TimelineItem[];
  contact: ContactContent;
  statistics: StatItem[];
}

/* ------------------------------------------------------------------ */
/* Theme + styling                                                     */
/* ------------------------------------------------------------------ */

export type ThemeId =
  | "minimal"
  | "professional"
  | "developer"
  | "modern"
  | "creative"
  | "corporate"
  | "dark"
  | "glass"
  | "elegant"
  | "executive"
  | "editorial"
  | "gradient"
  | "tech";

export interface ThemeDef {
  id: ThemeId;
  name: string;
  tagline: string;
  spark: boolean;
  /** Preview swatches, also used as the theme's default palette. */
  palette: { primary: string; secondary: string; background: string; text: string };
  headingFont: string;
  bodyFont: string;
  heroLayout: HeroLayout;
  cardStyle: CardStyle;
  bestFor: string;
}

export type HeroLayout = "centered" | "split" | "stacked" | "minimal";
export type CardStyle = "soft" | "outline" | "elevated" | "glass";
export type ButtonStyle = "rounded" | "pill" | "square";
export type AnimationStyle = "none" | "subtle" | "modern" | "dynamic";
export type NavigationStyle = "top" | "floating" | "sidebar" | "none";

export interface PortfolioStyle {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  borderRadius: number;
  spacing: number;
  buttonStyle: ButtonStyle;
  animation: AnimationStyle;
  navigation: NavigationStyle;
  heroLayout: HeroLayout;
  cardStyle: CardStyle;
}

export const PORTFOLIO_THEMES: ThemeDef[] = [
  {
    id: "minimal",
    name: "Minimal",
    tagline: "Whitespace-first, content forward",
    spark: false,
    palette: { primary: "#111827", secondary: "#6b7280", background: "#ffffff", text: "#111827" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "centered",
    cardStyle: "outline",
    bestFor: "Product, design and generalist roles",
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Clean, hiring-manager friendly",
    spark: false,
    palette: { primary: "#1d4ed8", secondary: "#0f172a", background: "#f8fafc", text: "#0f172a" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "split",
    cardStyle: "soft",
    bestFor: "Corporate and enterprise applications",
  },
  {
    id: "developer",
    name: "Developer",
    tagline: "Mono accents, repo-style cards",
    spark: false,
    palette: { primary: "#22c55e", secondary: "#0b1120", background: "#0b1120", text: "#e2e8f0" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "stacked",
    cardStyle: "outline",
    bestFor: "Engineers and open-source maintainers",
  },
  {
    id: "modern",
    name: "Modern",
    tagline: "Bold type with generous spacing",
    spark: true,
    palette: { primary: "#6366f1", secondary: "#0f172a", background: "#ffffff", text: "#0f172a" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "split",
    cardStyle: "elevated",
    bestFor: "Startup and growth roles",
  },
  {
    id: "creative",
    name: "Creative",
    tagline: "Playful accents and asymmetry",
    spark: true,
    palette: { primary: "#f97316", secondary: "#7c3aed", background: "#fffbf5", text: "#1c1917" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "stacked",
    cardStyle: "soft",
    bestFor: "Designers, artists and creators",
  },
  {
    id: "corporate",
    name: "Corporate",
    tagline: "Structured, conservative, trusted",
    spark: true,
    palette: { primary: "#0f766e", secondary: "#134e4a", background: "#f6f8f8", text: "#0f172a" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "split",
    cardStyle: "outline",
    bestFor: "Consulting and finance",
  },
  {
    id: "dark",
    name: "Dark",
    tagline: "High contrast night mode",
    spark: true,
    palette: { primary: "#38bdf8", secondary: "#1e293b", background: "#0b0f1a", text: "#e5eaf5" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "centered",
    cardStyle: "elevated",
    bestFor: "Technical and product portfolios",
  },
  {
    id: "glass",
    name: "Glass",
    tagline: "Frosted layers and depth",
    spark: true,
    palette: { primary: "#a855f7", secondary: "#1e1b4b", background: "#101326", text: "#ede9fe" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "centered",
    cardStyle: "glass",
    bestFor: "Modern product and AI work",
  },
  {
    id: "elegant",
    name: "Elegant",
    tagline: "Refined serif-inspired rhythm",
    spark: true,
    palette: { primary: "#9d174d", secondary: "#4c0519", background: "#fffafc", text: "#1f1114" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "centered",
    cardStyle: "soft",
    bestFor: "Writers, brand and marketing",
  },
  {
    id: "executive",
    name: "Executive",
    tagline: "Leadership-grade presentation",
    spark: true,
    palette: { primary: "#1e3a8a", secondary: "#111827", background: "#ffffff", text: "#111827" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "split",
    cardStyle: "outline",
    bestFor: "Directors, VPs and founders",
  },
  {
    id: "editorial",
    name: "Editorial",
    tagline: "Magazine columns and pull quotes",
    spark: true,
    palette: { primary: "#b45309", secondary: "#292524", background: "#fdfcf9", text: "#1c1917" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "minimal",
    cardStyle: "outline",
    bestFor: "Content, research and publications",
  },
  {
    id: "gradient",
    name: "Gradient",
    tagline: "Vibrant gradient hero and cards",
    spark: true,
    palette: { primary: "#ec4899", secondary: "#6366f1", background: "#0d0b1f", text: "#f5f3ff" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "centered",
    cardStyle: "glass",
    bestFor: "Personal brands and creators",
  },
  {
    id: "tech",
    name: "Tech",
    tagline: "Grid systems and terminal accents",
    spark: true,
    palette: { primary: "#06b6d4", secondary: "#0f172a", background: "#08111c", text: "#dbeafe" },
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter Tight",
    heroLayout: "stacked",
    cardStyle: "outline",
    bestFor: "Infrastructure, data and AI engineers",
  },
];

export const FREE_THEME_IDS: ThemeId[] = ["minimal", "professional", "developer"];

export const FREE_SECTION_LIMIT = 5;

export const PORTFOLIO_SPARK_BENEFITS = [
  "Unlimited sections and custom sections",
  "All 13 premium themes and layouts",
  "Custom domain + branding",
  "Advanced analytics and traffic sources",
  "AI content tools and case studies",
  "Advanced SEO and social previews",
];

export const FONT_OPTIONS = [
  "Plus Jakarta Sans",
  "Inter Tight",
  "system-ui",
  "Georgia",
  "IBM Plex Mono",
];

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

export type PublishStatus = "draft" | "published" | "unpublished" | "pending";

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  favicon: string;
  canonicalUrl: string;
  indexable: boolean;
}

export interface DomainSettings {
  /** Free plan: `careeros.ai/<slug>`. Spark: `<slug>.careeros.ai` or custom. */
  slug: string;
  mode: "path" | "subdomain" | "custom";
  customDomain: string;
  domainStatus: "none" | "pending" | "verified" | "failed";
}

export interface PortfolioSettings {
  visibility: "public" | "private";
  contactForm: boolean;
  showResumeDownload: boolean;
  analytics: boolean;
}

export interface Portfolio {
  id: string;
  name: string;
  themeId: ThemeId;
  status: PublishStatus;
  sections: PortfolioSection[];
  content: PortfolioContent;
  style: PortfolioStyle;
  seo: SeoSettings;
  domain: DomainSettings;
  settings: PortfolioSettings;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export function themeById(id: ThemeId): ThemeDef {
  return PORTFOLIO_THEMES.find((t) => t.id === id) ?? PORTFOLIO_THEMES[0]!;
}

export function styleFromTheme(id: ThemeId): PortfolioStyle {
  const theme = themeById(id);
  return {
    primaryColor: theme.palette.primary,
    secondaryColor: theme.palette.secondary,
    backgroundColor: theme.palette.background,
    textColor: theme.palette.text,
    headingFont: theme.headingFont,
    bodyFont: theme.bodyFont,
    borderRadius: 16,
    spacing: 3,
    buttonStyle: "pill",
    animation: "subtle",
    navigation: "top",
    heroLayout: theme.heroLayout,
    cardStyle: theme.cardStyle,
  };
}

export function emptyProfile(): PortfolioProfile {
  return {
    fullName: "",
    professionalTitle: "",
    targetRole: "",
    shortDescription: "",
    photoUrl: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
    socials: [],
  };
}

export function emptyContent(): PortfolioContent {
  return {
    profile: emptyProfile(),
    hero: {
      headline: "",
      subheadline: "",
      intro: "",
      primaryCta: "View my work",
      primaryCtaHref: "#projects",
      secondaryCta: "Download resume",
      secondaryCtaHref: "#resume",
      showSocials: true,
    },
    about: { aboutMe: "", careerStory: "", goals: "", interests: "" },
    skills: [],
    skillDisplay: "bars",
    projects: [],
    experience: [],
    education: [],
    certificates: [],
    achievements: [],
    testimonials: [],
    services: [],
    blog: [],
    gallery: [],
    timeline: [],
    contact: { headline: "Let's work together", message: "", email: "", showForm: true },
    statistics: [],
  };
}

export function defaultSections(): PortfolioSection[] {
  const kinds: PortfolioSectionKind[] = ["hero", "about", "skills", "projects", "contact"];
  return kinds.map((kind) => ({
    id: uid(),
    kind,
    title: PORTFOLIO_SECTION_LIBRARY.find((s) => s.kind === kind)?.title ?? kind,
    visible: true,
  }));
}

export function createBlankPortfolio(name = "Untitled portfolio"): Portfolio {
  const now = new Date().toISOString();
  return {
    id: uid(),
    name,
    themeId: "minimal",
    status: "draft",
    sections: defaultSections(),
    content: emptyContent(),
    style: styleFromTheme("minimal"),
    seo: {
      title: "",
      description: "",
      keywords: [],
      ogImage: "",
      favicon: "",
      canonicalUrl: "",
      indexable: true,
    },
    domain: { slug: "", mode: "path", customDomain: "", domainStatus: "none" },
    settings: { visibility: "public", contactForm: true, showResumeDownload: true, analytics: true },
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
  };
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function portfolioUrl(portfolio: Portfolio): string {
  const slug = portfolio.domain.slug || slugify(portfolio.name) || "your-name";
  if (portfolio.domain.mode === "custom" && portfolio.domain.customDomain) {
    return portfolio.domain.customDomain;
  }
  if (portfolio.domain.mode === "subdomain") return `${slug}.careeros.ai`;
  return `careeros.ai/${slug}`;
}

/* ------------------------------------------------------------------ */
/* Seed data                                                           */
/* ------------------------------------------------------------------ */

function seedPortfolio(): Portfolio {
  const base = createBlankPortfolio("Developer portfolio");
  const content: PortfolioContent = {
    ...emptyContent(),
    profile: {
      fullName: "john",
      professionalTitle: "Senior Frontend Engineer",
      targetRole: "Staff Frontend Engineer",
      shortDescription:
        "I build fast, accessible product interfaces for data-heavy SaaS teams.",
      photoUrl: "",
      location: "Karachi, Pakistan",
      email: "john@careeros.ai",
      phone: "+92 300 1234567",
      website: "https://john.dev",
      linkedin: "https://linkedin.com/in/john",
      github: "https://github.com/john",
      socials: [{ id: uid(), label: "X", url: "https://x.com/johnbuilds" }],
    },
    hero: {
      headline: "Hi, I'm John.",
      subheadline: "Senior Frontend Engineer building modern web applications.",
      intro:
        "Seven years shipping design systems, dashboards and real-time products used by 200k+ people.",
      primaryCta: "View my work",
      primaryCtaHref: "#projects",
      secondaryCta: "Download resume",
      secondaryCtaHref: "#resume",
      showSocials: true,
    },
    about: {
      aboutMe:
        "I'm a frontend engineer focused on performance, accessibility and design systems. I like turning fuzzy product ideas into interfaces that feel obvious.",
      careerStory:
        "I started as a self-taught developer building small business sites, joined a fintech startup as its second frontend hire, and now lead UI architecture for a data platform.",
      goals:
        "Move into staff-level work where I can shape frontend architecture across multiple product teams.",
      interests: "Design systems, WebGL experiments, cricket, and long-form technical writing.",
    },
    skills: [
      { id: uid(), name: "React", group: "Frontend", level: 92, description: "Hooks, RSC, performance profiling" },
      { id: uid(), name: "TypeScript", group: "Frontend", level: 90, description: "Strict types, generics, DX tooling" },
      { id: uid(), name: "Next.js", group: "Frontend", level: 84, description: "SSR, routing, caching" },
      { id: uid(), name: "Node.js", group: "Backend", level: 74, description: "APIs and BFF layers" },
      { id: uid(), name: "PostgreSQL", group: "Database", level: 66, description: "Schema design and queries" },
      { id: uid(), name: "Docker", group: "DevOps", level: 62, description: "Local envs and CI images" },
      { id: uid(), name: "Design systems", group: "Tools", level: 88, description: "Tokens, theming, documentation" },
      { id: uid(), name: "Mentoring", group: "Soft Skills", level: 80, description: "Coaching juniors and reviews" },
    ],
    skillDisplay: "bars",
    projects: [
      {
        id: uid(),
        name: "Atlas Analytics",
        description:
          "A real-time analytics workspace with sub-second dashboards over billions of events.",
        problem: "Analysts waited 20+ seconds for dashboards to load, so they exported to spreadsheets instead.",
        solution: "Streamed pre-aggregated slices to the client and virtualised the chart grid.",
        technologies: ["React", "TypeScript", "WebSockets", "D3"],
        features: ["Live query streaming", "Saved views", "Shareable dashboards"],
        role: "Frontend lead",
        githubUrl: "https://github.com/john/atlas",
        liveUrl: "https://atlas.example.com",
        images: [],
        videoUrl: "",
        date: "2025-03",
        achievements: ["Cut dashboard load time from 21s to 0.8s", "Adoption up 3x in one quarter"],
        featured: true,
      },
      {
        id: uid(),
        name: "Pulse Design System",
        description: "A themeable component library adopted by six product teams.",
        problem: "Every team shipped its own buttons, modals and tokens.",
        solution: "Built a token-driven library with automated visual regression tests.",
        technologies: ["React", "Tailwind CSS", "Storybook"],
        features: ["Dark mode", "Token pipeline", "A11y test suite"],
        role: "Creator and maintainer",
        githubUrl: "https://github.com/john/pulse",
        liveUrl: "",
        images: [],
        videoUrl: "",
        date: "2024-08",
        achievements: ["Reduced UI bug reports by 41%"],
        featured: true,
      },
    ],
    experience: [
      {
        id: uid(),
        title: "Senior Frontend Engineer",
        company: "Northwind Data",
        location: "Remote",
        employmentType: "Full-time",
        startDate: "2023-01",
        endDate: "",
        current: true,
        description: "Lead frontend architecture for the analytics platform.",
        achievements: [
          "Rebuilt the dashboard renderer, cutting p95 render time by 62%",
          "Grew the design system to 74 components across 6 teams",
        ],
        technologies: ["React", "TypeScript", "Vite"],
      },
      {
        id: uid(),
        title: "Frontend Engineer",
        company: "Paylane",
        location: "Karachi, PK",
        employmentType: "Full-time",
        startDate: "2020-04",
        endDate: "2022-12",
        current: false,
        description: "Second frontend hire on a payments product.",
        achievements: ["Shipped the merchant onboarding flow used by 12k businesses"],
        technologies: ["React", "Redux", "Node.js"],
      },
    ],
    education: [
      {
        id: uid(),
        degree: "BS Computer Science",
        institution: "NED University",
        location: "Karachi, PK",
        startDate: "2015-09",
        endDate: "2019-06",
        grade: "3.6 GPA",
        description: "Focused on human-computer interaction and distributed systems.",
        coursework: ["Algorithms", "HCI", "Databases"],
      },
    ],
    certificates: [
      {
        id: uid(),
        name: "AWS Certified Developer — Associate",
        organization: "Amazon Web Services",
        date: "2024-05",
        credentialId: "AWS-DEV-88213",
        credentialUrl: "https://aws.amazon.com/verification",
        imageUrl: "",
      },
    ],
    achievements: [
      {
        id: uid(),
        title: "Speaker, JSConf Asia",
        organization: "JSConf",
        date: "2025-02",
        description: "Talk on rendering a million rows without dropping frames.",
        metric: "620 attendees",
      },
    ],
    testimonials: [
      {
        id: uid(),
        name: "Marta Lind",
        role: "Director of Engineering",
        company: "Northwind Data",
        photoUrl: "",
        quote:
          "john raised the bar for frontend quality across the whole org. He turns vague product goals into shippable, accessible interfaces.",
        linkedinUrl: "https://linkedin.com/in/martalind",
      },
    ],
    services: [
      {
        id: uid(),
        title: "Frontend architecture review",
        description: "A two-week audit of your React codebase with a prioritised action plan.",
        icon: "Layers",
        startingPrice: "$2,400",
        cta: "Book a review",
      },
      {
        id: uid(),
        title: "Design system build",
        description: "Token pipeline, component library and documentation for your product team.",
        icon: "Wand2",
        startingPrice: "$6,000",
        cta: "Start a project",
      },
    ],
    blog: [
      {
        id: uid(),
        title: "Rendering a million rows without dropping frames",
        excerpt: "How we combined windowing, worker-side aggregation and CSS containment.",
        date: "2025-04-12",
        category: "Performance",
        url: "#",
      },
      {
        id: uid(),
        title: "Design tokens that survive a rebrand",
        excerpt: "A practical token taxonomy for teams shipping in two themes.",
        date: "2025-01-28",
        category: "Design systems",
        url: "#",
      },
    ],
    gallery: [],
    timeline: [
      { id: uid(), title: "Senior Frontend Engineer", subtitle: "Northwind Data", date: "2023", type: "experience" },
      { id: uid(), title: "Pulse Design System", subtitle: "Open sourced", date: "2024", type: "project" },
      { id: uid(), title: "AWS Developer Associate", subtitle: "Amazon Web Services", date: "2024", type: "certificate" },
      { id: uid(), title: "Speaker, JSConf Asia", subtitle: "JSConf", date: "2025", type: "achievement" },
    ],
    contact: {
      headline: "Let's build something together",
      message: "I'm open to staff-level frontend roles and short consulting engagements.",
      email: "john@careeros.ai",
      showForm: true,
    },
    statistics: [
      { id: uid(), label: "Years of experience", value: "7" },
      { id: uid(), label: "Products shipped", value: "14" },
      { id: uid(), label: "Engineers mentored", value: "9" },
    ],
  };

  return {
    ...base,
    id: "pf-developer",
    name: "Developer portfolio",
    themeId: "developer",
    status: "published",
    style: styleFromTheme("developer"),
    sections: [
      ...defaultSections().slice(0, 4),
      { id: uid(), kind: "experience", title: "Experience", visible: true },
      { id: uid(), kind: "testimonials", title: "Testimonials", visible: true },
      { id: uid(), kind: "contact", title: "Contact", visible: true },
    ],
    content,
    seo: {
      title: "John — Senior Frontend Engineer",
      description:
        "Portfolio of John, a senior frontend engineer building fast, accessible product interfaces.",
      keywords: ["frontend engineer", "react", "typescript", "design systems"],
      ogImage: "",
      favicon: "",
      canonicalUrl: "https://careeros.ai/John",
      indexable: true,
    },
    domain: { slug: "john", mode: "path", customDomain: "", domainStatus: "none" },
    createdAt: "2025-11-02T10:00:00.000Z",
    updatedAt: "2026-08-02T08:20:00.000Z",
    publishedAt: "2026-01-14T09:00:00.000Z",
  };
}

function seedDraft(): Portfolio {
  const base = createBlankPortfolio("Freelance portfolio");
  const seeded = seedPortfolio();
  return {
    ...base,
    id: "pf-freelance",
    name: "Freelance portfolio",
    themeId: "minimal",
    status: "draft",
    style: styleFromTheme("minimal"),
    content: {
      ...seeded.content,
      projects: seeded.content.projects.slice(0, 1),
      testimonials: [],
      experience: [],
    },
    sections: defaultSections(),
    domain: { slug: "john-freelance", mode: "path", customDomain: "", domainStatus: "none" },
    createdAt: "2026-05-18T12:00:00.000Z",
    updatedAt: "2026-07-30T15:42:00.000Z",
  };
}

export const MOCK_PORTFOLIOS: Portfolio[] = [seedPortfolio(), seedDraft()];

/* ------------------------------------------------------------------ */
/* Quality score                                                       */
/* ------------------------------------------------------------------ */

export interface QualityCategory {
  label: string;
  value: number;
}

export interface PortfolioQuality {
  overall: number;
  categories: QualityCategory[];
  recommendations: string[];
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function portfolioQuality(portfolio: Portfolio): PortfolioQuality {
  const c = portfolio.content;
  const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

  const content = clamp(
    (words(c.about.aboutMe) > 40 ? 40 : words(c.about.aboutMe)) +
      (c.hero.headline ? 20 : 0) +
      (c.hero.intro ? 20 : 0) +
      (c.about.careerStory ? 20 : 0),
  );
  const completeness = clamp(
    (portfolio.sections.filter((s) => s.visible).length / 7) * 100,
  );
  const design = clamp(60 + (portfolio.themeId !== "minimal" ? 20 : 10) + (portfolio.style.animation !== "none" ? 15 : 0));
  const projects = clamp(c.projects.length * 28 + (c.projects.some((p) => p.achievements.length) ? 20 : 0));
  const branding = clamp(
    (c.profile.photoUrl ? 25 : 0) +
      (c.profile.professionalTitle ? 25 : 0) +
      (c.profile.linkedin ? 25 : 0) +
      (c.profile.github ? 25 : 0),
  );
  const seo = clamp(
    (portfolio.seo.title ? 30 : 0) +
      (portfolio.seo.description ? 30 : 0) +
      (portfolio.seo.keywords.length ? 20 : 0) +
      (portfolio.seo.ogImage ? 20 : 0),
  );
  const mobile = clamp(78 + (portfolio.style.spacing >= 3 ? 12 : 0));
  const contact = clamp((c.profile.email ? 50 : 0) + (c.contact.showForm ? 30 : 0) + (c.profile.location ? 20 : 0));

  const categories: QualityCategory[] = [
    { label: "Content", value: content },
    { label: "Completeness", value: completeness },
    { label: "Design", value: design },
    { label: "Projects", value: projects },
    { label: "Branding", value: branding },
    { label: "SEO", value: seo },
    { label: "Mobile", value: mobile },
    { label: "Contact", value: contact },
  ];

  const overall = clamp(categories.reduce((sum, k) => sum + k.value, 0) / categories.length);

  const recommendations: string[] = [];
  if (c.projects.length < 3) recommendations.push(`Add ${3 - c.projects.length} more project${c.projects.length === 2 ? "" : "s"}.`);
  if (!c.projects.some((p) => p.achievements.length)) recommendations.push("Add measurable results to your projects.");
  if (!c.profile.linkedin) recommendations.push("Add your LinkedIn profile.");
  if (words(c.about.aboutMe) < 60) recommendations.push("Expand your About section to at least 60 words.");
  if (!c.projects.some((p) => p.images.length)) recommendations.push("Add project screenshots.");
  if (!portfolio.seo.description) recommendations.push("Write an SEO meta description.");
  if (!c.profile.photoUrl) recommendations.push("Upload a professional profile photo.");

  return { overall, categories, recommendations };
}

export interface ChecklistItem {
  label: string;
  done: boolean;
}

export function publishChecklist(portfolio: Portfolio): ChecklistItem[] {
  const c = portfolio.content;
  return [
    { label: "Profile image", done: Boolean(c.profile.photoUrl) },
    { label: "Professional title", done: Boolean(c.profile.professionalTitle) },
    { label: "About", done: c.about.aboutMe.trim().length > 40 },
    { label: "Skills", done: c.skills.length >= 4 },
    { label: "Projects", done: c.projects.length >= 2 },
    { label: "Experience", done: c.experience.length >= 1 },
    { label: "Contact", done: Boolean(c.profile.email) },
    { label: "Social links", done: Boolean(c.profile.linkedin || c.profile.github) },
    { label: "SEO", done: Boolean(portfolio.seo.title && portfolio.seo.description) },
    { label: "Mobile preview", done: true },
  ];
}

/* ------------------------------------------------------------------ */
/* Analytics (mock)                                                    */
/* ------------------------------------------------------------------ */

export interface PortfolioAnalytics {
  totalViews: number;
  uniqueVisitors: number;
  resumeDownloads: number;
  githubClicks: number;
  linkedinClicks: number;
  contactSubmissions: number;
  avgDurationSeconds: number;
  series: { date: string; views: number; visitors: number }[];
  topSections: { section: string; views: number }[];
  sources: { source: string; visits: number }[];
  devices: { device: string; share: number }[];
  countries: { country: string; visits: number }[];
}

export const MOCK_ANALYTICS: PortfolioAnalytics = {
  totalViews: 4218,
  uniqueVisitors: 2874,
  resumeDownloads: 316,
  githubClicks: 482,
  linkedinClicks: 359,
  contactSubmissions: 41,
  avgDurationSeconds: 168,
  series: [
    { date: "Jul 07", views: 208, visitors: 141 },
    { date: "Jul 14", views: 264, visitors: 183 },
    { date: "Jul 21", views: 312, visitors: 214 },
    { date: "Jul 28", views: 289, visitors: 197 },
    { date: "Aug 04", views: 402, visitors: 271 },
    { date: "Aug 11", views: 468, visitors: 318 },
  ],
  topSections: [
    { section: "Projects", views: 1840 },
    { section: "Hero", views: 1612 },
    { section: "Experience", views: 1104 },
    { section: "About", views: 902 },
    { section: "Contact", views: 618 },
  ],
  sources: [
    { source: "LinkedIn", visits: 1284 },
    { source: "Direct", visits: 942 },
    { source: "Google", visits: 733 },
    { source: "GitHub", visits: 411 },
    { source: "X", visits: 186 },
  ],
  devices: [
    { device: "Desktop", share: 58 },
    { device: "Mobile", share: 34 },
    { device: "Tablet", share: 8 },
  ],
  countries: [
    { country: "United States", visits: 1102 },
    { country: "Pakistan", visits: 684 },
    { country: "Germany", visits: 421 },
    { country: "United Kingdom", visits: 366 },
    { country: "Canada", visits: 249 },
  ],
};

/* ------------------------------------------------------------------ */
/* Mock AI service                                                     */
/* ------------------------------------------------------------------ */

export type PortfolioAiAction =
  | "improve"
  | "generate"
  | "professional"
  | "concise"
  | "engaging"
  | "recruiter"
  | "case-study"
  | "grammar";

export const AI_ACTIONS: { id: PortfolioAiAction; label: string }[] = [
  { id: "improve", label: "Improve with AI" },
  { id: "professional", label: "Make professional" },
  { id: "concise", label: "Make concise" },
  { id: "engaging", label: "Make more engaging" },
  { id: "recruiter", label: "Make recruiter friendly" },
  { id: "grammar", label: "Fix grammar" },
];

/**
 * Mock rewriter. It only restructures text the user already wrote — it never
 * fabricates companies, metrics, skills or credentials.
 */
export async function mockAiRewrite(action: PortfolioAiAction, input: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 900));
  const text = input.trim();
  if (!text) {
    return "Add a first draft — even a few rough words — and the assistant will structure it for you. It never invents experience, employers or numbers.";
  }
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  switch (action) {
    case "concise":
      return sentences.slice(0, 2).join(" ");
    case "professional":
      return `${sentences.join(" ")} I focus on clear outcomes and dependable delivery.`.replace(/\s+/g, " ");
    case "engaging":
      return `${sentences[0] ?? text} Here's what that looks like in practice: ${sentences.slice(1).join(" ") || "the work above."}`;
    case "recruiter":
      return `${sentences.join(" ")} Currently open to roles where this experience is directly relevant.`;
    case "grammar":
      return sentences
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ")
        .replace(/\s+([.,;:])/g, "$1");
    case "case-study":
      return `Problem: ${sentences[0] ?? text}\nApproach: ${sentences[1] ?? "Describe the approach you took."}\nResult: ${sentences[2] ?? "Add the measurable outcome you observed."}`;
    default:
      return sentences.join(" ").replace(/\s+/g, " ");
  }
}

/* ------------------------------------------------------------------ */
/* Import sources (mock)                                               */
/* ------------------------------------------------------------------ */

export interface ImportGroup {
  key: keyof PortfolioContent | "profile";
  label: string;
  count: number;
  detail: string;
}

export function resumeImportGroups(): ImportGroup[] {
  return [
    { key: "profile", label: "Personal information", count: 1, detail: "Name, title, location, email" },
    { key: "about", label: "Summary", count: 1, detail: "Professional summary" },
    { key: "experience", label: "Experience", count: 2, detail: "Northwind Data, Paylane" },
    { key: "education", label: "Education", count: 1, detail: "BS Computer Science" },
    { key: "skills", label: "Skills", count: 8, detail: "Frontend, backend and tooling" },
    { key: "projects", label: "Projects", count: 2, detail: "Atlas Analytics, Pulse Design System" },
    { key: "certificates", label: "Certificates", count: 1, detail: "AWS Developer Associate" },
  ];
}

/** Returns a partial content patch for the selected import groups. */
export async function mockImport(keys: string[]): Promise<Partial<PortfolioContent>> {
  await new Promise((r) => setTimeout(r, 1100));
  const source = seedPortfolio().content;
  const patch: Partial<PortfolioContent> = {};
  if (keys.includes("profile")) patch.profile = source.profile;
  if (keys.includes("about")) patch.about = source.about;
  if (keys.includes("experience")) patch.experience = source.experience;
  if (keys.includes("education")) patch.education = source.education;
  if (keys.includes("skills")) patch.skills = source.skills;
  if (keys.includes("projects")) patch.projects = source.projects;
  if (keys.includes("certificates")) patch.certificates = source.certificates;
  return patch;
}

/** Mock domain verification used by the publish + settings flows. */
export async function mockVerifyDomain(domain: string): Promise<"verified" | "failed"> {
  await new Promise((r) => setTimeout(r, 1400));
  return /\./.test(domain) ? "verified" : "failed";
}

export function scoreTone(value: number): "good" | "warning" | "critical" {
  if (value >= 80) return "good";
  if (value >= 55) return "warning";
  return "critical";
}
