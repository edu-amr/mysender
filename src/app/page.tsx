import { TopNavigation } from "./_components/top-navigation";
import { HeroSection } from "./_components/hero-section";
import { ChallengesSection } from "./_components/challenges-section";
import { SolutionsShowcaseSection } from "./_components/solutions-showcase-section";
import { WhatsAppMarketingSection } from "./_components/whatsapp-marketing-section";
import { PricingSection } from "./_components/pricing-section";
import { FaqSection } from "./_components/faq-section";
import { AppFooter } from "./_components/app-footer";
import { ReactLenis } from "lenis/react";

export default function Site() {
  return (
    <ReactLenis className="w-full" root>
      <div className="w-full">
        <TopNavigation />
        <main className="w-full">
          <HeroSection />
          <ChallengesSection />
          <SolutionsShowcaseSection />
          <WhatsAppMarketingSection />
          <PricingSection />
          <FaqSection />
        </main>
        <AppFooter />
      </div>
    </ReactLenis>
  );
}
