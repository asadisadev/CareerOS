import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Redo2, Save, Smartphone, Tablet, Undo2 } from "lucide-react";
import { MOCK_PORTFOLIOS, portfolioQuality, portfolioUrl } from "@/data/portfolio";
import {
  PortfolioEditorProvider,
  PortfolioPlanProvider,
  usePortfolioEditor,
} from "@/lib/portfolio-store";
import { DeviceFrame, type Device } from "@/components/app/portfolio/website";
import { SectionNav } from "@/components/app/portfolio/section-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScorePill } from "@/components/app/resume/shared";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio builder — CareerOS AI" },
      { name: "description", content: "Compose sections, pick a theme and publish to your domain." },
      { property: "og:title", content: "Portfolio builder — CareerOS AI" },
      { property: "og:description", content: "Compose sections, pick a theme and publish to your domain." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const DEVICES: { id: Device; label: string; icon: typeof Monitor }[] = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
];

function Builder() {
  const { portfolio, saveStatus, saveNow, undo, redo, canUndo, canRedo, device, setDevice } =
    usePortfolioEditor();
  const quality = portfolioQuality(portfolio);

  return (
    <div className="space-y-4">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border bg-card/60 p-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <h1 className="truncate font-display text-lg font-bold sm:text-xl">{portfolio.name}</h1>
            <Badge variant="secondary" className="shrink-0 rounded-full capitalize">
              {portfolio.status}
            </Badge>
          </div>
          <p className="truncate text-xs text-muted-foreground">{portfolioUrl(portfolio)}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <ScorePill value={quality.overall} />
          <div className="flex items-center gap-1 rounded-full border border-border p-0.5">
            {DEVICES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                aria-label={label}
                onClick={() => setDevice(id)}
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors",
                  device === id && "bg-primary/12 text-primary",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
          <Button variant="ghost" size="icon" aria-label="Undo" onClick={undo} disabled={!canUndo}>
            <Undo2 />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Redo" onClick={redo} disabled={!canRedo}>
            <Redo2 />
          </Button>
          <Button variant="hero" onClick={saveNow}>
            <Save /> {saveStatus === "saving" ? "Saving…" : saveStatus === "saved" ? "Saved" : "Save"}
          </Button>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="h-[70vh] min-h-0 overflow-hidden rounded-2xl border border-border bg-card/60">
          <SectionNav />
        </aside>
        <div className="h-[70vh] min-h-0">
          <DeviceFrame portfolio={portfolio} device={device} />
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <PortfolioPlanProvider>
      <PortfolioEditorProvider initial={MOCK_PORTFOLIOS[0]!}>
        <Builder />
      </PortfolioEditorProvider>
    </PortfolioPlanProvider>
  );
}
