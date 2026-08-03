import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LogoutButton } from '@/components/logout-button';

const { navigate, signOut, toastAdd } = vi.hoisted(() => ({
  navigate: vi.fn(),
  signOut: vi.fn(),
  toastAdd: vi.fn(),
}));

vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({ navigate }),
}));

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signOut,
  },
}));

vi.mock('@/components/ui/toast', () => ({
  toast: {
    add: toastAdd,
  },
}));

describe('LogoutButton', () => {
  afterEach(cleanup);

  beforeEach(() => {
    navigate.mockReset();
    signOut.mockReset();
    toastAdd.mockReset();
  });

  it('signs out and returns the user home', async () => {
    signOut.mockResolvedValue({ error: null });

    render(<LogoutButton />);
    fireEvent.click(screen.getByRole('button', { name: /sign out/i }));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledOnce();
      expect(navigate).toHaveBeenCalledWith({ to: '/' });
    });
  });

  it('reports sign-out failures', async () => {
    signOut.mockResolvedValue({ error: { message: 'Session expired' } });

    render(<LogoutButton />);
    fireEvent.click(screen.getByRole('button', { name: /sign out/i }));

    await waitFor(() => {
      expect(toastAdd).toHaveBeenCalledWith({
        type: 'error',
        title: 'Sign Out Failed',
        description: 'Session expired',
      });
    });
  });
});
