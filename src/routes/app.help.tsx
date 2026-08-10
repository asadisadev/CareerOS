import { createFileRoute, Link } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/help")({
  head: () => ({
    meta: [
      { title: "Help Center — CareerOS AI" },
      { name: "description", content: "Guides, docs and support for your CareerOS workspace." },
      { property: "og:title", content: "Help Center — CareerOS AI" },
      { property: "og:description", content: "Guides, docs and support for your CareerOS workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader title="Help Center" description="Guides, docs and support for your CareerOS workspace." />
      <EmptyState
        icon={LifeBuoy}
        title="Help Center is coming next"
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
