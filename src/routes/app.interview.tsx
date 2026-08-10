import { createFileRoute, Link } from "@tanstack/react-router";
import { Mic } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/interview")({
  head: () => ({
    meta: [
      { title: "Interview Preparation — CareerOS AI" },
      { name: "description", content: "Practice role-specific interview drills with AI feedback." },
      { property: "og:title", content: "Interview Preparation — CareerOS AI" },
      { property: "og:description", content: "Practice role-specific interview drills with AI feedback." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader title="Interview Preparation" description="Practice role-specific interview drills with AI feedback." />
      <EmptyState
        icon={Mic}
        title="Interview Preparation is coming next"
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
