import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { label: "Features", to: "/", hash: "features" },
  { label: "Resume Builder", to: "/", hash: "resume-builder" },
  { label: "Portfolio Builder", to: "/", hash: "portfolio-builder" },
  { label: "AI Career Coach", to: "/", hash: "ai-coach" },
  { label: "Pricing", to: "/pricing", hash: "pricing" },
  { label: "FAQ", to: "/", hash: "faq" },
] as const;

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 glass">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-5 lg:px-8"
      >
        <Link to="/" className="min-w-0 shrink-0" aria-label="CareerOS AI home">
          <Logo />
        </Link>

        <ul className="hidden flex-1 items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                hash={link.hash}
                className="rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild variant="hero" className="hidden sm:inline-flex">
            <Link to="/auth/register">Get Started Free</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm p-6">
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X />
                </Button>
              </div>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      hash={link.hash}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 text-base font-medium hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-2">
                <Button asChild variant="outline" size="lg" onClick={() => setOpen(false)}>
                  <Link to="/auth/login">Login</Link>
                </Button>
                <Button asChild variant="hero" size="lg" onClick={() => setOpen(false)}>
                  <Link to="/auth/register">Get Started Free</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
