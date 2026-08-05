import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/logo";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/features" as const },
      { label: "Templates", to: "/templates" as const },
      { label: "Pricing", to: "/pricing" as const },
      { label: "How it works", to: "/how-it-works" as const },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Dashboard", to: "/app" as const },
      { label: "Resume builder", to: "/app/resume" as const },
      { label: "Portfolio builder", to: "/app/portfolio" as const },
      { label: "AI coach", to: "/app/coach" as const },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", to: "/auth/login" as const },
      { label: "Create account", to: "/auth/register" as const },
      { label: "Billing", to: "/app/billing" as const },
      { label: "Settings", to: "/app/settings" as const },
    ],
  },
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
          <p>Privacy · Terms · Security · Status</p>
        </div>
      </div>
    </footer>
  );
}
