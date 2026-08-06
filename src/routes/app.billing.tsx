import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/billing")({
  head: () => ({
    meta: [
      { title: "Billing — CareerOS AI" },
      { name: "description", content: "Manage your plan, payment method and invoices." },
      { property: "og:title", content: "Billing — CareerOS AI" },
      { property: "og:description", content: "Manage your plan, payment method and invoices." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader title="Billing" description="Manage your plan, payment method and invoices." />
      <EmptyState
        icon={CreditCard}
        title="Billing is coming next"
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
