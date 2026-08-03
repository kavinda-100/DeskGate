import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import TestimonialSection from '@/sections/testimonial-section';

describe('TestimonialSection', () => {
  afterEach(cleanup);

  it('identifies its content as fictional and renders each learning scenario', () => {
    render(<TestimonialSection />);

    expect(screen.getByText('Fictional learning scenarios')).not.toBeNull();
    expect(screen.getByText('Maya N.')).not.toBeNull();
    expect(screen.getByText('Jordan R.')).not.toBeNull();
    expect(screen.getByText('Sam K.')).not.toBeNull();
    expect(screen.getByText('Desktop authentication')).not.toBeNull();
    expect(screen.getByText('Subscription lifecycle')).not.toBeNull();
    expect(screen.getByText('Server-side entitlements')).not.toBeNull();
  });
});
