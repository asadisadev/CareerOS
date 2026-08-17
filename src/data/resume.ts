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
/* PROFESSIONAL TEMPLATE RESUME DATA — each template gets a unique    */
/* role, industry, and set of accomplishments. All content is         */
/* realistic and ATS-optimized.                                       */
/* ------------------------------------------------------------------ */

/**
 * Full, professional resume data for each template.
 * Each entry is a complete ResumeContent object with realistic
 * information tailored to the template's theme.
 */
const TEMPLATE_RESUME_DATA: Record<string, Omit<ResumeContent, "custom" | "volunteer" | "publications" | "awards">> = {
  "minimal-ats": {
    personal: {
      fullName: "Sarah Johnson",
      title: "Marketing Director",
      email: "sarah.johnson@example.com",
      phone: "+1 (415) 555-0182",
      location: "San Francisco, CA",
      website: "sarahjohnson.co",
      linkedin: "linkedin.com/in/sarahjohnson",
      github: "",
      photoUrl: "",
      twitter: "sarah_j_marketing",
      behance: "",
      dribbble: "",
      otherLinks: [],
    },
    summary: {
      summary:
        "Marketing director with 10+ years of experience driving B2B SaaS growth through data-driven campaigns and brand strategy. Led go-to-market for 5 product launches, delivering an average of 120% revenue target attainment across 3 continents.",
      objective:
        "Seeking a senior marketing leadership role where I can build high-performing teams and scale global brand presence.",
    },
    experience: [
      {
        id: uid(),
        role: "Marketing Director",
        company: "CloudScale Inc.",
        location: "San Francisco, CA",
        employmentType: "Full-time",
        startDate: "2020-03",
        endDate: "",
        current: true,
        description:
          "Lead marketing strategy for a $200M B2B SaaS platform serving 4,000+ enterprise customers across North America and EMEA.",
        responsibilities: [
          "Own brand strategy, demand generation, and product marketing for a 3-product portfolio",
          "Manage a team of 18 across digital, content, and field marketing",
          "Drive quarterly OKRs and report directly to the C-suite",
        ],
        achievements: [
          "Increased annual recurring revenue by 47% YoY through a multi-channel account-based marketing program",
          "Launched the company's first EMEA presence, generating $8M in pipeline within 9 months",
          "Reduced customer acquisition cost by 28% through marketing attribution optimization",
        ],
      },
      {
        id: uid(),
        role: "Senior Marketing Manager",
        company: "DataFlow Systems",
        location: "San Jose, CA",
        employmentType: "Full-time",
        startDate: "2015-06",
        endDate: "2020-02",
        current: false,
        description:
          "Built and scaled marketing operations for a Series B data analytics startup from 50 to 450 employees.",
        responsibilities: ["Product marketing for 2 flagship products", "Content strategy and thought leadership"],
        achievements: [
          "Grew organic search traffic by 340% through a content-driven SEO strategy",
          "Spearheaded a rebrand that lifted net promoter score by 22 points",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        degree: "MBA, Marketing Strategy",
        institution: "Stanford Graduate School of Business",
        location: "Stanford, CA",
        startDate: "2011-09",
        endDate: "2013-06",
        grade: "Dean's List",
        description: "Focused on consumer behavior, data analytics, and brand management.",
        coursework: ["Consumer Behavior", "Strategic Brand Management", "Data-Driven Marketing"],
      },
      {
        id: uid(),
        degree: "B.A. in Communication Studies",
        institution: "University of California, Los Angeles",
        location: "Los Angeles, CA",
        startDate: "2007-09",
        endDate: "2011-06",
        grade: "Magna Cum Laude",
        description: "",
        coursework: ["Digital Media", "Persuasion", "Intercultural Communication"],
      },
    ],
    skills: [
      { id: uid(), name: "Marketing Strategy", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Digital Advertising", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Content Marketing", category: "Technical Skills", level: 4 },
      { id: uid(), name: "SEO/SEM", category: "Technical Skills", level: 4 },
      { id: uid(), name: "Google Analytics", category: "Tools", level: 5 },
      { id: uid(), name: "Salesforce", category: "Tools", level: 4 },
      { id: uid(), name: "HubSpot", category: "Tools", level: 4 },
      { id: uid(), name: "Leadership", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Storytelling", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Data Analysis", category: "Technical Skills", level: 4 },
    ],
    projects: [
      {
        id: uid(),
        name: "Global Brand Launch",
        role: "Program Lead",
        description:
          "Orchestrated a 12-market brand relaunch across North America, EMEA, and APAC, unifying the company's visual identity and messaging.",
        technologies: ["Asana", "Salesforce", "Google Analytics", "Figma"],
        repoUrl: "",
        demoUrl: "",
        startDate: "2022-01",
        endDate: "2022-12",
        achievements: [
          "Unified 12 regional brands under a single global identity within 11 months",
          "Achieved 94% internal brand adoption across 38 countries",
        ],
        features: ["Brand guidelines", "Regional adaptation kits", "Internal launch campaign"],
      },
    ],
    certifications: [
      {
        id: uid(),
        name: "Google Analytics Individual Qualification",
        organization: "Google",
        issueDate: "2023-01",
        expirationDate: "2025-01",
        credentialId: "GA-IQ-8821",
        credentialUrl: "google.com/analytics/certification",
      },
      {
        id: uid(),
        name: "HubSpot Inbound Marketing Certified",
        organization: "HubSpot Academy",
        issueDate: "2022-06",
        expirationDate: "2024-06",
        credentialId: "HS-IM-4492",
        credentialUrl: "hubspot.com/certification",
      },
    ],
    achievements: [
      {
        id: uid(),
        title: "Forbes 30 Under 30 in Marketing & Advertising",
        organization: "Forbes",
        date: "2019-12",
        description: "Recognized for driving measurable business impact through innovative marketing programs.",
        metrics: "Top 30 marketers under 30 in North America",
      },
    ],
    languages: [
      { id: uid(), name: "English", proficiency: "Native" },
      { id: uid(), name: "Spanish", proficiency: "Fluent" },
      { id: uid(), name: "French", proficiency: "Conversational" },
    ],
  },

  "professional": {
    personal: {
      fullName: "David Chen",
      title: "Financial Analyst",
      email: "david.chen@example.com",
      phone: "+1 (212) 555-0147",
      location: "New York, NY",
      website: "davidchen-finance.com",
      linkedin: "linkedin.com/in/davidchenfinance",
      github: "",
      photoUrl: "",
      twitter: "",
      behance: "",
      dribbble: "",
      otherLinks: [],
    },
    summary: {
      summary:
        "Senior financial analyst with 8 years of experience in investment banking and corporate finance. Specializes in M&A advisory, financial modeling, and due diligence for cross-border transactions exceeding $5B in total deal value.",
      objective:
        "Seeking a VP-level finance role where I can leverage my transaction expertise and strategic advisory skills to drive corporate growth.",
    },
    experience: [
      {
        id: uid(),
        role: "Vice President, Investment Banking",
        company: "Goldman Sachs",
        location: "New York, NY",
        employmentType: "Full-time",
        startDate: "2021-04",
        endDate: "",
        current: true,
        description:
          "Lead M&A advisory and financing transactions for technology and healthcare clients in the Americas region.",
        responsibilities: [
          "Execute buy-side and sell-side M&A deals, including financial modeling and valuation",
          "Manage deal teams of 5-8 bankers from pitch to close",
          "Develop and present strategic recommendations to C-suite and board-level clients",
        ],
        achievements: [
          "Advised on 12 completed transactions totaling $4.2B in enterprise value, including 3 cross-border deals",
          "Generated $85M in investment banking fees over 18 months, exceeding team targets by 22%",
          "Spearheaded the firm's first ESG-focused advisory practice, closing 2 deals in the renewable energy sector",
        ],
      },
      {
        id: uid(),
        role: "Senior Associate",
        company: "J.P. Morgan",
        location: "New York, NY",
        employmentType: "Full-time",
        startDate: "2016-08",
        endDate: "2021-03",
        current: false,
        description:
          "Led financial due diligence, valuation, and deal structuring for middle-market M&A transactions.",
        responsibilities: ["Financial modeling and LBO analysis", "Due diligence coordination"],
        achievements: [
          "Completed 28 transactions valued at $1.8B cumulatively, working across 6 industry verticals",
          "Developed a proprietary valuation model that reduced analysis time by 40%",
        ],
      },
      {
        id: uid(),
        role: "Financial Analyst",
        company: "Morgan Stanley",
        location: "New York, NY",
        employmentType: "Full-time",
        startDate: "2014-07",
        endDate: "2016-07",
        current: false,
        description: "Supported technology and fintech investment banking teams with financial analysis and modeling.",
        responsibilities: ["Financial statement analysis", "Industry research"],
        achievements: [
          "Supported the IPO of 3 fintech companies with combined valuation of $1.2B",
          "Created 75+ complex financial models for live deal execution",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        degree: "MBA in Finance",
        institution: "Harvard Business School",
        location: "Boston, MA",
        startDate: "2012-09",
        endDate: "2014-05",
        grade: "Baker Scholar (Top 5%)",
        description: "Specialized in corporate finance, investment management, and negotiation.",
        coursework: ["Advanced Corporate Finance", "Investment Management", "Financial Modeling"],
      },
      {
        id: uid(),
        degree: "B.S. in Economics",
        institution: "University of Pennsylvania",
        location: "Philadelphia, PA",
        startDate: "2008-09",
        endDate: "2012-05",
        grade: "Summa Cum Laude",
        description: "",
        coursework: ["Econometrics", "Financial Accounting", "Corporate Finance"],
      },
    ],
    skills: [
      { id: uid(), name: "Financial Modeling", category: "Technical Skills", level: 5 },
      { id: uid(), name: "M&A Advisory", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Due Diligence", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Valuation", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Excel (Advanced)", category: "Tools", level: 5 },
      { id: uid(), name: "Bloomberg Terminal", category: "Tools", level: 4 },
      { id: uid(), name: "Tableau", category: "Tools", level: 3 },
      { id: uid(), name: "Leadership", category: "Soft Skills", level: 4 },
      { id: uid(), name: "Negotiation", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Strategic Thinking", category: "Soft Skills", level: 5 },
    ],
    projects: [
      {
        id: uid(),
        name: "Cross-Border M&A Playbook",
        role: "Co-Lead",
        description:
          "Developed a comprehensive cross-border M&A playbook for the Americas region, covering regulatory frameworks, tax structures, and cultural integration strategies.",
        technologies: ["Microsoft Excel", "PowerPoint", "Capital IQ"],
        repoUrl: "",
        demoUrl: "",
        startDate: "2023-01",
        endDate: "2023-06",
        achievements: [
          "The playbook was adopted by the entire Americas M&A division, standardizing 15 deal processes",
          "Reduced deal closure time by an average of 18 days",
        ],
        features: ["Regulatory checklists", "Valuation templates", "Integration timelines"],
      },
    ],
    certifications: [
      {
        id: uid(),
        name: "Chartered Financial Analyst (CFA)",
        organization: "CFA Institute",
        issueDate: "2018-08",
        expirationDate: "",
        credentialId: "CFA-88213",
        credentialUrl: "cfainstitute.org/verify",
      },
    ],
    achievements: [
      {
        id: uid(),
        title: "Top 10 M&A Deal of the Year",
        organization: "The Deal Awards",
        date: "2022-11",
        description: "Recognized for advising on the $1.8B acquisition of a healthcare technology platform.",
        metrics: "Largest healthcare M&A deal in the Americas region for 2022",
      },
    ],
    languages: [
      { id: uid(), name: "English", proficiency: "Native" },
      { id: uid(), name: "Mandarin Chinese", proficiency: "Fluent" },
      { id: uid(), name: "Cantonese", proficiency: "Conversational" },
    ],
  },

  "modern": {
    personal: {
      fullName: "Aisha Williams",
      title: "Creative Director",
      email: "aisha.williams@example.com",
      phone: "+1 (310) 555-0194",
      location: "Los Angeles, CA",
      website: "aishawilliams.design",
      linkedin: "linkedin.com/in/aishawilliams",
      github: "",
      photoUrl: "",
      twitter: "aisha_designs",
      behance: "behance.net/aishawilliams",
      dribbble: "dribbble.com/aishawilliams",
      otherLinks: [],
    },
    summary: {
      summary:
        "Award-winning creative director with 10+ years of building iconic brand experiences for global companies. Named one of '50 Most Creative People' by AdWeek. Delivered campaigns that reached 100M+ consumers and drove an average brand lift of 32%.",
      objective:
        "Seeking a creative leadership role at a design-forward company where I can shape brand identity and lead world-class creative teams.",
    },
    experience: [
      {
        id: uid(),
        role: "Creative Director",
        company: "Brand Studio Collective",
        location: "Los Angeles, CA",
        employmentType: "Full-time",
        startDate: "2019-06",
        endDate: "",
        current: true,
        description:
          "Lead creative strategy and execution for a portfolio of 12+ global brands across retail, tech, and luxury sectors.",
        responsibilities: [
          "Drive creative vision from concept through delivery, including campaigns, identities, and digital experiences",
          "Manage a team of 24 designers, copywriters, and art directors",
          "Partner with clients' C-suites to shape brand strategy and long-term creative roadmaps",
        ],
        achievements: [
          "Led rebrand for a Fortune 500 retailer, achieving 43% increase in brand recall and 28% sales lift",
          "Won 8 industry awards including Cannes Lions, D&AD, and CLIO in 2022",
          "Grew agency's creative services revenue by 65% over 2 years through client expansion",
        ],
      },
      {
        id: uid(),
        role: "Senior Art Director",
        company: "Saatchi & Saatchi",
        location: "New York, NY",
        employmentType: "Full-time",
        startDate: "2015-01",
        endDate: "2019-05",
        current: false,
        description:
          "Conceptualized and produced integrated campaigns for PepsiCo, Toyota, and Procter & Gamble across TV, digital, and experiential media.",
        responsibilities: ["Creative concept development", "Production oversight"],
        achievements: [
          "Created the 'Live Unstoppable' campaign for Toyota, reaching 250M+ viewers globally",
          "Increased PepsiCo's social engagement by 185% through a Gen-Z targeted digital campaign",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        degree: "MFA in Visual Communication",
        institution: "California Institute of the Arts",
        location: "Valencia, CA",
        startDate: "2011-09",
        endDate: "2013-05",
        grade: "Award for Excellence",
        description: "Focused on brand identity, typography, and interactive media.",
        coursework: ["Brand Identity", "Advanced Typography", "Interactive Media Design"],
      },
      {
        id: uid(),
        degree: "B.A. in Graphic Design",
        institution: "Rhode Island School of Design",
        location: "Providence, RI",
        startDate: "2007-09",
        endDate: "2011-05",
        grade: "Cum Laude",
        description: "",
        coursework: ["Design Theory", "Photography", "Illustration"],
      },
    ],
    skills: [
      { id: uid(), name: "Brand Strategy", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Art Direction", category: "Technical Skills", level: 5 },
      { id: uid(), name: "UX/UI Design", category: "Technical Skills", level: 4 },
      { id: uid(), name: "Typography", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Figma", category: "Tools", level: 5 },
      { id: uid(), name: "Adobe Creative Cloud", category: "Tools", level: 5 },
      { id: uid(), name: "Sketch", category: "Tools", level: 4 },
      { id: uid(), name: "Leadership", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Storytelling", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Client Presentation", category: "Soft Skills", level: 5 },
    ],
    projects: [
      {
        id: uid(),
        name: "Future of Retail: Brand Experience",
        role: "Creative Lead",
        description:
          "Designed a flagship retail brand experience for a luxury fashion house, blending physical and digital interactions in a 5,000 sq ft flagship store.",
        technologies: ["Figma", "Adobe Creative Suite", "Blender", "Cinema 4D"],
        repoUrl: "",
        demoUrl: "future-retail.com",
        startDate: "2022-03",
        endDate: "2022-10",
        achievements: [
          "The experience generated $12M in first-year sales and 150% ROI on the store's build investment",
          "Featured in Architectural Digest and Wallpaper* as 'Best Brand Experience of the Year'",
        ],
        features: ["Interactive product displays", "Digital fitting rooms", "Personalized shopping journey"],
      },
    ],
    certifications: [],
    achievements: [
      {
        id: uid(),
        title: "Cannes Lions Gold Award",
        organization: "Cannes Lions International Festival of Creativity",
        date: "2022-06",
        description: "Awarded for the 'Limitless' brand campaign, celebrating diversity and inclusion.",
        metrics: "Gold in Brand Experience & Activation category",
      },
    ],
    languages: [
      { id: uid(), name: "English", proficiency: "Native" },
      { id: uid(), name: "French", proficiency: "Fluent" },
    ],
  },

  "executive": {
    personal: {
      fullName: "Robert Martinez",
      title: "Chief Operating Officer",
      email: "robert.martinez@example.com",
      phone: "+1 (617) 555-0112",
      location: "Boston, MA",
      website: "robertmartinez.co",
      linkedin: "linkedin.com/in/robertmartinez",
      github: "",
      photoUrl: "",
      twitter: "",
      behance: "",
      dribbble: "",
      otherLinks: [],
    },
    summary: {
      summary:
        "Operational leader with 15+ years of P&L responsibility and global team management. Transformed business operations at 3 companies, driving an average EBITDA increase of 31% through process optimization, digital transformation, and organizational restructuring.",
      objective:
        "Seeking a CEO or President role to lead enterprise-scale transformation and sustainable growth.",
    },
    experience: [
      {
        id: uid(),
        role: "Chief Operating Officer",
        company: "Apex Logistics Group",
        location: "Boston, MA",
        employmentType: "Full-time",
        startDate: "2018-04",
        endDate: "",
        current: true,
        description:
          "Lead global operations, supply chain, and customer experience for a $3.2B logistics company with 18,000 employees across 45 countries.",
        responsibilities: [
          "Responsible for all operational functions including supply chain, procurement, customer service, and facilities",
          "Member of the board, reporting to the CEO and shareholders",
          "Drive digital transformation and operational excellence across the enterprise",
        ],
        achievements: [
          "Increased EBITDA by 42% over 3 years through a comprehensive operational efficiency program",
          "Led the acquisition and integration of 2 competitor firms, expanding market share by 18% in the European market",
          "Reduced carbon footprint by 40% through fleet electrification and route optimization, achieving ESG targets 3 years early",
        ],
      },
      {
        id: uid(),
        role: "Senior Vice President of Operations",
        company: "NexGen Manufacturing",
        location: "Chicago, IL",
        employmentType: "Full-time",
        startDate: "2013-02",
        endDate: "2018-03",
        current: false,
        description:
          "Led manufacturing and supply chain operations for a $1.8B industrial goods manufacturer with 12 plants across North America.",
        responsibilities: ["P&L accountability", "Strategic planning", "Operational transformation"],
        achievements: [
          "Achieved $240M in cost savings through Six Sigma and lean manufacturing initiatives",
          "Reduced order-to-delivery cycle time by 55% through a supply chain digitalization program",
        ],
      },
      {
        id: uid(),
        role: "Director of Operations",
        company: "GE Aviation",
        location: "Cincinnati, OH",
        employmentType: "Full-time",
        startDate: "2008-06",
        endDate: "2013-01",
        current: false,
        description: "Managed operations for a $600M aerospace division, overseeing 2,800 employees.",
        responsibilities: ["Production planning", "Quality assurance", "Cost management"],
        achievements: [
          "Reduced production defects by 62% through a quality transformation initiative",
          "Led the opening of a new manufacturing facility in Mexico, creating 1,200 jobs",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        degree: "MBA",
        institution: "Harvard Business School",
        location: "Boston, MA",
        startDate: "2006-09",
        endDate: "2008-05",
        grade: "Distinction",
        description: "Specialized in operations management, strategy, and organizational behavior.",
        coursework: ["Operations Strategy", "Corporate Finance", "Organizational Behavior"],
      },
      {
        id: uid(),
        degree: "B.S. in Industrial Engineering",
        institution: "Georgia Institute of Technology",
        location: "Atlanta, GA",
        startDate: "2002-09",
        endDate: "2006-05",
        grade: "Summa Cum Laude",
        description: "",
        coursework: ["Supply Chain Management", "Process Optimization", "Statistical Quality Control"],
      },
    ],
    skills: [
      { id: uid(), name: "Operational Excellence", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Strategic Planning", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Supply Chain Management", category: "Technical Skills", level: 5 },
      { id: uid(), name: "M&A Integration", category: "Technical Skills", level: 4 },
      { id: uid(), name: "Six Sigma", category: "Technical Skills", level: 5 },
      { id: uid(), name: "SAP", category: "Tools", level: 4 },
      { id: uid(), name: "Tableau", category: "Tools", level: 4 },
      { id: uid(), name: "Leadership", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Team Building", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Executive Communication", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Change Management", category: "Soft Skills", level: 5 },
    ],
    projects: [
      {
        id: uid(),
        name: "Digital Operations Transformation",
        role: "Project Sponsor",
        description:
          "Led a $150M digital transformation program across 38 global sites, including IoT integration, predictive analytics, and a centralized data lake.",
        technologies: ["SAP S/4HANA", "AWS", "Tableau", "IoT sensors"],
        repoUrl: "",
        demoUrl: "",
        startDate: "2020-01",
        endDate: "2023-12",
        achievements: [
          "Achieved 28% operational efficiency improvement across all sites",
          "Delivered $84M in annualized savings, exceeding the original business case by 12%",
          "Recognized as a 'Digital Trailblazer' by the World Economic Forum",
        ],
        features: ["Real-time production monitoring", "Predictive maintenance", "AI-driven demand planning"],
      },
    ],
    certifications: [
      {
        id: uid(),
        name: "Six Sigma Black Belt",
        organization: "ASQ",
        issueDate: "2014-01",
        expirationDate: "",
        credentialId: "ASQ-SSBB-8821",
        credentialUrl: "asq.org/certification",
      },
      {
        id: uid(),
        name: "Project Management Professional (PMP)",
        organization: "PMI",
        issueDate: "2010-03",
        expirationDate: "2026-03",
        credentialId: "PMP-88213",
        credentialUrl: "pmi.org/verify",
      },
    ],
    achievements: [
      {
        id: uid(),
        title: "Operational Excellence Award",
        organization: "Global Manufacturing Institute",
        date: "2021-09",
        description: "Honored for leading a comprehensive lean transformation that set new industry benchmarks.",
        metrics: "40% reduction in manufacturing waste, 55% improvement in cycle time",
      },
    ],
    languages: [
      { id: uid(), name: "English", proficiency: "Native" },
      { id: uid(), name: "Spanish", proficiency: "Fluent" },
      { id: uid(), name: "German", proficiency: "Professional" },
    ],
  },

  "developer": {
    personal: {
      fullName: "Priya Patel",
      title: "Senior Software Engineer",
      email: "priya.patel@example.com",
      phone: "+1 (415) 555-0163",
      location: "Seattle, WA",
      website: "priyapatel.dev",
      linkedin: "linkedin.com/in/priyapatel",
      github: "github.com/priyapatel",
      photoUrl: "",
      twitter: "priya_codes",
      behance: "",
      dribbble: "",
      otherLinks: [],
    },
    summary: {
      summary:
        "Senior software engineer with 8 years of full-stack development experience. Led 5 major product launches, scaling systems to support 50M+ daily active users. Expert in distributed systems, performance optimization, and technical mentorship.",
      objective:
        "Seeking a principal or engineering manager role where I can lead technical strategy and grow high-performing teams.",
    },
    experience: [
      {
        id: uid(),
        role: "Senior Software Engineer",
        company: "Meta (Facebook)",
        location: "Seattle, WA",
        employmentType: "Full-time",
        startDate: "2020-02",
        endDate: "",
        current: true,
        description:
          "Lead the backend engineering team for the Messenger platform, serving 1.3B monthly users across 100+ countries.",
        responsibilities: [
          "Design and implement high-throughput, low-latency services handling millions of messages per second",
          "Mentor 12 engineers across 2 squads, conducting code reviews and architecture reviews",
          "Drive technical roadmap and collaborate with product and research teams",
        ],
        achievements: [
          "Reduced average message latency by 40% through a major architecture rewrite to a service mesh",
          "Engineered a data sharding strategy that improved database scalability by 300%",
          "Led the team that shipped end-to-end encryption, recognized as a top engineering achievement for 2023",
        ],
      },
      {
        id: uid(),
        role: "Software Engineer",
        company: "Stripe",
        location: "San Francisco, CA",
        employmentType: "Full-time",
        startDate: "2017-01",
        endDate: "2020-01",
        current: false,
        description:
          "Built and maintained the payments processing engine, processing $1B+ in daily transactions globally.",
        responsibilities: ["Backend development", "System design", "Code review"],
        achievements: [
          "Designed a retry and resilience layer that improved payment success rates by 18%",
          "Built a fraud detection pipeline that reduced false positives by 35%",
        ],
      },
      {
        id: uid(),
        role: "Full-Stack Developer",
        company: "Google",
        location: "Mountain View, CA",
        employmentType: "Full-time",
        startDate: "2014-08",
        endDate: "2016-12",
        current: false,
        description: "Developed features for Google Cloud Platform, focusing on developer tools and APIs.",
        responsibilities: ["Frontend development", "API design", "Testing"],
        achievements: [
          "Contributed to Google Cloud SDK used by 5M+ developers worldwide",
          "Built a CLI tool that reduced deployment time by 70% for internal teams",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        degree: "M.S. in Computer Science",
        institution: "Carnegie Mellon University",
        location: "Pittsburgh, PA",
        startDate: "2012-09",
        endDate: "2014-05",
        grade: "3.9 GPA",
        description: "Specialized in distributed systems, machine learning, and database systems.",
        coursework: ["Distributed Systems", "Machine Learning", "Database Internals"],
      },
      {
        id: uid(),
        degree: "B.Tech in Computer Science",
        institution: "Indian Institute of Technology Bombay",
        location: "Mumbai, India",
        startDate: "2008-08",
        endDate: "2012-05",
        grade: "Gold Medalist",
        description: "",
        coursework: ["Algorithms", "Data Structures", "Operating Systems"],
      },
    ],
    skills: [
      { id: uid(), name: "TypeScript", category: "Technical Skills", level: 5 },
      { id: uid(), name: "React", category: "Frameworks", level: 5 },
      { id: uid(), name: "Node.js", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Python", category: "Technical Skills", level: 4 },
      { id: uid(), name: "GraphQL", category: "Technical Skills", level: 4 },
      { id: uid(), name: "Kubernetes", category: "Technical Skills", level: 4 },
      { id: uid(), name: "AWS", category: "Cloud", level: 5 },
      { id: uid(), name: "PostgreSQL", category: "Databases", level: 4 },
      { id: uid(), name: "MongoDB", category: "Databases", level: 4 },
      { id: uid(), name: "Redis", category: "Databases", level: 4 },
      { id: uid(), name: "Docker", category: "Tools", level: 5 },
      { id: uid(), name: "Git", category: "Tools", level: 5 },
      { id: uid(), name: "Mentoring", category: "Soft Skills", level: 5 },
      { id: uid(), name: "System Design", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Technical Leadership", category: "Soft Skills", level: 4 },
    ],
    projects: [
      {
        id: uid(),
        name: "Distributed Message Queue",
        role: "Lead Developer",
        description:
          "Built a high-performance distributed message queue in Go, providing reliable messaging for microservices with at-least-once delivery semantics.",
        technologies: ["Go", "Kafka", "Zookeeper", "Docker", "Kubernetes"],
        repoUrl: "github.com/priyapatel/msg-queue",
        demoUrl: "",
        startDate: "2023-04",
        endDate: "2023-08",
        achievements: [
          "Achieved 99.99% uptime with 1.2M messages per second throughput",
          "Adopted by 4 internal teams, eliminating 3 separate queuing solutions",
        ],
        features: ["Guaranteed delivery", "Horizontal scaling", "Dead-letter queues", "Monitoring dashboards"],
      },
      {
        id: uid(),
        name: "Open Source Contribution: React",
        role: "Contributor",
        description:
          "Contributed to the React ecosystem by adding support for Suspense-based data fetching in server components.",
        technologies: ["React", "JavaScript", "TypeScript"],
        repoUrl: "github.com/facebook/react/pulls?author=priyapatel",
        demoUrl: "",
        startDate: "2022-10",
        endDate: "2023-02",
        achievements: ["Merged 14 PRs impacting the React core and 3 related packages"],
        features: ["Data fetching for server components", "Suspense improvements"],
      },
    ],
    certifications: [
      {
        id: uid(),
        name: "AWS Certified Solutions Architect",
        organization: "Amazon Web Services",
        issueDate: "2022-05",
        expirationDate: "2025-05",
        credentialId: "AWS-SA-88213",
        credentialUrl: "aws.amazon.com/verification",
      },
      {
        id: uid(),
        name: "Kubernetes Certified Administrator",
        organization: "CNCF",
        issueDate: "2021-09",
        expirationDate: "2024-09",
        credentialId: "CKA-88213",
        credentialUrl: "cncf.io/certification",
      },
    ],
    achievements: [
      {
        id: uid(),
        title: "Engineering Excellence Award",
        organization: "Meta",
        date: "2023-03",
        description: "Recognized for exceptional contributions to the Messenger platform architecture.",
        metrics: "Reduced latency by 40% and increased scalability by 300%",
      },
    ],
    languages: [
      { id: uid(), name: "English", proficiency: "Fluent" },
      { id: uid(), name: "Hindi", proficiency: "Native" },
    ],
  },

  "creative": {
    personal: {
      fullName: "Marcus Rivera",
      title: "UX/UI Designer",
      email: "marcus.rivera@example.com",
      phone: "+1 (512) 555-0178",
      location: "Austin, TX",
      website: "marcusrivera.design",
      linkedin: "linkedin.com/in/marcusrivera",
      github: "",
      photoUrl: "",
      twitter: "marcus_ux",
      behance: "behance.net/marcusrivera",
      dribbble: "dribbble.com/marcusrivera",
      otherLinks: [],
    },
    summary: {
      summary:
        "Award-winning UX/UI designer with 7 years of experience crafting digital experiences for startups and Fortune 500 companies. Specializes in human-centered design, design systems, and accessibility. Delivered products used by 20M+ users across web, mobile, and voice interfaces.",
      objective:
        "Seeking a lead product design role where I can shape product strategy and build inclusive, accessible digital experiences.",
    },
    experience: [
      {
        id: uid(),
        role: "Lead Product Designer",
        company: "Frog Design",
        location: "Austin, TX",
        employmentType: "Full-time",
        startDate: "2021-01",
        endDate: "",
        current: true,
        description:
          "Lead product design for 5 enterprise clients, spanning fintech, healthcare, and edtech verticals.",
        responsibilities: [
          "Own end-to-end design for 3 flagship products from research to delivery",
          "Build and maintain design systems for enterprise-scale platforms",
          "Mentor a team of 8 junior and mid-level designers",
        ],
        achievements: [
          "Designed a patient portal for a major healthcare system used by 3M+ patients, achieving 92% user satisfaction",
          "Established a design system for a global fintech client, reducing design debt by 70% and development time by 45%",
          "Earned the 'Design Excellence Award' from the company for 3 consecutive years",
        ],
      },
      {
        id: uid(),
        role: "UX Designer",
        company: "IDEO",
        location: "San Francisco, CA",
        employmentType: "Full-time",
        startDate: "2017-06",
        endDate: "2020-12",
        current: false,
        description:
          "Designed user experiences across web, mobile, and wearable platforms for global brands and social impact organizations.",
        responsibilities: ["User research", "Wireframing", "Prototyping"],
        achievements: [
          "Redesigned a mobile app for a non-profit, increasing donor engagement by 85%",
          "Created an AR shopping experience for a luxury retailer, driving 35% higher conversion rates",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        degree: "Master of Design in Interaction Design",
        institution: "Savannah College of Art and Design",
        location: "Savannah, GA",
        startDate: "2015-09",
        endDate: "2017-05",
        grade: "Outstanding Achievement Award",
        description: "Focused on human-computer interaction, service design, and design strategy.",
        coursework: ["Interaction Design", "Design Research", "Service Design"],
      },
      {
        id: uid(),
        degree: "B.A. in Graphic Design",
        institution: "University of Texas at Austin",
        location: "Austin, TX",
        startDate: "2011-08",
        endDate: "2015-05",
        grade: "Cum Laude",
        description: "",
        coursework: ["Typography", "Visual Communication", "Design Thinking"],
      },
    ],
    skills: [
      { id: uid(), name: "UX Research", category: "Technical Skills", level: 5 },
      { id: uid(), name: "UI Design", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Design Systems", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Accessibility (WCAG)", category: "Technical Skills", level: 4 },
      { id: uid(), name: "Figma", category: "Tools", level: 5 },
      { id: uid(), name: "Adobe XD", category: "Tools", level: 5 },
      { id: uid(), name: "Sketch", category: "Tools", level: 4 },
      { id: uid(), name: "Prototyping", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Collaboration", category: "Soft Skills", level: 5 },
      { id: uid(), name: "User Empathy", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Storytelling", category: "Soft Skills", level: 4 },
    ],
    projects: [
      {
        id: uid(),
        name: "Accessible Banking App",
        role: "Lead Designer",
        description:
          "Designed a fully accessible mobile banking app for users with visual and motor impairments, working closely with accessibility experts and the blind community.",
        technologies: ["Figma", "Adobe XD", "UserZoom", "DScout"],
        repoUrl: "",
        demoUrl: "accessiblebanking.com",
        startDate: "2022-02",
        endDate: "2022-12",
        achievements: [
          "Achieved WCAG 2.2 AA compliance with 100% of user flows",
          "Launched to 120,000 users within 6 months, with a 4.8-star rating",
          "Recognized as a finalist for the 'Product Design' award at the 2023 Interaction Awards",
        ],
        features: ["Voice navigation", "High contrast mode", "Gesture simplification", "Screen reader support"],
      },
    ],
    certifications: [
      {
        id: uid(),
        name: "Certified UX Professional",
        organization: "Interaction Design Foundation",
        issueDate: "2022-08",
        expirationDate: "2025-08",
        credentialId: "IDF-CUX-8821",
        credentialUrl: "interaction-design.org/certification",
      },
    ],
    achievements: [
      {
        id: uid(),
        title: "UX Design Award of Excellence",
        organization: "UXPA",
        date: "2022-11",
        description: "Awarded for outstanding contribution to user experience design in the healthcare industry.",
        metrics: "Gold Award in Healthcare UX Design category",
      },
    ],
    languages: [
      { id: uid(), name: "English", proficiency: "Native" },
      { id: uid(), name: "Spanish", proficiency: "Fluent" },
    ],
  },

  "elegant": {
    personal: {
      fullName: "Eleanor Kim",
      title: "Brand Strategist",
      email: "eleanor.kim@example.com",
      phone: "+1 (312) 555-0144",
      location: "Chicago, IL",
      website: "eleanorkim.com",
      linkedin: "linkedin.com/in/eleanorkim",
      github: "",
      photoUrl: "",
      twitter: "eleanor_brand",
      behance: "",
      dribbble: "",
      otherLinks: [],
    },
    summary: {
      summary:
        "Brand strategist with 9 years of experience defining and activating brands for luxury, lifestyle, and consumer goods companies. Expertise in brand positioning, narrative development, and consumer insights. Delivered strategies that generated over $2B in incremental brand value.",
      objective:
        "Seeking a Chief Brand Officer or senior strategy role to build iconic brands with lasting cultural impact.",
    },
    experience: [
      {
        id: uid(),
        role: "Senior Brand Strategist",
        company: "Ogilvy & Mather",
        location: "Chicago, IL",
        employmentType: "Full-time",
        startDate: "2019-08",
        endDate: "",
        current: true,
        description:
          "Lead brand strategy for a portfolio of premium and luxury clients, including fashion, hospitality, and technology brands.",
        responsibilities: [
          "Develop comprehensive brand strategies, including positioning, architecture, and activation roadmaps",
          "Lead qualitative and quantitative research to uncover consumer insights",
          "Present to C-suites and boards of Fortune 500 clients",
        ],
        achievements: [
          "Developed the brand strategy for a $3B luxury hotel group's global rebrand, resulting in 28% revenue increase",
          "Created a brand narrative for a tech unicorn that lifted brand preference by 35% in 18 months",
          "Led the strategic work for a new luxury fashion label launch, generating $45M in first-year sales",
        ],
      },
      {
        id: uid(),
        role: "Brand Manager",
        company: "L'Oréal",
        location: "New York, NY",
        employmentType: "Full-time",
        startDate: "2015-07",
        endDate: "2019-07",
        current: false,
        description:
          "Managed the brand strategy and positioning for 4 leading beauty brands across prestige and mass-market segments.",
        responsibilities: ["Brand architecture", "Marketing strategy", "Consumer insights"],
        achievements: [
          "Relauched a heritage beauty brand, increasing market share by 15%",
          "Created a new brand architecture for 5 product lines, reducing portfolio cannibalization by 22%",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        degree: "MBA in Marketing & Strategy",
        institution: "University of Chicago Booth School of Business",
        location: "Chicago, IL",
        startDate: "2013-09",
        endDate: "2015-06",
        grade: "With Honors",
        description: "Focused on brand strategy, consumer behavior, and competitive strategy.",
        coursework: ["Brand Strategy", "Consumer Behavior", "Competitive Strategy"],
      },
      {
        id: uid(),
        degree: "B.A. in English Literature",
        institution: "Yale University",
        location: "New Haven, CT",
        startDate: "2009-09",
        endDate: "2013-05",
        grade: "Magna Cum Laude",
        description: "",
        coursework: ["Narrative Studies", "Creative Writing", "Critical Theory"],
      },
    ],
    skills: [
      { id: uid(), name: "Brand Strategy", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Consumer Insights", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Market Research", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Narrative Development", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Strategic Planning", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Storytelling", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Executive Communication", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Creative Direction", category: "Technical Skills", level: 4 },
      { id: uid(), name: "Leadership", category: "Soft Skills", level: 4 },
      { id: uid(), name: "Analytical Thinking", category: "Soft Skills", level: 5 },
    ],
    projects: [
      {
        id: uid(),
        name: "Global Hospitality Brand Strategy",
        role: "Project Lead",
        description:
          "Led a comprehensive brand strategy refresh for a 120-year-old luxury hotel chain, spanning 38 properties across 17 countries.",
        technologies: ["Qualtrics", "Tableau", "Miro"],
        repoUrl: "",
        demoUrl: "",
        startDate: "2022-03",
        endDate: "2023-04",
        achievements: [
          "The new brand platform increased direct booking revenue by 32% within 12 months",
          "Achieved 96% internal adoption across the global property network",
        ],
        features: ["Brand platform", "Visual identity guidelines", "Employee brand training program"],
      },
    ],
    certifications: [
      {
        id: uid(),
        name: "Certified Brand Strategist",
        organization: "American Marketing Association",
        issueDate: "2020-06",
        expirationDate: "2024-06",
        credentialId: "AMA-CBS-8821",
        credentialUrl: "ama.org/certification",
      },
    ],
    achievements: [
      {
        id: uid(),
        title: "Effie Award for Brand Strategy",
        organization: "Effie Awards",
        date: "2021-10",
        description: "Recognized for developing a brand strategy that generated exceptional business results.",
        metrics: "Gold in Brand Strategy & Innovation category",
      },
    ],
    languages: [
      { id: uid(), name: "English", proficiency: "Native" },
      { id: uid(), name: "Korean", proficiency: "Fluent" },
      { id: uid(), name: "Japanese", proficiency: "Professional" },
    ],
  },

  "tech": {
    personal: {
      fullName: "James Okafor",
      title: "DevOps Engineer",
      email: "james.okafor@example.com",
      phone: "+1 (303) 555-0199",
      location: "Denver, CO",
      website: "jamesokafor.dev",
      linkedin: "linkedin.com/in/jamesokafor",
      github: "github.com/jamesokafor",
      photoUrl: "",
      twitter: "james_devops",
      behance: "",
      dribbble: "",
      otherLinks: [],
    },
    summary: {
      summary:
        "Senior DevOps engineer with 8 years of experience building and scaling cloud infrastructure for enterprise applications. Expert in Kubernetes, CI/CD pipelines, and infrastructure-as-code. Reduced deployment times by 75% and infrastructure costs by 40% for multiple organizations.",
      objective:
        "Seeking a lead DevOps or cloud architect role to design and implement scalable, resilient cloud infrastructure.",
    },
    experience: [
      {
        id: uid(),
        role: "Senior DevOps Engineer",
        company: "Snowflake",
        location: "Denver, CO",
        employmentType: "Full-time",
        startDate: "2021-03",
        endDate: "",
        current: true,
        description:
          "Lead cloud infrastructure and platform reliability for Snowflake's core data platform, serving 10,000+ enterprise customers.",
        responsibilities: [
          "Design and maintain Kubernetes clusters across AWS, Azure, and GCP",
          "Build and optimize CI/CD pipelines using ArgoCD and GitHub Actions",
          "Drive observability and monitoring strategy with Prometheus and Grafana",
        ],
        achievements: [
          "Architected a multi-region active-active deployment model, achieving 99.99% uptime",
          "Reduced infrastructure costs by 38% through resource optimization and spot instance strategy",
          "Led the migration to Kubernetes with zero downtime, handling 1.2M daily requests",
        ],
      },
      {
        id: uid(),
        role: "DevOps Engineer",
        company: "Datadog",
        location: "New York, NY",
        employmentType: "Full-time",
        startDate: "2017-06",
        endDate: "2021-02",
        current: false,
        description:
          "Built and scaled the monitoring and logging infrastructure for Datadog's SaaS product, processing 15TB of logs daily.",
        responsibilities: ["Infrastructure automation", "Performance optimization"],
        achievements: [
          "Designed an auto-scaling solution that reduced infrastructure spend by 42%",
          "Created reusable Terraform modules used by 8 engineering teams",
        ],
      },
      {
        id: uid(),
        role: "Systems Engineer",
        company: "Amazon Web Services (AWS)",
        location: "Seattle, WA",
        employmentType: "Full-time",
        startDate: "2014-09",
        endDate: "2017-05",
        current: false,
        description: "Supported AWS's EC2 and S3 services, focusing on reliability and performance.",
        responsibilities: ["System monitoring", "Incident response", "Performance tuning"],
        achievements: [
          "Reduced EC2 instance provisioning time by 65% through an automation initiative",
          "Created a monitoring dashboard that reduced mean time to detection by 80%",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        degree: "M.S. in Computer Engineering",
        institution: "University of Michigan",
        location: "Ann Arbor, MI",
        startDate: "2012-09",
        endDate: "2014-05",
        grade: "3.9 GPA",
        description: "Specialized in distributed systems and cloud computing.",
        coursework: ["Distributed Systems", "Cloud Computing", "Network Security"],
      },
      {
        id: uid(),
        degree: "B.E. in Computer Science",
        institution: "University of Lagos",
        location: "Lagos, Nigeria",
        startDate: "2008-09",
        endDate: "2012-05",
        grade: "First Class Honors",
        description: "",
        coursework: ["Computer Architecture", "Operating Systems", "Networking"],
      },
    ],
    skills: [
      { id: uid(), name: "Kubernetes", category: "Technical Skills", level: 5 },
      { id: uid(), name: "AWS", category: "Cloud", level: 5 },
      { id: uid(), name: "Azure", category: "Cloud", level: 4 },
      { id: uid(), name: "GCP", category: "Cloud", level: 4 },
      { id: uid(), name: "Terraform", category: "Tools", level: 5 },
      { id: uid(), name: "Ansible", category: "Tools", level: 4 },
      { id: uid(), name: "Docker", category: "Tools", level: 5 },
      { id: uid(), name: "CI/CD", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Python", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Go", category: "Technical Skills", level: 4 },
      { id: uid(), name: "Prometheus", category: "Tools", level: 4 },
      { id: uid(), name: "Grafana", category: "Tools", level: 4 },
      { id: uid(), name: "Linux", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Networking", category: "Technical Skills", level: 4 },
      { id: uid(), name: "Problem Solving", category: "Soft Skills", level: 5 },
    ],
    projects: [
      {
        id: uid(),
        name: "Kubernetes Operator for Data Pipelines",
        role: "Lead Engineer",
        description:
          "Built a custom Kubernetes operator that orchestrates complex data pipelines with error handling, retries, and notifications.",
        technologies: ["Golang", "Kubernetes", "CRD", "Argo Workflows"],
        repoUrl: "github.com/jamesokafor/k8s-data-operator",
        demoUrl: "",
        startDate: "2023-01",
        endDate: "2023-06",
        achievements: [
          "Reduced data pipeline errors by 95% through automated error handling",
          "Cut pipeline deployment time from 2 hours to 15 minutes",
          "Adopted by 3 internal teams, handling 200+ pipelines daily",
        ],
        features: ["Auto-retry with backoff", "Slack/email notifications", "Pipeline observability"],
      },
    ],
    certifications: [
      {
        id: uid(),
        name: "AWS Certified DevOps Engineer",
        organization: "Amazon Web Services",
        issueDate: "2022-04",
        expirationDate: "2025-04",
        credentialId: "AWS-DE-88213",
        credentialUrl: "aws.amazon.com/verification",
      },
      {
        id: uid(),
        name: "Certified Kubernetes Administrator (CKA)",
        organization: "CNCF",
        issueDate: "2020-10",
        expirationDate: "2023-10",
        credentialId: "CKA-88213",
        credentialUrl: "cncf.io/certification",
      },
      {
        id: uid(),
        name: "Terraform Associate",
        organization: "HashiCorp",
        issueDate: "2021-08",
        expirationDate: "2024-08",
        credentialId: "TF-8821",
        credentialUrl: "hashicorp.com/certification",
      },
    ],
    achievements: [
      {
        id: uid(),
        title: "Cloud Innovation Award",
        organization: "DevOps Institute",
        date: "2022-12",
        description: "Recognized for designing a highly resilient multi-cloud Kubernetes architecture.",
        metrics: "99.99% uptime, 38% cost reduction",
      },
    ],
    languages: [
      { id: uid(), name: "English", proficiency: "Fluent" },
      { id: uid(), name: "Igbo", proficiency: "Native" },
      { id: uid(), name: "Yoruba", proficiency: "Conversational" },
    ],
  },

  "corporate": {
    personal: {
      fullName: "Victoria Schmidt",
      title: "VP of Operations",
      email: "victoria.schmidt@example.com",
      phone: "+1 (404) 555-0133",
      location: "Atlanta, GA",
      website: "victoriaschmidt.com",
      linkedin: "linkedin.com/in/victoriaschmidt",
      github: "",
      photoUrl: "",
      twitter: "",
      behance: "",
      dribbble: "",
      otherLinks: [],
    },
    summary: {
      summary:
        "Operations executive with 12+ years of experience leading large-scale operational transformations at Fortune 500 companies. Proven track record of delivering $200M+ in cost savings and improving operational efficiency by an average of 35%. Expert in process reengineering, organizational change, and strategic sourcing.",
      objective:
        "Seeking a Chief Operating Officer or Chief Transformation Officer role to drive enterprise-wide operational excellence.",
    },
    experience: [
      {
        id: uid(),
        role: "Vice President of Operations",
        company: "Delta Air Lines",
        location: "Atlanta, GA",
        employmentType: "Full-time",
        startDate: "2020-04",
        endDate: "",
        current: true,
        description:
          "Lead operational strategy for Delta's global network, overseeing 5,000+ daily flights and 50,000+ employees.",
        responsibilities: [
          "Drive operational performance across 300+ stations and 5 continents",
          "Lead a team of 35 directors and managers across operations, planning, and quality",
          "Accountable for on-time performance, operational efficiency, and customer experience",
        ],
        achievements: [
          "Achieved the highest on-time performance rating in the company's history (94.8%) for 2022",
          "Led a $180M operational efficiency program, reducing annual costs while maintaining service levels",
          "Spearheaded a digital transformation of ground operations, reducing turnaround time by 22%",
        ],
      },
      {
        id: uid(),
        role: "Director of Operations",
        company: "McKinsey & Company",
        location: "New York, NY",
        employmentType: "Full-time",
        startDate: "2016-02",
        endDate: "2020-03",
        current: false,
        description:
          "Led large-scale operational transformation projects for Fortune 500 clients across consumer goods, manufacturing, and technology.",
        responsibilities: ["Project leadership", "Operational strategy", "Team management"],
        achievements: [
          "Delivered $150M+ in operational savings across 5 major transformation programs",
          "Developed a proprietary operational maturity model adopted by 12 global clients",
        ],
      },
      {
        id: uid(),
        role: "Senior Operations Manager",
        company: "General Electric",
        location: "Houston, TX",
        employmentType: "Full-time",
        startDate: "2011-07",
        endDate: "2016-01",
        current: false,
        description: "Managed manufacturing and supply chain operations for GE's energy division.",
        responsibilities: ["Production management", "Supply chain optimization"],
        achievements: [
          "Reduced lead times by 40% through a lean production transformation",
          "Implemented a global sourcing strategy that saved $65M annually",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        degree: "MBA in Operations Management",
        institution: "Columbia Business School",
        location: "New York, NY",
        startDate: "2009-09",
        endDate: "2011-05",
        grade: "Beta Gamma Sigma",
        description: "Specialized in operations strategy, supply chain management, and organizational leadership.",
        coursework: ["Operations Strategy", "Supply Chain Management", "Organizational Leadership"],
      },
      {
        id: uid(),
        degree: "B.S. in Industrial and Systems Engineering",
        institution: "Georgia Institute of Technology",
        location: "Atlanta, GA",
        startDate: "2005-08",
        endDate: "2009-05",
        grade: "Summa Cum Laude",
        description: "",
        coursework: ["Industrial Engineering", "Systems Design", "Operations Research"],
      },
    ],
    skills: [
      { id: uid(), name: "Operational Strategy", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Process Improvement", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Supply Chain Management", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Lean Six Sigma", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Digital Transformation", category: "Technical Skills", level: 4 },
      { id: uid(), name: "SAP", category: "Tools", level: 4 },
      { id: uid(), name: "Tableau", category: "Tools", level: 4 },
      { id: uid(), name: "Leadership", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Strategic Planning", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Team Building", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Change Management", category: "Soft Skills", level: 5 },
    ],
    projects: [
      {
        id: uid(),
        name: "Global Operations Excellence Program",
        role: "Program Lead",
        description:
          "Led a 5-year operational transformation program across 48 countries, standardizing processes and implementing a shared services model.",
        technologies: ["SAP S/4HANA", "Tableau", "ServiceNow"],
        repoUrl: "",
        demoUrl: "",
        startDate: "2020-06",
        endDate: "2024-12",
        achievements: [
          "Delivered $220M in cumulative cost savings, exceeding the target by 18%",
          "Reduced operational variance by 65% through standardized global processes",
        ],
        features: ["Global process standardization", "Shared services implementation", "Performance dashboards"],
      },
    ],
    certifications: [
      {
        id: uid(),
        name: "Six Sigma Master Black Belt",
        organization: "ASQ",
        issueDate: "2018-01",
        expirationDate: "",
        credentialId: "ASQ-MBB-8821",
        credentialUrl: "asq.org/certification",
      },
      {
        id: uid(),
        name: "Certified Supply Chain Professional (CSCP)",
        organization: "APICS",
        issueDate: "2017-08",
        expirationDate: "2027-08",
        credentialId: "CSCP-88213",
        credentialUrl: "apics.org/certification",
      },
    ],
    achievements: [
      {
        id: uid(),
        title: "Operational Excellence Leadership Award",
        organization: "Institute for Operational Excellence",
        date: "2023-03",
        description: "Recognized for 5 years of exceptional operational leadership across global operations.",
        metrics: "Consistently top-quartile performance in operational KPIs",
      },
    ],
    languages: [
      { id: uid(), name: "English", proficiency: "Native" },
      { id: uid(), name: "German", proficiency: "Fluent" },
      { id: uid(), name: "French", proficiency: "Professional" },
    ],
  },

  "academic": {
    personal: {
      fullName: "Dr. Thomas Bauer",
      title: "Professor of Economics",
      email: "thomas.bauer@example.com",
      phone: "+1 (773) 555-0122",
      location: "Chicago, IL",
      website: "thomasbauer.com",
      linkedin: "linkedin.com/in/thomasbauer",
      github: "",
      photoUrl: "",
      twitter: "bauer_economics",
      behance: "",
      dribbble: "",
      otherLinks: [],
    },
    summary: {
      summary:
        "Full Professor of Economics with 14 years of academic experience at top-tier institutions. Research focuses on labor economics, macroeconomics, and public policy with over 80 publications in leading journals. Consistently ranked in the top 10% of economics researchers globally.",
      objective:
        "Seeking a senior academic leadership role, such as Department Chair or Dean, to advance research excellence and educational innovation.",
    },
    experience: [
      {
        id: uid(),
        role: "Professor of Economics",
        company: "University of Chicago",
        location: "Chicago, IL",
        employmentType: "Full-time",
        startDate: "2014-09",
        endDate: "",
        current: true,
        description:
          "Tenured professor teaching undergraduate and graduate courses in macroeconomics and econometrics, with a research focus on labor market dynamics.",
        responsibilities: [
          "Teaching graduate-level courses in macroeconomics and econometrics",
          "Supervising 8 PhD students and 12 postdoctoral researchers",
          "Principal investigator on $6M in research grants from NSF and the Sloan Foundation",
        ],
        achievements: [
          "Published 22 peer-reviewed articles in top-tier journals (AER, QJE, Econometrica) over the last 5 years",
          "Awarded the 'Excellence in Teaching' award for 3 consecutive years",
          "Cited in 3,200+ academic papers, with an h-index of 32",
        ],
      },
      {
        id: uid(),
        role: "Associate Professor",
        company: "Harvard University",
        location: "Cambridge, MA",
        employmentType: "Full-time",
        startDate: "2008-07",
        endDate: "2014-08",
        current: false,
        description:
          "Teaching, research, and service in the Department of Economics, focusing on labor economics and public policy.",
        responsibilities: ["Research", "Teaching", "Service"],
        achievements: [
          "Ranked #3 in the world for research output in labor economics (IDEAS/RePEc)",
          "Co-authored a textbook on econometrics now used by 120 universities worldwide",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        degree: "Ph.D. in Economics",
        institution: "Massachusetts Institute of Technology",
        location: "Cambridge, MA",
        startDate: "2003-09",
        endDate: "2008-06",
        grade: "Distinction",
        description: "Dissertation on labor market frictions and macroeconomic dynamics.",
        coursework: ["Macroeconomic Theory", "Econometrics", "Labor Economics"],
      },
      {
        id: uid(),
        degree: "M.A. in Economics",
        institution: "University of Cambridge",
        location: "Cambridge, UK",
        startDate: "2002-10",
        endDate: "2003-07",
        grade: "Distinction",
        description: "",
        coursework: ["Advanced Macroeconomics", "Economic Policy"],
      },
      {
        id: uid(),
        degree: "B.A. in Economics and Philosophy",
        institution: "University of Oxford",
        location: "Oxford, UK",
        startDate: "1999-10",
        endDate: "2002-06",
        grade: "First Class Honors",
        description: "",
        coursework: ["Political Economy", "Logic and Methodology", "Development Economics"],
      },
    ],
    skills: [
      { id: uid(), name: "Econometrics", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Macroeconomic Theory", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Labor Economics", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Data Science", category: "Technical Skills", level: 4 },
      { id: uid(), name: "R", category: "Tools", level: 5 },
      { id: uid(), name: "Python", category: "Technical Skills", level: 4 },
      { id: uid(), name: "Stata", category: "Tools", level: 5 },
      { id: uid(), name: "Research Design", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Academic Writing", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Mentoring", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Public Policy", category: "Technical Skills", level: 4 },
    ],
    projects: [
      {
        id: uid(),
        name: "Labor Market Dynamics Research Project",
        role: "Principal Investigator",
        description:
          "A 6-year research project funded by the NSF to study the impact of automation and AI on labor markets using large-scale microdata.",
        technologies: ["Python", "R", "Stata", "AWS"],
        repoUrl: "",
        demoUrl: "",
        startDate: "2019-01",
        endDate: "2025-12",
        achievements: [
          "Published 8 peer-reviewed papers and 2 book chapters from the project",
          "Presented findings at 14 international conferences",
          "Project findings were cited in a US Congressional hearing on technology and employment",
        ],
        features: ["Data collection and cleaning", "Advanced econometric modeling", "Policy simulations"],
      },
    ],
    certifications: [],
    achievements: [
      {
        id: uid(),
        title: "John Bates Clark Medal",
        organization: "American Economic Association",
        date: "2020-04",
        description: "Awarded to economists under 40 for outstanding contributions to economic research.",
        metrics: "One of the highest honors in economics",
      },
      {
        id: uid(),
        title: "Fellow of the Econometric Society",
        organization: "Econometric Society",
        date: "2018-12",
        description: "Elected as a Fellow for distinguished contributions to econometric theory and methodology.",
        metrics: "Limited to 10% of Society members",
      },
    ],
    languages: [
      { id: uid(), name: "English", proficiency: "Native" },
      { id: uid(), name: "German", proficiency: "Native" },
      { id: uid(), name: "French", proficiency: "Fluent" },
      { id: uid(), name: "Spanish", proficiency: "Professional" },
    ],
  },

  "premium": {
    personal: {
      fullName: "Isabella Romano",
      title: "Managing Director",
      email: "isabella.romano@example.com",
      phone: "+1 (305) 555-0156",
      location: "Miami, FL",
      website: "isabellaromano.com",
      linkedin: "linkedin.com/in/isabellaromano",
      github: "",
      photoUrl: "",
      twitter: "isabella_roman",
      behance: "",
      dribbble: "",
      otherLinks: [],
    },
    summary: {
      summary:
        "Managing Director with 18 years of experience in wealth management, investment banking, and private equity. Former Goldman Sachs partner with a $1.8B AUM portfolio. Consistently ranked in the top 5% of financial advisors globally.",
      objective:
        "Seeking a CEO or Chairman role in the financial services industry to drive strategic growth and exceptional client outcomes.",
    },
    experience: [
      {
        id: uid(),
        role: "Managing Director, Private Wealth",
        company: "Goldman Sachs",
        location: "Miami, FL",
        employmentType: "Full-time",
        startDate: "2016-09",
        endDate: "",
        current: true,
        description:
          "Managing a $1.8B portfolio for ultra-high-net-worth individuals and family offices across North America and Latin America.",
        responsibilities: [
          "Lead a team of 25 advisors, analysts, and support staff",
          "Develop and execute investment strategies across public and private markets",
          "Build and maintain relationships with 40+ ultra-wealthy clients and 15 family offices",
        ],
        achievements: [
          "Grew the managed portfolio from $1.2B to $1.8B over 4 years through net new assets and investment performance",
          "Achieved an average annual return of 14.8% (net of fees) over the last 5 years",
          "Named 'Top 10 Wealth Advisor' in the Americas by Institutional Investor for 3 consecutive years",
        ],
      },
      {
        id: uid(),
        role: "Partner, Investment Banking",
        company: "Goldman Sachs",
        location: "New York, NY",
        employmentType: "Full-time",
        startDate: "2008-03",
        endDate: "2016-08",
        current: false,
        description:
          "Co-head of the Technology Investment Banking group, advising public and private tech companies on financing and M&A.",
        responsibilities: ["Deal origination and execution", "Client relationship management"],
        achievements: [
          "Executed 45+ transactions totaling $42B in value, including 6 IPOs and 12 M&A deals",
          "Built a private equity portfolio that generated a 3.2x return over 5 years",
        ],
      },
      {
        id: uid(),
        role: "Vice President",
        company: "J.P. Morgan Private Bank",
        location: "New York, NY",
        employmentType: "Full-time",
        startDate: "2004-07",
        endDate: "2008-02",
        current: false,
        description: "Advising ultra-high-net-worth clients on wealth planning, investment management, and trust services.",
        responsibilities: ["Client advising", "Portfolio management"],
        achievements: [
          "Closed 12 new client relationships with total AUM of $380M",
          "Developed a customized wealth planning framework adopted by the Private Bank nationally",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        degree: "MBA in Finance",
        institution: "Columbia Business School",
        location: "New York, NY",
        startDate: "2002-09",
        endDate: "2004-05",
        grade: "Dean's List",
        description: "Focused on investment management, corporate finance, and strategic leadership.",
        coursework: ["Investment Management", "Corporate Finance", "Strategic Leadership"],
      },
      {
        id: uid(),
        degree: "B.S. in Economics and Finance",
        institution: "Università Bocconi",
        location: "Milan, Italy",
        startDate: "1998-09",
        endDate: "2002-06",
        grade: "Summa Cum Laude",
        description: "",
        coursework: ["Financial Economics", "Quantitative Methods", "International Finance"],
      },
    ],
    skills: [
      { id: uid(), name: "Wealth Management", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Investment Strategy", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Private Equity", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Portfolio Management", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Financial Analysis", category: "Technical Skills", level: 5 },
      { id: uid(), name: "Bloomberg Terminal", category: "Tools", level: 5 },
      { id: uid(), name: "Leadership", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Relationship Management", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Negotiation", category: "Soft Skills", level: 5 },
      { id: uid(), name: "Strategic Planning", category: "Soft Skills", level: 5 },
    ],
    projects: [
      {
        id: uid(),
        name: "Ultra-High-Net-Worth Investment Platform",
        role: "Executive Sponsor",
        description:
          "Led the creation and launch of a proprietary investment platform for ultra-high-net-worth clients, offering direct access to private equity, real estate, and venture capital deals.",
        technologies: ["Salesforce", "Bloomberg", "Tableau"],
        repoUrl: "",
        demoUrl: "",
        startDate: "2021-06",
        endDate: "2022-08",
        achievements: [
          "Platform generated $240M in new investment commitments in the first 12 months",
          "Deployed to 45 advisors across 12 offices, managing $5B+ in client assets",
        ],
        features: ["Deal pipeline", "Performance reporting", "Portfolio modeling"],
      },
    ],
    certifications: [
      {
        id: uid(),
        name: "Certified Private Wealth Advisor (CPWA)",
        organization: "Investment Management Consultants Association",
        issueDate: "2018-04",
        expirationDate: "2026-04",
        credentialId: "CPWA-88213",
        credentialUrl: "imca.org/certification",
      },
      {
        id: uid(),
        name: "Series 7, 63, 65 Licensed",
        organization: "FINRA",
        issueDate: "2004-01",
        expirationDate: "",
        credentialId: "FINRA-88213",
        credentialUrl: "finra.org/verify",
      },
    ],
    achievements: [
      {
        id: uid(),
        title: "Top 100 Wealth Advisors in the US",
        organization: "Barron's",
        date: "2023-04",
        description: "Recognized as one of the top wealth advisors in the United States for 2023.",
        metrics: "Ranked #12 nationally",
      },
      {
        id: uid(),
        title: "Forbes Best-in-State Wealth Advisor",
        organization: "Forbes",
        date: "2022-08",
        description: "Awarded for outstanding client service and investment performance.",
        metrics: "Top 10 in Florida, #1 in Miami",
      },
    ],
    languages: [
      { id: uid(), name: "English", proficiency: "Native" },
      { id: uid(), name: "Italian", proficiency: "Native" },
      { id: uid(), name: "Spanish", proficiency: "Fluent" },
      { id: uid(), name: "Portuguese", proficiency: "Conversational" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Create template resumes using the professional data above          */
/* ------------------------------------------------------------------ */

function createFullResumeContent(templateId: string): ResumeContent {
  const data = TEMPLATE_RESUME_DATA[templateId];
  if (!data) {
    throw new Error(`No resume data found for template: ${templateId}`);
  }

  // Add empty custom, volunteer, publications, awards fields
  return {
    ...data,
    volunteer: [],
    publications: [],
    awards: [],
    custom: {},
  };
}

export function createTemplateResume(templateId: string): Resume {
  const template = RESUME_TEMPLATES.find((t) => t.id === templateId);
  if (!template) throw new Error(`Template ${templateId} not found`);

  const content = createFullResumeContent(templateId);
  const name = `${content.personal.fullName}'s Resume`;

  const now = new Date().toISOString();

  // Build sections from content
  const sections: SectionMeta[] = [
    { id: "personal", kind: "personal", title: "Personal Information", visible: true, removable: false },
    { id: "summary", kind: "summary", title: "Professional Summary", visible: true, removable: true },
    { id: "experience", kind: "experience", title: "Work Experience", visible: true, removable: true },
    { id: "education", kind: "education", title: "Education", visible: true, removable: true },
    { id: "skills", kind: "skills", title: "Skills", visible: true, removable: true },
    { id: "projects", kind: "projects", title: "Projects", visible: true, removable: true },
    { id: "certifications", kind: "certifications", title: "Certifications", visible: true, removable: true },
    { id: "achievements", kind: "achievements", title: "Achievements", visible: true, removable: true },
    { id: "languages", kind: "languages", title: "Languages", visible: true, removable: true },
  ];

  return {
    id: `res_${templateId}`,
    name,
    createdAt: now,
    updatedAt: now,
    sections,
    content,
    style: {
      templateId: template.id,
      fontFamily: "Inter Tight",
      fontSize: 10.5,
      headingSize: 13,
      lineHeight: 1.45,
      margin: 44,
      sectionSpacing: 18,
      sectionStyle: template.sectionStyle,
      dateStyle: "short",
      accent: template.accent,
      layout: template.layout,
      showPhoto: false,
      showIcons: true,
    },
    versions: [
      {
        id: uid(),
        label: "Version 1",
        note: "Base resume generated from template",
        createdAt: now,
        atsScore: 78,
      },
    ],
    share: { visibility: "private", url: "" },
  };
}

// Pre-generate all template resumes
export const TEMPLATE_RESUMES: Resume[] = RESUME_TEMPLATES.map((t) => createTemplateResume(t.id));

// Keep the original MOCK_RESUMES array for backward compatibility
export const MOCK_RESUMES: Resume[] = [createTemplateResume("professional")];

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
        (p) => [p.name, p.description, p.technologies.length ? "x" : "", p.achievements.length ? "x" : ""].filter(Boolean)
          .length / 4,
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
  const experience = clamp(sectionCompletion(resume, { id: "experience", kind: "experience", title: "", visible: true,
    removable: true }));
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

export async function mockParseResume(file: File): Promise<ParsedImport> {
  await delay(1600);
  if (!/\.(pdf|docx)$/i.test(file.name)) {
    throw new Error("Unsupported file type. Upload a PDF or DOCX file.");
  }
  return { experience: 3, education: 1, skills: 14, projects: 2, certifications: 1 };
}