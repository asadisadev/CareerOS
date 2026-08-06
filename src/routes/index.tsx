import { createFileRoute } from "@tanstack/react-router";
import { Hero, Features, HowItWorks, Pricing, Testimonials, Faq, FinalCta } from "@/components/marketing/sections";
import {
  AiDemo,
  PortfolioShowcase,
  Problem,
  ResumeShowcase,
  TrustedBy,
} from "@/components/marketing/sections-extra";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteNavbar } from "@/components/marketing/site-navbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerOS AI — Build. Showcase. Get Hired." },
      {
        name: "description",
        content:
          "CareerOS AI builds your ATS-ready resume, hosted portfolio and job pipeline with an AI career coach. Start free, no card required.",
      },
      { property: "og:title", content: "CareerOS AI — Build. Showcase. Get Hired." },
      {
        property: "og:description",
        content:
          "AI resume builder, portfolio hosting, ATS optimization, job matching and career coaching in one premium workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-svh bg-background">
      <SiteNavbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Templates />
        <Pricing />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
