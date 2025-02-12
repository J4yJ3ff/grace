import { BrandsSection } from "@/components/BrandsSection";
import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/Hero-section";
import NewsletterSection from "@/components/NewsletterSection";
import { ServicesSection } from "@/components/ServiceSection";
import { TestimonialsSection } from "@/components/TestimonialSection";
import { WorkSection } from "@/components/WorkSection";

export default function Page() {
  const NewsletterProps = {
    title: "Stay Updated",
    description:
      "Subscribe to our newsletter for the latest updates, exclusive content, and special offers.",
  };

  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <BrandsSection />
      <NewsletterSection
        title={NewsletterProps.title}
        description={NewsletterProps.description}
      />
      <WorkSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
