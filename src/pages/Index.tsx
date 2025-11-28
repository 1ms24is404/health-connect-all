import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ModuleCards } from "@/components/home/ModuleCards";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ModuleCards />
      <FeaturesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
