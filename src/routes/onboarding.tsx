import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingLayout,
});

function OnboardingLayout() {
  return (
    <div className="relative flex min-h-svh flex-col">
      <span className="pointer-events-none absolute inset-0 surface-glow" />
      <span className="pointer-events-none absolute inset-0 opacity-25 grid-lines [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <header className="relative flex items-center justify-between px-5 py-5 sm:px-10">
        <Link to="/" aria-label="CareerOS AI home">
          <Logo />
        </Link>
        <ThemeToggle />
      </header>
      <main className="relative flex flex-1 flex-col px-4 pb-10 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}
