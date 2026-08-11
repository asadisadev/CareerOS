import { useState } from "react";
import {
  ChevronDown,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";
import {
  SECTION_LIBRARY,
  sectionCompletion,
  uid,
  type SectionKind,
  type SectionMeta,
} from "@/data/resume";
import { useResumeEditor } from "@/lib/resume-store";
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
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { DynIcon } from "@/components/app/dashboard/primitives";
import { DragHandle, IconButton, useDragReorder } from "./shared";

export function SectionNav() {
  const { resume, update, activeSectionId, setActiveSectionId } = useResumeEditor();
  const [showHidden, setShowHidden] = useState(true);

  const reorder = (from: number, to: number) =>
    update((draft) => {
      const [moved] = draft.sections.splice(from, 1);
      if (moved) draft.sections.splice(to, 0, moved);
    });

  const { dragIndex, overIndex, handlers } = useDragReorder(reorder);

  const addSection = (kind: SectionKind) => {
    const meta = SECTION_LIBRARY.find((s) => s.kind === kind);
    const id = kind === "custom" ? `custom_${uid()}` : kind;
    update((draft) => {
      if (draft.sections.some((s) => s.id === id)) return;
      draft.sections.push({
        id,
        kind,
        title: kind === "custom" ? "Custom Section" : (meta?.title ?? "Section"),
        visible: true,
        removable: true,
      });
      if (kind === "custom") draft.content.custom[id] = { description: "", blocks: [] };
    });
    setActiveSectionId(id);
  };

  const removeSection = (section: SectionMeta) =>
    update((draft) => {
      draft.sections = draft.sections.filter((s) => s.id !== section.id);
      if (section.kind === "custom") delete draft.content.custom[section.id];
    });

  const available = SECTION_LIBRARY.filter(
    (s) => s.kind === "custom" || !resume.sections.some((existing) => existing.id === s.kind),
  );

  const visibleSections = showHidden
    ? resume.sections
    : resume.sections.filter((s) => s.visible);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 px-1 pb-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sections
          </p>
          <p className="truncate text-[0.7rem] text-muted-foreground">Drag to reorder</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-[0.7rem]"
          onClick={() => setShowHidden((v) => !v)}
        >
          {showHidden ? "Hide hidden" : "Show all"}
        </Button>
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1" aria-label="Resume sections">
        {visibleSections.map((section) => {
          const index = resume.sections.indexOf(section);
          const completion = sectionCompletion(resume, section);
          const meta = SECTION_LIBRARY.find((s) => s.kind === section.kind);
          const isActive = section.id === activeSectionId;
          return (
            <div
              key={section.id}
              {...handlers(index)}
              className={cn(
                "group rounded-xl border border-transparent transition-colors",
                overIndex === index && dragIndex !== null && dragIndex !== index && "border-primary/40",
                dragIndex === index && "opacity-50",
              )}
            >
              <button
                type="button"
                onClick={() => setActiveSectionId(section.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left transition-colors",
                  isActive ? "bg-primary/10 text-foreground" : "hover:bg-muted/70",
                  !section.visible && "opacity-55",
                )}
              >
                <DragHandle label={`Reorder ${section.title}`} />
                <DynIcon
                  name={meta?.icon ?? "Circle"}
                  className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground")}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-medium">{section.title}</span>
                    {completion === 100 ? (
                      <span className="shrink-0 text-xs font-bold text-success" aria-label="complete">
                        ✓
                      </span>
                    ) : (
                      <span className="shrink-0 text-[0.68rem] font-semibold text-muted-foreground tabular-nums">
                        {completion}%
                      </span>
                    )}
                  </span>
                  <Progress value={completion} className="mt-1.5 h-1" />
                </span>
              </button>
              <div className="flex items-center justify-end gap-0.5 px-2 pb-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
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
                <IconButton
                  label="Delete section"
                  disabled={!section.removable}
                  onClick={() => removeSection(section)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </IconButton>
              </div>
            </div>
          );
        })}
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="soft" className="mt-3 w-full justify-between rounded-xl">
            <span className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add section
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>Section library</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {available.map((item) => (
            <DropdownMenuItem key={item.kind} onSelect={() => addSection(item.kind)}>
              <DynIcon name={item.icon} className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">{item.title}</span>
              {item.kind === "custom" && (
                <Badge variant="secondary" className="rounded-full text-[0.6rem]">
                  new
                </Badge>
              )}
            </DropdownMenuItem>
          ))}
          {!available.length && (
            <p className="px-2 py-3 text-xs text-muted-foreground">All sections are in use.</p>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
