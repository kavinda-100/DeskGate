import { createFileRoute } from '@tanstack/react-router';
import StripeOverview from '@/sections/dashboard/stripe-overview';

export const Route = createFileRoute('/(main)/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <StripeOverview />;
}
