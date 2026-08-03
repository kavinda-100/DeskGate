import { cleanup, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Footer } from '@/components/Footer';

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe('Footer', () => {
  afterEach(cleanup);

  it('renders the DeskGate brand, available public links, and the current year', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'DeskGate home' })).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('href')).toBe('/');
    expect(screen.getByRole('link', { name: 'Pricing' }).getAttribute('href')).toBe('/pricing');
    expect(screen.queryByRole('link', { name: /support|privacy|terms|download/i })).toBeNull();
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).not.toBeNull();
  });
});
