import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, HowItWorks, Testimonials } from "@/components/marketing/sections";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteNavbar } from "@/components/marketing/site-navbar";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How CareerOS AI Works" },
      {
        name: "description",
        content:
          "Import your story, let AI sharpen it, then publish and apply. Most users ship a portfolio and optimized resume in under 30 minutes.",
      },
      { property: "og:title", content: "How CareerOS AI Works" },
      {
        property: "og:description",
        content: "Three steps from blank page to shortlisted candidate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <div className="min-h-svh bg-background">
      <SiteNavbar />
      <main>
        <HowItWorks />
        <Testimonials />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
