import { createFileRoute, Link } from "@tanstack/react-router";
import { LineChart } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({
    meta: [
      { title: "Career analytics — CareerOS AI" },
      { name: "description", content: "Portfolio visits, resume views and score progression." },
      { property: "og:title", content: "Career analytics — CareerOS AI" },
      { property: "og:description", content: "Portfolio visits, resume views and score progression." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader title="Career analytics" description="Portfolio visits, resume views and score progression." />
      <EmptyState
        icon={LineChart}
        title="Career analytics is coming next"
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
