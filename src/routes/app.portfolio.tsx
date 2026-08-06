import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutTemplate } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

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

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader title="Portfolio builder" description="Compose sections, pick a theme and publish to your domain." />
      <EmptyState
        icon={LayoutTemplate}
        title="Portfolio builder is coming next"
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
