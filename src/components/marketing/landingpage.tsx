import {
  Hero,
  Features,
  HowItWorks,
  // Templates,
  Pricing,
  Testimonials,
  Faq,
  FinalCta,
} from "./sections";
import { TemplatesCarousel } from "./resumereview";

import SiteNavbar from "./site-navbar";
import SiteFooter from "./site-footer";
import { TemplatesSection } from "./sections/Templates";

export default function LandingPage() {
  return (
    <>
      <SiteNavbar />
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Templates /> */}
      <TemplatesCarousel />
      <TemplatesSection />
      <Pricing />
      <Testimonials />
      <Faq />
      <FinalCta />
      <SiteFooter />
    </>
  );
}