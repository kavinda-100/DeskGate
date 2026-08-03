import { cleanup, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import HeroSection from '@/sections/hero-section';

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe('HeroSection', () => {
  afterEach(cleanup);

  it('describes the supported desktop SaaS architecture and links to account and pricing paths', () => {
    render(<HeroSection />);

    expect(
      screen.getByRole('heading', {
        name: 'Sell desktop access without trusting the desktop app.',
      }),
    ).not.toBeNull();
    expect(screen.getByText('Start in the browser')).not.toBeNull();
    expect(screen.getByText('Resolve access on the server')).not.toBeNull();
    expect(screen.getByText('Open only what the plan allows')).not.toBeNull();
    expect(screen.getByRole('link', { name: /create an account/i }).getAttribute('href')).toBe(
      '/sign-up',
    );
    expect(screen.getByRole('link', { name: /explore plans/i }).getAttribute('href')).toBe(
      '/pricing',
    );
  });
});
