import { createFileRoute } from "@tanstack/react-router";
import { Faq, FinalCta, Pricing } from "@/components/marketing/sections";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteNavbar } from "@/components/marketing/site-navbar";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — CareerOS AI" },
      {
        name: "description",
        content:
          "Free forever plan, Spark at $19/month with unlimited AI and custom domains, plus Enterprise for universities and recruiters.",
      },
      { property: "og:title", content: "Pricing — CareerOS AI" },
      {
        property: "og:description",
        content: "Compare Free, Spark and Enterprise plans. Start free, no credit card required.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="min-h-svh bg-background">
      <SiteNavbar />
      <main>
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
