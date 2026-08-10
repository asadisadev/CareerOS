import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/ats")({
  head: () => ({
    meta: [
      { title: "ATS Score — CareerOS AI" },
      { name: "description", content: "Score your resume against any job description and fix what blocks you." },
      { property: "og:title", content: "ATS Score — CareerOS AI" },
      { property: "og:description", content: "Score your resume against any job description and fix what blocks you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader title="ATS Score" description="Score your resume against any job description and fix what blocks you." />
      <EmptyState
        icon={ShieldCheck}
        title="ATS Score is coming next"
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
