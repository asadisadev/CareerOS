import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const groups = [
  {
    title: "Company",
    links: [
      { label: "About CareerOS", to: "/features" as const },
      { label: "How it works", to: "/how-it-works" as const },
      { label: "Pricing", to: "/pricing" as const },
      { label: "Careers", to: "/features" as const },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resume templates", to: "/templates" as const },
      { label: "Portfolio themes", to: "/templates" as const },
      { label: "ATS guide", to: "/how-it-works" as const },
      { label: "Interview prep", to: "/features" as const },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", to: "/how-it-works" as const },
      { label: "Contact sales", to: "/pricing" as const },
      { label: "Sign in", to: "/auth/login" as const },
      { label: "Create account", to: "/auth/register" as const },
    ],
  },
];

const socials = [
  { label: "LinkedIn", icon: Linkedin },
  { label: "X", icon: Twitter },
  { label: "GitHub", icon: Github },
  { label: "YouTube", icon: Youtube },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_2fr] lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            CareerOS AI is the career operating system for students, graduates and professionals.
            Build your resume, publish your portfolio, and get matched with the roles you deserve.
          </p>
          <p className="text-xs text-muted-foreground">Build. Showcase. Get Hired.</p>
          <div className="flex items-center gap-2 pt-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} CareerOS AI. All rights reserved.</p>
          <p className="flex flex-wrap gap-4">
            <a href="#" className="transition-colors hover:text-foreground">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-foreground">Security</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
