import { createFileRoute, Link } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/applications")({
  head: () => ({
    meta: [
      { title: "Applications — CareerOS AI" },
      { name: "description", content: "Track every application from saved to offer." },
      { property: "og:title", content: "Applications — CareerOS AI" },
      { property: "og:description", content: "Track every application from saved to offer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader title="Applications" description="Track every application from saved to offer." />
      <EmptyState
        icon={Send}
        title="Applications is coming next"
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
