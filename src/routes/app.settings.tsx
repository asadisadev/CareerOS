import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CareerOS AI" },
      { name: "description", content: "Profile, notifications, domains and privacy controls." },
      { property: "og:title", content: "Settings — CareerOS AI" },
      { property: "og:description", content: "Profile, notifications, domains and privacy controls." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Profile, notifications, domains and privacy controls." />
      <EmptyState
        icon={Settings}
        title="Settings is coming next"
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
