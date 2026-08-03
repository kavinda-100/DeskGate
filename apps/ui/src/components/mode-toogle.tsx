import { MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
    >
      {isDarkTheme ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
