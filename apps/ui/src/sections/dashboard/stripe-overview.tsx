import { plans, type PlansType } from '@deskgate/config';
import { useRouter } from '@tanstack/react-router';
import { CheckIcon, CircleAlertIcon, CreditCardIcon, LoaderCircleIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/toast';
import { authClient } from '@/lib/auth-client';

type Subscription = {
  plan: string;
  status:
    | 'active'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'past_due'
    | 'paused'
    | 'trialing'
    | 'unpaid';
  periodEnd?: Date | string;
  trialEnd?: Date | string;
  cancelAtPeriodEnd?: boolean;
  billingInterval?: 'day' | 'week' | 'month' | 'year';
};

function formatPlanName(name: string) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

function getEntitlements(plan: PlansType) {
  const projects =
    plan.limits.projects === null ? 'Unlimited projects' : `${plan.limits.projects} projects`;

  return [
    plan.limits['desktop:access'] ? 'Desktop access' : 'No desktop access',
    plan.limits['sync:cloud'] ? 'Cloud sync' : 'Local-only workspace',
    plan.limits['export:advanced'] ? 'Advanced exports' : 'Standard exports',
    plan.limits['collaboration:team'] ? 'Team collaboration' : 'Personal workspace',
    projects,
    `${plan.limits.devices} device${plan.limits.devices === 1 ? '' : 's'}`,
    `${plan.limits.offlineGraceDays} offline grace day${plan.limits.offlineGraceDays === 1 ? '' : 's'}`,
  ];
}

function StripeOverview() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [isOpeningPortal, setIsOpeningPortal] = useState(false);

  const loadSubscriptions = useCallback(async () => {
    setIsLoading(true);
    setHasLoadError(false);

    const { data, error } = await authClient.subscription.list({});

    setIsLoading(false);
    if (error) {
      setHasLoadError(true);
      toast.add({
        type: 'error',
        title: 'Subscription unavailable',
        description: error.message ?? 'We could not load your subscription details.',
      });
      return;
    }

    setSubscriptions(data ?? []);
  }, []);

  useEffect(() => {
    void loadSubscriptions();
  }, [loadSubscriptions]);

  const subscription = useMemo(
    () => subscriptions.find(({ status }) => status === 'active' || status === 'trialing'),
    [subscriptions],
  );
  const plan = useMemo(
    () => plans.find(({ name }) => name === subscription?.plan.toLowerCase()),
    [subscription],
  );

  const handleManageSubscription = async () => {
    setIsOpeningPortal(true);
    const { error } = await authClient.subscription.billingPortal({
      returnUrl: `${window.location.origin}/dashboard`,
    });
    setIsOpeningPortal(false);

    if (error) {
      toast.add({
        type: 'error',
        title: 'Billing portal unavailable',
        description: error.message ?? 'We could not open the Stripe Billing Portal.',
      });
    }
  };

  if (isLoading) {
    return (
      <Card aria-busy="true">
        <CardHeader>
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-28 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (hasLoadError) {
    return (
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Subscription unavailable</AlertTitle>
        <AlertDescription>We could not load your subscription details.</AlertDescription>
        <AlertAction>
          <Button size="sm" variant="outline" onClick={() => void loadSubscriptions()}>
            Try again
          </Button>
        </AlertAction>
      </Alert>
    );
  }

  if (!subscription || !plan) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CreditCardIcon />
          </EmptyMedia>
          <EmptyTitle>No current subscription</EmptyTitle>
          <EmptyDescription>
            Choose a plan to unlock DeskGate’s subscription-based access.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => void router.navigate({ to: '/pricing' })}>Choose a plan</Button>
        </EmptyContent>
      </Empty>
    );
  }

  const detailLabel = subscription.status === 'trialing' ? 'Trial ends' : 'Renews';
  const detailDate =
    subscription.status === 'trialing' ? subscription.trialEnd : subscription.periodEnd;

  return (
    <Card>
      <CardHeader>
        <CardAction>
          <Badge variant={subscription.status === 'trialing' ? 'secondary' : 'default'}>
            {subscription.status}
          </Badge>
        </CardAction>
        <CardTitle>{formatPlanName(plan.name)} plan</CardTitle>
        <CardDescription>
          Your subscription and access limits are managed securely by Stripe.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <dt className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Billing interval
            </dt>
            <dd className="text-sm font-medium">
              {subscription.billingInterval ?? 'Not available'}
            </dd>
          </div>
          {detailDate && (
            <div className="flex flex-col gap-1">
              <dt className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {detailLabel}
              </dt>
              <dd className="text-sm font-medium">{formatDate(detailDate)}</dd>
            </div>
          )}
        </dl>

        {subscription.cancelAtPeriodEnd && subscription.periodEnd && (
          <Alert>
            <CircleAlertIcon />
            <AlertTitle>Cancellation scheduled</AlertTitle>
            <AlertDescription>
              Your plan remains available until {formatDate(subscription.periodEnd)}.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Included with your plan
          </h3>
          <ul
            className="grid gap-3 sm:grid-cols-2"
            aria-label={`${formatPlanName(plan.name)} plan entitlements`}
          >
            {getEntitlements(plan).map((entitlement) => (
              <li key={entitlement} className="flex items-start gap-3 text-sm leading-relaxed">
                <CheckIcon aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                <span>{entitlement}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={isOpeningPortal} onClick={() => void handleManageSubscription()}>
          {isOpeningPortal && (
            <LoaderCircleIcon data-icon="inline-start" className="animate-spin" />
          )}
          {isOpeningPortal ? 'Opening portal' : 'Manage subscription'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StripeOverview;
