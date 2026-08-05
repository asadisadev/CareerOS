import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, Templates } from "@/components/marketing/sections";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteNavbar } from "@/components/marketing/site-navbar";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Resume Templates & Portfolio Themes — CareerOS AI" },
      {
        name: "description",
        content:
          "ATS-safe resume templates and premium portfolio themes, designed with hiring managers and recruiters.",
      },
      { property: "og:title", content: "Resume Templates & Portfolio Themes — CareerOS AI" },
      {
        property: "og:description",
        content: "Six resume templates and six portfolio themes built for clean ATS parsing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  return (
    <div className="min-h-svh bg-background">
      <SiteNavbar />
      <main>
        <Templates />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
