import { BrandsSection } from "@/components/BrandsSection";
import { ContactSection } from "@/components/ContactSection";
import Header from "@/components/Header";
import { HeroSection } from "@/components/Hero-section";
import { NewsletterSection } from "@/components/NewsletterSection";
import { ServicesSection } from "@/components/ServiceSection";
import { TestimonialsSection } from "@/components/TestimonialSection";
import { WorkSection } from "@/components/WorkSection";

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <BrandsSection />
      <NewsletterSection />
      <WorkSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
