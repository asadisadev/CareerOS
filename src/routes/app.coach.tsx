import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/coach")({
  head: () => ({
    meta: [
      { title: "AI career coach — CareerOS AI" },
      { name: "description", content: "Grounded advice on your real resume and portfolio." },
      { property: "og:title", content: "AI career coach — CareerOS AI" },
      { property: "og:description", content: "Grounded advice on your real resume and portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader title="AI career coach" description="Grounded advice on your real resume and portfolio." />
      <EmptyState
        icon={Bot}
        title="AI career coach is coming next"
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
