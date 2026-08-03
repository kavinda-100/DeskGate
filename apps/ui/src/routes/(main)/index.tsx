import { createFileRoute } from '@tanstack/react-router';
import HeroSection from '@/sections/hero-section.tsx';
import PricingSection from '@/sections/pricing-section.tsx';
import TestimonialSection from '@/sections/testimonial-section.tsx';

export const Route = createFileRoute('/(main)/')({ component: App });

function App() {
  return (
    <div className="size-full">
      <HeroSection />
      <PricingSection />
      <TestimonialSection />
    </div>
  );
}
