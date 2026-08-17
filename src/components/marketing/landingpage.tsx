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

export default function LandingPage() {
  return (
    <>
      <SiteNavbar />
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Templates /> */}
      <TemplatesCarousel />
      <Pricing />
      <Testimonials />
      <Faq />
      <FinalCta />
      <SiteFooter />
    </>
  );
}