import { BrandsSection } from "@/components/BrandsSection";
import Header from "@/components/Header";
import { HeroSection } from "@/components/Hero-section";
import { ServicesSection } from "@/components/ServiceSection";
import { WorkSection } from "@/components/WorkSection";

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <BrandsSection />
      <WorkSection />
      {/* <TestimonialsSection /> */}
      {/* <ContactSection /> */}
    </div>
  );
}
