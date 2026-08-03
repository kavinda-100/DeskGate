import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ModeToggle } from '@/components/mode-toogle';

const setTheme = vi.fn();

vi.mock('@/components/theme-provider', () => ({
  useTheme: () => ({ theme: 'dark', setTheme }),
}));

describe('ModeToggle', () => {
  afterEach(() => {
    cleanup();
    setTheme.mockClear();
  });

  it('switches from dark to light mode with an accessible icon button', () => {
    render(<ModeToggle />);

    const button = screen.getByRole('button', { name: 'Switch to light mode' });
    fireEvent.click(button);

    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
