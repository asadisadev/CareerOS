import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Redo2, Save, Sparkles, Undo2, ZoomIn, ZoomOut } from "lucide-react";
import {
  analyzeAts,
  atsRecommendations,
  qualityScore,
  qualityWarnings,
  scoreLabel,
  MOCK_RESUMES,
} from "@/data/resume";
import { PlanProvider, ResumeEditorProvider, useResumeEditor } from "@/lib/resume-store";
import { SectionNav } from "@/components/app/resume/section-nav";
import { SectionEditor } from "@/components/app/resume/editor";
import { ResumeDocument } from "@/components/app/resume/preview";
import { ScorePill } from "@/components/app/resume/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/app/resume")({
  head: () => ({
    meta: [
      { title: "Resume builder — CareerOS AI" },
      {
        name: "description",
        content:
          "Build, tailor and score ATS-ready resumes with live preview and AI writing help.",
      },
      { property: "og:title", content: "Resume builder — CareerOS AI" },
      {
        property: "og:description",
        content: "Build, tailor and score ATS-ready resumes with live preview and AI writing help.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Toolbar() {
  const { resume, update, saveStatus, saveNow, undo, redo, canUndo, canRedo } = useResumeEditor();
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border pb-4">
      <div className="min-w-0">
        <input
          value={resume.name}
          aria-label="Resume name"
          onChange={(event) =>
            update((draft) => {
              draft.name = event.target.value;
            })
          }
          className="w-full truncate bg-transparent font-display text-xl font-bold outline-none"
        />
        <p className="text-xs text-muted-foreground">
          {saveStatus === "saving"
            ? "Saving…"
            : saveStatus === "unsaved"
              ? "Unsaved changes"
              : saveStatus === "error"
                ? "Could not save"
                : "All changes saved"}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Undo" disabled={!canUndo} onClick={undo}>
          <Undo2 />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Redo" disabled={!canRedo} onClick={redo}>
          <Redo2 />
        </Button>
        <Button variant="hero" size="sm" onClick={saveNow}>
          <Save /> Save
        </Button>
      </div>
    </div>
  );
}

function InsightsPanel() {
  const { resume, setActiveSectionId } = useResumeEditor();
  const ats = useMemo(() => analyzeAts(resume), [resume]);
  const quality = useMemo(() => qualityScore(resume, ats), [resume, ats]);
  const recommendations = useMemo(() => atsRecommendations(resume, ats), [resume, ats]);
  const warnings = useMemo(() => qualityWarnings(resume), [resume]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card/70 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            ATS score
          </p>
          <ScorePill value={ats.overall} />
        </div>
        <p className="mt-1 font-display text-3xl font-bold tabular-nums">{ats.overall}</p>
        <p className="text-xs text-muted-foreground">{scoreLabel(ats.overall)}</p>
        <div className="mt-4 space-y-2.5">
          {(
            [
              ["Keywords", ats.keywords],
              ["Formatting", ats.formatting],
              ["Skills", ats.skills],
              ["Experience", ats.experience],
              ["Achievements", ats.achievements],
              ["Readability", ats.readability],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <div className="flex justify-between text-[0.7rem] text-muted-foreground">
                <span>{label}</span>
                <span className="tabular-nums">{value}</span>
              </div>
              <Progress value={value} className="mt-1 h-1.5" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Quality score
        </p>
        <p className="mt-1 font-display text-2xl font-bold tabular-nums">{quality.overall}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {quality.categories.map((c) => (
            <Badge key={c.label} variant="secondary" className="rounded-full text-[0.65rem]">
              {c.label} {c.value}
            </Badge>
          ))}
        </div>
        {warnings.length > 0 && (
          <>
            <Separator className="my-4" />
            <ul className="space-y-1.5">
              {warnings.map((w) => (
                <li key={w.id} className="flex items-start gap-2 text-xs">
                  <span
                    className={
                      w.tone === "critical"
                        ? "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive"
                        : "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning"
                    }
                  />
                  <span className="text-muted-foreground">{w.label}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="space-y-3">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Recommendations
        </p>
        {recommendations.map((rec) => (
          <div key={rec.id} className="rounded-2xl border border-border bg-card/70 p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold">{rec.title}</p>
              <Badge
                variant={rec.severity === "critical" ? "destructive" : "secondary"}
                className="shrink-0 rounded-full text-[0.6rem] capitalize"
              >
                {rec.severity}
              </Badge>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">{rec.why}</p>
            <p className="mt-1.5 text-xs">{rec.how}</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 h-7 px-2 text-[0.7rem]"
              onClick={() => setActiveSectionId(rec.sectionId)}
            >
              Fix in editor
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewPanel() {
  const { resume } = useResumeEditor();
  const [zoom, setZoom] = useState(0.62);
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 pb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Live preview
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(0.4, Number((z - 0.08).toFixed(2))))}
          >
            <ZoomOut />
          </Button>
          <span className="w-10 text-center text-xs tabular-nums text-muted-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(1.2, Number((z + 0.08).toFixed(2))))}
          >
            <ZoomIn />
          </Button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto rounded-2xl bg-muted/40 p-5">
        <ResumeDocument resume={resume} zoom={zoom} />
      </div>
    </div>
  );
}

function Builder() {
  return (
    <div className="space-y-5">
      <Toolbar />
      <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)_320px]">
        <aside className="hidden xl:block">
          <div className="sticky top-4 h-[calc(100vh-8rem)]">
            <SectionNav />
          </div>
        </aside>

        <div className="min-w-0">
          <Tabs defaultValue="edit" className="xl:hidden">
            <TabsList className="w-full">
              <TabsTrigger value="sections" className="flex-1">
                Sections
              </TabsTrigger>
              <TabsTrigger value="edit" className="flex-1">
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex-1">
                Preview
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex-1">
                ATS
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sections" className="pt-4">
              <SectionNav />
            </TabsContent>
            <TabsContent value="edit" className="pt-4">
              <SectionEditor />
            </TabsContent>
            <TabsContent value="preview" className="h-[70vh] pt-4">
              <PreviewPanel />
            </TabsContent>
            <TabsContent value="insights" className="pt-4">
              <InsightsPanel />
            </TabsContent>
          </Tabs>
          <div className="hidden xl:block">
            <SectionEditor />
          </div>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-4 space-y-6">
            <div className="h-[52vh]">
              <PreviewPanel />
            </div>
            <div className="max-h-[38vh] overflow-y-auto pr-1">
              <InsightsPanel />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Page() {
  const initial = MOCK_RESUMES[0];
  if (!initial) return null;
  return (
    <PlanProvider>
      <ResumeEditorProvider initial={initial}>
        <Builder />
      </ResumeEditorProvider>
    </PlanProvider>
  );
}
