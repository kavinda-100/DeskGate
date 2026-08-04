import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import StripeOverview from '@/sections/dashboard/stripe-overview';

const { navigate, subscriptionList, billingPortal, toastAdd } = vi.hoisted(() => ({
  navigate: vi.fn(),
  subscriptionList: vi.fn(),
  billingPortal: vi.fn(),
  toastAdd: vi.fn(),
}));

vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({ navigate }),
}));

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    subscription: {
      list: subscriptionList,
      billingPortal,
    },
  },
}));

vi.mock('@/components/ui/toast', () => ({
  toast: { add: toastAdd },
}));

describe('StripeOverview', () => {
  beforeEach(() => {
    navigate.mockReset();
    subscriptionList.mockReset();
    billingPortal.mockReset();
    toastAdd.mockReset();
  });

  afterEach(cleanup);

  it('shows the active plan details and opens the billing portal', async () => {
    subscriptionList.mockResolvedValue({
      data: [
        {
          plan: 'pro',
          status: 'active',
          billingInterval: 'month',
          periodEnd: '2026-09-01T00:00:00.000Z',
          cancelAtPeriodEnd: true,
        },
      ],
      error: null,
    });
    billingPortal.mockResolvedValue({ error: null });

    render(<StripeOverview />);

    await waitFor(() => expect(screen.getByText('Pro plan')).not.toBeNull());

    expect(screen.getByText('Cloud sync')).not.toBeNull();
    expect(screen.getByText('25 projects')).not.toBeNull();
    expect(screen.getByText('Cancellation scheduled')).not.toBeNull();
    expect(screen.getByText('Your plan remains available until Sep 1, 2026.')).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Manage subscription' }));

    await waitFor(() => {
      expect(billingPortal).toHaveBeenCalledWith({
        returnUrl: `${window.location.origin}/dashboard`,
      });
    });
  });

  it('shows trial details when the current subscription is trialing', async () => {
    subscriptionList.mockResolvedValue({
      data: [
        {
          plan: 'team',
          status: 'trialing',
          trialEnd: '2026-09-03T00:00:00.000Z',
          billingInterval: 'month',
        },
      ],
      error: null,
    });

    render(<StripeOverview />);

    await waitFor(() => expect(screen.getByText('Team plan')).not.toBeNull());

    expect(screen.getByText('Trial ends')).not.toBeNull();
    expect(screen.getByText('Sep 3, 2026')).not.toBeNull();
    expect(screen.getByText('Unlimited projects')).not.toBeNull();
  });

  it('guides users without a current subscription to pricing', async () => {
    subscriptionList.mockResolvedValue({ data: [], error: null });

    render(<StripeOverview />);

    await waitFor(() => expect(screen.getByText('No current subscription')).not.toBeNull());

    fireEvent.click(screen.getByRole('button', { name: 'Choose a plan' }));
    expect(navigate).toHaveBeenCalledWith({ to: '/pricing' });
  });

  it('shows a retryable error when subscriptions cannot be loaded', async () => {
    subscriptionList.mockResolvedValue({ data: null, error: { message: 'Request failed' } });

    render(<StripeOverview />);

    await waitFor(() => expect(screen.getByText('Subscription unavailable')).not.toBeNull());

    expect(toastAdd).toHaveBeenCalledWith({
      type: 'error',
      title: 'Subscription unavailable',
      description: 'Request failed',
    });

    subscriptionList.mockResolvedValue({ data: [], error: null });
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    await waitFor(() => expect(screen.getByText('No current subscription')).not.toBeNull());
  });

  it('reports billing portal failures', async () => {
    subscriptionList.mockResolvedValue({
      data: [{ plan: 'free', status: 'active' }],
      error: null,
    });
    billingPortal.mockResolvedValue({ error: { message: 'Portal is disabled' } });

    render(<StripeOverview />);

    await waitFor(() => expect(screen.getByText('Free plan')).not.toBeNull());

    fireEvent.click(screen.getByRole('button', { name: 'Manage subscription' }));

    await waitFor(() => {
      expect(toastAdd).toHaveBeenCalledWith({
        type: 'error',
        title: 'Billing portal unavailable',
        description: 'Portal is disabled',
      });
    });
  });
});
