import { createFileRoute } from "@tanstack/react-router";
import { Features, FinalCta, HowItWorks } from "@/components/marketing/sections";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteNavbar } from "@/components/marketing/site-navbar";
import { SectionHeading } from "@/components/common/section-heading";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — CareerOS AI" },
      {
        name: "description",
        content:
          "Resume builder, portfolio builder, ATS optimization, AI career coach, job matching, cover letters, hosting and analytics.",
      },
      { property: "og:title", content: "Features — CareerOS AI" },
      {
        property: "og:description",
        content: "Eight connected career modules that share one professional profile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <div className="min-h-svh bg-background">
      <SiteNavbar />
      <main>
        <section className="px-5 pb-4 pt-20 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <SectionHeading
              eyebrow="Features"
              title="Everything your career needs, in one place"
              description="Each module reads the same structured profile, so improving your resume instantly improves your portfolio, matches and coaching."
            />
          </div>
        </section>
        <Features />
        <HowItWorks />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
