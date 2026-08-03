import { plans, type PlansType } from '@deskgate/config';
import { useRouter } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { PricingCard } from '@/components/pricing-card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/toast';
import { authClient } from '@/lib/auth-client';

type Subscription = {
  id: string;
  plan: string;
  stripeSubscriptionId?: string;
  status:
    | 'active'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'past_due'
    | 'paused'
    | 'trialing'
    | 'unpaid';
};

const planDetails: Record<PlansType['name'], { description: string; price: string }> = {
  free: {
    description: 'A focused starting point for learning the DeskGate workflow.',
    price: '$0',
  },
  pro: {
    description: 'For individual builders who need cloud-powered desktop access.',
    price: '$20',
  },
  team: {
    description: 'For a complete workflow with collaboration and generous limits.',
    price: '$50',
  },
};

function getFeatures(plan: PlansType) {
  const projects =
    plan.limits.projects === null ? 'Unlimited projects' : `${plan.limits.projects} projects`;

  return [
    plan.limits['desktop:access'] ? 'Desktop access' : 'No desktop access',
    plan.limits['sync:cloud'] ? 'Cloud sync' : 'Local-only workspace',
    plan.limits['export:advanced'] ? 'Advanced exports' : 'Standard exports',
    plan.limits['collaboration:team'] ? 'Team collaboration' : 'Personal workspace',
    projects,
    `${plan.limits.devices} device${plan.limits.devices === 1 ? '' : 's'}`,
  ];
}

function formatPlanName(name: string) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

const PricingSection = () => {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(false);
  const [hasSubscriptionLoadError, setHasSubscriptionLoadError] = useState(false);
  const [pendingPlanName, setPendingPlanName] = useState<PlansType['name'] | null>(null);

  const loadSubscriptions = useCallback(async () => {
    if (!session?.user) {
      setSubscriptions([]);
      setHasSubscriptionLoadError(false);
      return;
    }

    setIsLoadingSubscriptions(true);
    setHasSubscriptionLoadError(false);
    const { data, error } = await authClient.subscription.list({});
    setIsLoadingSubscriptions(false);

    if (error) {
      setHasSubscriptionLoadError(true);
      toast.add({
        type: 'error',
        title: 'Subscription unavailable',
        description: error.message ?? 'We could not load your current subscription.',
      });
      return;
    }

    setSubscriptions(data ?? []);
  }, [session?.user]);

  useEffect(() => {
    void loadSubscriptions();
  }, [loadSubscriptions]);

  const activeSubscription = useMemo(
    () =>
      subscriptions.find(
        (subscription) => subscription.status === 'active' || subscription.status === 'trialing',
      ),
    [subscriptions],
  );

  const handlePlanAction = async (plan: PlansType) => {
    if (!session?.user) {
      await router.navigate({
        to: '/sign-up',
      });
      return;
    }

    if (hasSubscriptionLoadError) {
      return;
    }

    setPendingPlanName(plan.name);

    // If the user has an active subscription and is trying to select the same plan, open the billing portal
    if (activeSubscription?.plan.toLowerCase() === plan.name) {
      const { error } = await authClient.subscription.billingPortal({
        returnUrl: `${window.location.origin}/pricing`,
        referenceId: session.user.id,
      });
      setPendingPlanName(null);

      if (error) {
        console.error('Error occurred while opening billing portal:', error);
        toast.add({
          type: 'error',
          title: 'Billing portal unavailable',
          description: error.message ?? 'We could not open the Stripe Billing Portal.',
        });
      }
      return;
    }
    // If the user has no active subscription or is trying to select a different plan, create or update a new subscription
    else {
      const { error } = await authClient.subscription.upgrade({
        plan: plan.name,
        referenceId: session.user.id,
        subscriptionId: activeSubscription?.stripeSubscriptionId,
        successUrl: `${window.location.origin}/pricing`,
        cancelUrl: `${window.location.origin}/pricing`,
      });
      setPendingPlanName(null);

      if (error) {
        console.error('Error occurred while upgrading subscription:', error);
        toast.add({
          type: 'error',
          title: 'Checkout unavailable',
          description: error.message ?? 'We could not start Stripe Checkout.',
        });
      }
    }
  };

  return (
    <section aria-labelledby="pricing-heading" className="flex flex-col gap-10 py-16 sm:py-24">
      <div className="flex max-w-2xl flex-col gap-4">
        <Badge variant="secondary">Plans that map to real access</Badge>
        <div className="flex flex-col gap-3">
          <h2
            id="pricing-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Choose the access model you want to learn from.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Select a plan in the browser. Stripe records payment, Better Auth synchronizes the
            subscription, and DeskGate can resolve the resulting access on the backend.
          </p>
        </div>
        {session?.user && isLoadingSubscriptions && (
          <p className="text-sm text-muted-foreground" role="status">
            Checking your subscription…
          </p>
        )}
        {session?.user && activeSubscription && !isLoadingSubscriptions && (
          <p className="text-sm text-muted-foreground">
            Your current subscription is{' '}
            <span className="font-medium text-foreground">
              {formatPlanName(activeSubscription.plan)}
            </span>
            .
          </p>
        )}
        {session?.user && hasSubscriptionLoadError && (
          <p className="text-sm text-destructive" role="alert">
            We could not verify your subscription. Refresh the page before changing plans.
          </p>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => {
          const details = planDetails[plan.name];
          const isCurrentPlan = activeSubscription?.plan.toLowerCase() === plan.name;

          return (
            <PricingCard
              key={plan.name}
              name={formatPlanName(plan.name)}
              description={details.description}
              price={details.price}
              features={getFeatures(plan)}
              isCurrentPlan={isCurrentPlan}
              isFeatured={plan.name === 'pro'}
              isPending={
                isSessionPending || isLoadingSubscriptions || pendingPlanName === plan.name
              }
              isDisabled={hasSubscriptionLoadError}
              actionLabel={
                isCurrentPlan
                  ? 'Manage subscription'
                  : session?.user
                    ? `Choose ${formatPlanName(plan.name)}`
                    : 'Sign in to choose'
              }
              onAction={() => void handlePlanAction(plan)}
            />
          );
        })}
      </div>
    </section>
  );
};
export default PricingSection;
