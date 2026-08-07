export const countries = [
  "Pakistan",
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "Netherlands",
  "United Arab Emirates",
  "Australia",
  "Singapore",
  "India",
  "Other",
];

export type InterviewQuestion = {
  id: string;
  prompt: string;
  hint?: string;
  placeholder?: string;
  multiline?: boolean;
  options?: string[];
  suggestions?: string[];
  optional?: boolean;
};

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "name",
    prompt: "First things first — what's your name?",
    hint: "This is how your resume and portfolio will introduce you.",
    placeholder: "Ayesha Malik",
  },
  {
    id: "role",
    prompt: "What is your current role?",
    placeholder: "Frontend Engineer",
    suggestions: ["Student", "Frontend Engineer", "Product Designer", "Data Analyst"],
  },
  {
    id: "stage",
    prompt: "Which best describes you right now?",
    options: ["Student", "Graduate", "Professional", "Freelancer", "Career Switcher"],
  },
  {
    id: "industry",
    prompt: "What industry are you interested in?",
    options: ["Software & AI", "Design", "Finance", "Healthcare", "Marketing", "Education"],
  },
  {
    id: "targetRole",
    prompt: "What's your preferred job role?",
    placeholder: "Senior Frontend Engineer",
    suggestions: ["Frontend Engineer", "Full-stack Engineer", "UX Designer", "ML Engineer"],
  },
  {
    id: "experience",
    prompt: "How much experience do you have?",
    options: ["No experience yet", "0–1 years", "1–3 years", "3–5 years", "5+ years"],
  },
  {
    id: "education",
    prompt: "Tell me about your education.",
    placeholder: "BS Computer Science, NUST — 2024",
    multiline: true,
  },
  {
    id: "technicalSkills",
    prompt: "Which technical skills should we highlight?",
    placeholder: "React, TypeScript, Node.js, SQL",
    suggestions: ["React", "TypeScript", "Python", "Figma", "SQL"],
    multiline: true,
  },
  {
    id: "softSkills",
    prompt: "And your strongest soft skills?",
    suggestions: ["Communication", "Leadership", "Problem solving", "Ownership"],
    placeholder: "Communication, ownership, mentoring",
  },
  {
    id: "projects",
    prompt: "Any projects you're proud of?",
    placeholder: "CareerOS clone — a resume builder used by 400 students",
    multiline: true,
    optional: true,
  },
  {
    id: "certificates",
    prompt: "Certificates worth listing?",
    placeholder: "AWS Cloud Practitioner, Google UX Design",
    optional: true,
  },
  {
    id: "achievements",
    prompt: "What achievements should recruiters see first?",
    placeholder: "Cut page load time by 62% for 1.2M users",
    multiline: true,
    optional: true,
  },
  {
    id: "languages",
    prompt: "Which languages do you speak?",
    suggestions: ["English", "Urdu", "German", "French"],
    placeholder: "English (fluent), Urdu (native)",
  },
  {
    id: "country",
    prompt: "Which country do you want to work in?",
    options: countries.slice(0, 8),
  },
  {
    id: "workMode",
    prompt: "Remote or onsite?",
    options: ["Remote", "Hybrid", "Onsite", "Open to all"],
  },
  {
    id: "salary",
    prompt: "What's your expected salary range?",
    options: ["Entry level", "$40k–70k", "$70k–110k", "$110k–160k", "$160k+"],
  },
  {
    id: "github",
    prompt: "Drop your GitHub, if you have one.",
    placeholder: "github.com/username",
    optional: true,
  },
  {
    id: "linkedin",
    prompt: "And your LinkedIn?",
    placeholder: "linkedin.com/in/username",
    optional: true,
  },
  {
    id: "portfolio",
    prompt: "Do you have an existing portfolio?",
    placeholder: "dribbble.com/username",
    optional: true,
  },
  {
    id: "website",
    prompt: "Personal website?",
    placeholder: "ayesha.dev",
    optional: true,
  },
  {
    id: "goals",
    prompt: "What are your career goals for the next 12 months?",
    placeholder: "Land a senior role at a product company abroad",
    multiline: true,
  },
  {
    id: "dreamCompany",
    prompt: "Last one — what's your dream company?",
    suggestions: ["Linear", "Stripe", "Vercel", "Figma", "Google"],
    placeholder: "Stripe",
  },
];
