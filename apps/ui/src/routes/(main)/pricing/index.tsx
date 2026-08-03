import { createFileRoute } from '@tanstack/react-router';
import PricingSection from '@/sections/pricing-section.tsx';

export const Route = createFileRoute('/(main)/pricing/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="size-full">
      <PricingSection />
    </div>
  );
}
