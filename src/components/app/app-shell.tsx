import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  ChartNoAxesColumn,
  CreditCard,
  FileText,
  LayoutDashboard,
  LayoutTemplate,
  Search,
  Settings,
  Shield,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { currentUser } from "@/data/mock";

const primaryNav = [
  { label: "Dashboard", to: "/app" as const, icon: LayoutDashboard },
  { label: "Resume Builder", to: "/app/resume" as const, icon: FileText },
  { label: "Portfolio Builder", to: "/app/portfolio" as const, icon: LayoutTemplate },
  { label: "Jobs", to: "/app/jobs" as const, icon: Briefcase },
  { label: "AI Coach", to: "/app/coach" as const, icon: Bot },
  { label: "Analytics", to: "/app/analytics" as const, icon: ChartNoAxesColumn },
];

const accountNav = [
  { label: "Billing", to: "/app/billing" as const, icon: CreditCard },
  { label: "Settings", to: "/app/settings" as const, icon: Settings },
  { label: "Admin", to: "/app/admin" as const, icon: Shield },
];

function NavList({
  items,
  pathname,
}: {
  items: typeof primaryNav;
  pathname: string;
}) {
  return (
    <SidebarMenu>
      {items.map((item) => {
        const active = item.to === "/app" ? pathname === "/app" : pathname.startsWith(item.to);
        return (
          <SidebarMenuItem key={item.to}>
            <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
              <Link to={item.to}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="px-3 py-4">
          <Link to="/" aria-label="CareerOS AI home">
            <Logo className="group-data-[collapsible=icon]:justify-center" />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <NavList items={primaryNav} pathname={pathname} />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <NavList items={accountNav} pathname={pathname} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-3 group-data-[collapsible=icon]:hidden">
          <div className="rounded-2xl border border-border bg-primary-soft/60 p-4">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> Spark plan
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Unlimited AI credits renew on Sep 1.
            </p>
            <Button asChild size="sm" variant="hero" className="mt-3 w-full">
              <Link to="/app/billing">Manage plan</Link>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border glass px-4 lg:px-6">
          <SidebarTrigger className="shrink-0" />
          <div className="relative hidden min-w-0 flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search resumes, jobs, sections…"
              className="h-10 max-w-md rounded-xl pl-9"
              aria-label="Search workspace"
            />
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <Badge variant="secondary" className="hidden rounded-full lg:inline-flex">
              ATS 91
            </Badge>
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="ml-1 flex items-center gap-2 rounded-full p-0.5 pr-2 transition-colors hover:bg-accent"
                  aria-label="Account menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-brand text-xs font-bold text-primary-foreground">
                      {currentUser.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium sm:inline">{currentUser.name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="text-sm font-semibold">{currentUser.name}</p>
                  <p className="text-xs font-normal text-muted-foreground">{currentUser.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/app/settings">Profile & settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/billing">Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/auth/login">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="min-h-[calc(100svh-4rem)] bg-background px-4 py-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-7xl space-y-8">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
