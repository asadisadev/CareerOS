import { createFileRoute, Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/linkedin")({
  head: () => ({
    meta: [
      { title: "LinkedIn Optimizer — CareerOS AI" },
      { name: "description", content: "Rewrite your headline, About and experience for recruiter search." },
      { property: "og:title", content: "LinkedIn Optimizer — CareerOS AI" },
      { property: "og:description", content: "Rewrite your headline, About and experience for recruiter search." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader title="LinkedIn Optimizer" description="Rewrite your headline, About and experience for recruiter search." />
      <EmptyState
        icon={Linkedin}
        title="LinkedIn Optimizer is coming next"
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
