import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

const perks = [
  "ATS-optimized resumes in minutes",
  "Hosted portfolio with custom domain",
  "AI career coach trained on your profile",
  "Job matching with skill-gap analysis",
];

function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-card p-12 lg:flex">
        <span className="pointer-events-none absolute inset-0 surface-glow" />
        <span className="pointer-events-none absolute inset-0 opacity-30 grid-lines [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative">
          <Link to="/" aria-label="CareerOS AI home">
            <Logo />
          </Link>
        </div>
        <div className="relative max-w-md space-y-6">
          <h2 className="text-balance text-3xl font-extrabold leading-tight">
            Your career, <span className="text-gradient">operating system</span>
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Join 142,000 students, graduates and professionals building their professional identity
            with CareerOS AI.
          </p>
          <ul className="space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-muted-foreground">{perk}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-muted-foreground">Build. Showcase. Get Hired.</p>
      </aside>

      <main className="flex flex-col px-5 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <div className="mb-8 lg:hidden">
              <Logo />
            </div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
