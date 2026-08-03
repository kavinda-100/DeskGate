import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import PricingSection from '@/sections/pricing-section';

const { navigate, subscriptionList, upgrade, billingPortal, toastAdd, useSession } = vi.hoisted(
  () => ({
    navigate: vi.fn(),
    subscriptionList: vi.fn(),
    upgrade: vi.fn(),
    billingPortal: vi.fn(),
    toastAdd: vi.fn(),
    useSession: vi.fn(),
  }),
);

vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({ navigate }),
}));

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    useSession,
    subscription: {
      list: subscriptionList,
      upgrade,
      billingPortal,
    },
  },
}));

vi.mock('@/components/ui/toast', () => ({
  toast: { add: toastAdd },
}));

describe('PricingSection', () => {
  beforeEach(() => {
    navigate.mockReset();
    subscriptionList.mockReset();
    upgrade.mockReset();
    billingPortal.mockReset();
    toastAdd.mockReset();
  });

  afterEach(cleanup);

  it('renders the configured plans and sends guests to sign-in', () => {
    useSession.mockReturnValue({ data: null, isPending: false });
    render(<PricingSection />);

    expect(screen.getByText('Free')).not.toBeNull();
    expect(screen.getByText('Pro')).not.toBeNull();
    expect(screen.getByText('Team')).not.toBeNull();
    expect(screen.getByText('Most popular')).not.toBeNull();
    expect(screen.getByText('$12')).not.toBeNull();

    fireEvent.click(screen.getAllByRole('button', { name: 'Sign in to choose' })[0]);
    expect(navigate).toHaveBeenCalledWith({ to: '/sign-in', search: { returnTo: '/pricing' } });
  });

  it('shows and manages the owned plan while sending another plan to checkout', async () => {
    useSession.mockReturnValue({ data: { user: { id: 'user-1' } }, isPending: false });
    subscriptionList.mockResolvedValue({
      data: [
        {
          id: 'subscription-1',
          plan: 'pro',
          stripeSubscriptionId: 'sub_123',
          status: 'active',
        },
      ],
      error: null,
    });
    billingPortal.mockResolvedValue({ error: null });
    upgrade.mockResolvedValue({ error: null });

    render(<PricingSection />);

    await waitFor(() => {
      expect(
        screen.getByText(
          (_content, element) =>
            element?.tagName === 'P' && element.textContent === 'Your current subscription is Pro.',
        ),
      ).not.toBeNull();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Manage subscription' }));
    await waitFor(() => {
      expect(billingPortal).toHaveBeenCalledWith({ returnUrl: '/pricing' });
    });

    fireEvent.click(screen.getByRole('button', { name: 'Choose Team' }));
    await waitFor(() => {
      expect(upgrade).toHaveBeenCalledWith({
        plan: 'team',
        subscriptionId: 'sub_123',
        successUrl: '/pricing',
        cancelUrl: '/pricing',
      });
    });
  });
});
