import { useMemo, useState } from "react";
import {
  Eye,
  EyeOff,
  GripVertical,
  Lock,
  Plus,
  Search,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import * as Icons from "lucide-react";
import {
  PORTFOLIO_SECTION_LIBRARY,
  uid,
  type PortfolioContent,
  type PortfolioSection,
  type PortfolioSectionKind,
} from "../../../data/portfolio";
import { usePortfolioEditor, usePortfolioPlan } from "../../../lib/portfolio-store";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { IconButton, useDragReorder } from "../../../components/app/resume/shared";
import { cn } from "../../../lib/utils";

function iconFor(name: string): LucideIcon {
  const map = Icons as unknown as Record<string, LucideIcon>;
  return map[name] ?? Icons.Square;
}

/** Rough completion signal per section so the nav can show progress. */
function sectionFilled(section: PortfolioSection, content: PortfolioContent): boolean {
  switch (section.kind) {
    case "hero":
      return Boolean(content.hero.headline && content.profile.fullName);
    case "about":
      return content.about.aboutMe.trim().length > 40;
    case "skills":
      return content.skills.length >= 4;
    case "projects":
      return content.projects.length >= 1;
    case "experience":
      return content.experience.length >= 1;
    case "education":
      return content.education.length >= 1;
    case "certificates":
      return content.certificates.length >= 1;
    case "achievements":
      return content.achievements.length >= 1;
    case "testimonials":
      return content.testimonials.length >= 1;
    case "services":
      return content.services.length >= 1;
    case "blog":
      return content.blog.length >= 1;
    case "gallery":
      return content.gallery.length >= 1;
    case "timeline":
      return content.timeline.length >= 1;
    case "statistics":
      return content.statistics.length >= 1;
    case "contact":
      return Boolean(content.contact.email || content.profile.email);
    default:
      return Boolean(section.blocks?.length);
  }
}

export function SectionNav() {
  const { portfolio, update, activeSectionId, setActiveSectionId } = usePortfolioEditor();
  const { isSpark, requireSpark, sectionLimit } = usePortfolioPlan();
  const [query, setQuery] = useState("");
  const [libraryOpen, setLibraryOpen] = useState(false);

  const { sections, content } = portfolio;
  const visibleCount = sections.filter((s) => s.visible).length;
  const filledCount = sections.filter((s) => sectionFilled(s, content)).length;
  const completion = sections.length ? Math.round((filledCount / sections.length) * 100) : 0;

  const { handlers, dragIndex, overIndex } = useDragReorder((from, to) =>
    update((draft) => {
      const next = [...draft.sections];
      const [moved] = next.splice(from, 1);
      if (moved) next.splice(to, 0, moved);
      draft.sections = next;
    }),
  );

  const usedKinds = useMemo(() => new Set(sections.map((s) => s.kind)), [sections]);
  const library = PORTFOLIO_SECTION_LIBRARY.filter(
    (def) =>
      def.title.toLowerCase().includes(query.toLowerCase()) ||
      def.hint.toLowerCase().includes(query.toLowerCase()),
  );

  const addSection = (kind: PortfolioSectionKind, title: string, spark?: boolean) => {
    if (spark && !requireSpark(`the ${title} section`)) return;
    if (sections.length >= sectionLimit) {
      requireSpark("unlimited sections");
      return;
    }
    const id = uid();
    update((draft) => {
      draft.sections.push({
        id,
        kind,
        title,
        visible: true,
        ...(kind === "custom" ? { description: "", blocks: [] } : {}),
      });
    });
    setActiveSectionId(id);
    setLibraryOpen(false);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">Sections</p>
            <p className="text-xs text-muted-foreground">
              {visibleCount} visible · {completion}% complete
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0 rounded-full">
            {sections.length}
            {isSpark ? "" : `/${sectionLimit}`}
          </Badge>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${completion}%` }} />
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <ul className="space-y-1 p-3">
          {sections.map((section, index) => {
            const Icon = iconFor(
              PORTFOLIO_SECTION_LIBRARY.find((d) => d.kind === section.kind)?.icon ?? "Square",
            );
            const active = section.id === activeSectionId;
            return (
              <li
                key={section.id}
                {...handlers(index)}
                className={cn(
                  "group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1.5 rounded-xl px-2 py-2 transition-colors",
                  active ? "bg-primary/10 text-foreground" : "hover:bg-muted/60",
                  dragIndex === index && "opacity-50",
                  overIndex === index && dragIndex !== null && dragIndex !== index && "ring-1 ring-primary/40",
                )}
              >
                <span className="grid h-6 w-5 cursor-grab place-items-center text-muted-foreground/70">
                  <GripVertical className="h-3.5 w-3.5" />
                </span>
                <button
                  type="button"
                  onClick={() => setActiveSectionId(section.id)}
                  className="flex min-w-0 items-center gap-2 text-left"
                >
                  <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground")} />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{section.title}</span>
                    <span className="block truncate text-[0.7rem] text-muted-foreground">
                      {sectionFilled(section, content) ? "Complete" : "Needs content"}
                    </span>
                  </span>
                </button>
                <span className="flex shrink-0 items-center opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                  <IconButton
                    label={section.visible ? "Hide section" : "Show section"}
                    onClick={() =>
                      update((draft) => {
                        const target = draft.sections.find((s) => s.id === section.id);
                        if (target) target.visible = !target.visible;
                      })
                    }
                  >
                    {section.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </IconButton>
                  {section.kind !== "hero" && (
                    <IconButton
                      label="Remove section"
                      onClick={() =>
                        update((draft) => {
                          draft.sections = draft.sections.filter((s) => s.id !== section.id);
                        })
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </IconButton>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      <div className="border-t border-border p-3">
        <Dialog open={libraryOpen} onOpenChange={setLibraryOpen}>
          <DialogTrigger asChild>
            <Button variant="soft" className="w-full">
              <Plus /> Add section
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Section library</DialogTitle>
              <DialogDescription>
                {isSpark
                  ? "Add any of the 28 section types to your portfolio."
                  : `Free plan includes ${sectionLimit} sections and core section types.`}
              </DialogDescription>
            </DialogHeader>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections"
                className="pl-9"
              />
            </div>
            <div className="grid max-h-[52vh] gap-2 overflow-y-auto sm:grid-cols-2">
              {library.map((def) => {
                const Icon = iconFor(def.icon);
                const locked = Boolean(def.spark) && !isSpark;
                const used = usedKinds.has(def.kind) && def.kind !== "custom";
                return (
                  <button
                    key={def.kind}
                    type="button"
                    onClick={() => addSection(def.kind, def.title, def.spark)}
                    className={cn(
                      "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-xl border border-border p-3 text-left transition-colors hover:border-primary/40 hover:bg-muted/50",
                      used && "opacity-60",
                    )}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate text-sm font-semibold">{def.title}</span>
                        {locked && <Lock className="h-3 w-3 text-muted-foreground" />}
                        {used && (
                          <Badge variant="secondary" className="rounded-full px-1.5 py-0 text-[0.6rem]">
                            added
                          </Badge>
                        )}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{def.hint}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
