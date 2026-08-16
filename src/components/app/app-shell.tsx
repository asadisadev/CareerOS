import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  Bot,
  Briefcase,
  ChartNoAxesColumn,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  Linkedin,
  MessageSquare,
  Mic,
  Search,
  Send,
  Settings,
  Shield,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Logo } from "../../components/brand/logo";
import { ThemeToggle } from "../../components/common/theme-toggle";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
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
} from "../../components/ui/sidebar";
import { messages, notifications } from "../../data/dashboard";
import { currentUser } from "../../data/mock";
import { cn } from "../../lib/utils";

const primaryNav = [
  { label: "Dashboard", to: "/app" as const, icon: LayoutDashboard },
  { label: "Resume Builder", to: "/app/resume" as const, icon: FileText },
  { label: "Portfolio Builder", to: "/app/portfolio" as const, icon: LayoutTemplate },
  { label: "ATS Score", to: "/app/ats" as const, icon: ShieldCheck },
  { label: "Job Matches", to: "/app/jobs" as const, icon: Briefcase },
  { label: "Applications", to: "/app/applications" as const, icon: Send },
  { label: "AI Career Coach", to: "/app/coach" as const, icon: Bot },
  { label: "Learning Roadmap", to: "/app/roadmap" as const, icon: GraduationCap },
  { label: "Interview Prep", to: "/app/interview" as const, icon: Mic },
  { label: "LinkedIn Optimizer", to: "/app/linkedin" as const, icon: Linkedin },
  { label: "Analytics", to: "/app/analytics" as const, icon: ChartNoAxesColumn },
];

const accountNav = [
  { label: "Billing", to: "/app/billing" as const, icon: CreditCard },
  { label: "Settings", to: "/app/settings" as const, icon: Settings },
  { label: "Help Center", to: "/app/help" as const, icon: LifeBuoy },
  { label: "Admin", to: "/app/admin" as const, icon: Shield },
];

type NavItem = (typeof primaryNav)[number] | (typeof accountNav)[number];

function NavList({ items, pathname }: { items: readonly NavItem[]; pathname: string }) {
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

function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search or ask AI anything…" />
      <CommandList>
        <CommandEmpty>No results yet — try “resume” or “interview”.</CommandEmpty>
        <CommandGroup heading="AI quick ask">
          {["Improve my ATS score", "Draft a cover letter", "Find remote React roles"].map((p) => (
            <CommandItem key={p} onSelect={() => onOpenChange(false)}>
              <Sparkles /> {p}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Navigate">
          {[...primaryNav, ...accountNav].map((n) => (
            <CommandItem key={n.to} onSelect={() => onOpenChange(false)}>
              <n.icon /> {n.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function AppShell() {
  // const pathname = useRouterState({ select: (s) => s.location.pathname });
  const pathname = useLocation().pathname;
  const [paletteOpen, setPaletteOpen] = useState(false);
  const unread = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
          <button
            onClick={() => setPaletteOpen(true)}
            className="relative hidden h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-card/70 px-3 text-left text-sm text-muted-foreground transition-colors hover:border-primary/40 md:flex md:max-w-md"
            aria-label="Open command palette"
          >
            <Search className="h-4 w-4" />
            <span className="truncate">Search resumes, jobs, sections…</span>
            <kbd className="ml-auto hidden rounded-md border border-border bg-muted px-1.5 py-0.5 text-[0.65rem] font-semibold lg:block">
              ⌘K
            </kbd>
          </button>
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <Button
              variant="soft"
              size="sm"
              className="hidden rounded-full lg:inline-flex"
              onClick={() => setPaletteOpen(true)}
            >
              <Sparkles /> AI quick ask
            </Button>
            <Badge variant="secondary" className="hidden rounded-full xl:inline-flex">
              ATS 91
            </Badge>
            <ThemeToggle />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Messages" className="relative">
                  <MessageSquare />
                  <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 rounded-2xl p-0">
                <p className="border-b border-border p-4 text-sm font-semibold">Messages</p>
                <ul className="divide-y divide-border">
                  {messages.map((m) => (
                    <li key={m.from} className="flex gap-3 p-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary-soft text-[0.65rem] font-bold text-primary">
                          {m.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{m.from}</p>
                        <p className="truncate text-xs text-muted-foreground">{m.preview}</p>
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">{m.time}</span>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                  <Bell />
                  {unread > 0 && (
                    <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 rounded-2xl p-0">
                <div className="flex items-center justify-between border-b border-border p-4">
                  <p className="text-sm font-semibold">Notifications</p>
                  <Badge variant="secondary" className="rounded-full">
                    {unread} new
                  </Badge>
                </div>
                <ul className="divide-y divide-border">
                  {notifications.map((n) => (
                    <li key={n.title} className={cn("p-4", n.unread && "bg-primary-soft/30")}>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium">{n.title}</p>
                        <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{n.detail}</p>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="ml-1 flex items-center gap-2 rounded-full p-0.5 pr-2 transition-colors hover:bg-accent"
                  aria-label="Account menu"
                >
                  {/* <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-brand text-xs font-bold text-primary-foreground">
                      {currentUser.initials}
                    </AvatarFallback>
                  </Avatar> */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
    J
  </div>
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
                  <Link to="/app/settings">My profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/billing">Subscription</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/help">Support</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/auth/login">Logout</Link>
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
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </SidebarProvider>
  );
}
