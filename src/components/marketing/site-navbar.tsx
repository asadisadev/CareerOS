import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { label: "Features", to: "/features" },
  { label: "Templates", to: "/templates" },
  { label: "Pricing", to: "/pricing" },
  { label: "How it works", to: "/how-it-works" },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 glass">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-5 lg:px-8"
      >
        <Link to="/" className="min-w-0 shrink-0" aria-label="CareerOS AI home">
          <Logo />
        </Link>

        <ul className="hidden flex-1 items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                activeProps={{ className: "text-foreground bg-accent" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/auth/login">Sign in</Link>
          </Button>
          <Button asChild variant="hero" className="hidden sm:inline-flex">
            <Link to="/auth/register">Get started free</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
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
                  <li key={link.to}>
                    <Link
                      to={link.to}
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
                  <Link to="/auth/login">Sign in</Link>
                </Button>
                <Button asChild variant="hero" size="lg" onClick={() => setOpen(false)}>
                  <Link to="/auth/register">Get started free</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
