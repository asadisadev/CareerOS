import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/roadmap")({
  head: () => ({
    meta: [
      { title: "Learning Roadmap — CareerOS AI" },
      { name: "description", content: "AI-generated tracks that close your skill gaps." },
      { property: "og:title", content: "Learning Roadmap — CareerOS AI" },
      { property: "og:description", content: "AI-generated tracks that close your skill gaps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader title="Learning Roadmap" description="AI-generated tracks that close your skill gaps." />
      <EmptyState
        icon={GraduationCap}
        title="Learning Roadmap is coming next"
        description="This workspace module is scaffolded. Head back to your dashboard to keep momentum."
        action={
          <Button asChild variant="hero">
            <Link to="/app">Back to dashboard</Link>
          </Button>
        }
      />
    </div>
  );
}
