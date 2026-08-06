import { createFileRoute, Link } from "@tanstack/react-router";
import { BriefcaseBusiness } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/jobs")({
  head: () => ({
    meta: [
      { title: "Job matches — CareerOS AI" },
      { name: "description", content: "Scored roles, saved jobs and your application tracker." },
      { property: "og:title", content: "Job matches — CareerOS AI" },
      { property: "og:description", content: "Scored roles, saved jobs and your application tracker." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader title="Job matches" description="Scored roles, saved jobs and your application tracker." />
      <EmptyState
        icon={BriefcaseBusiness}
        title="Job matches is coming next"
        description="This workspace module is scaffolded. Start from the landing page tour or head back to your dashboard."
        action={
          <Button asChild variant="hero">
            <Link to="/app">Back to dashboard</Link>
          </Button>
        }
      />
    </div>
  );
}
