import { useRouter } from '@tanstack/react-router';
import { LogOutIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

type LogoutButtonProps = {
  className?: string;
  onSuccess?: () => void;
};

export function LogoutButton({ className, onSuccess }: LogoutButtonProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.add({
          type: 'error',
          title: 'Sign Out Failed',
          description: error.message ?? 'Please try again.',
        });
        return;
      }

      onSuccess?.();
      await router.navigate({ to: '/' });
    } catch {
      toast.add({
        type: 'error',
        title: 'Sign Out Failed',
        description: 'Please try again.',
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Button
      className={cn(className)}
      variant="outline"
      disabled={isSigningOut}
      onClick={handleSignOut}
    >
      <LogOutIcon data-icon="inline-start" />
      {isSigningOut ? 'Signing out' : 'Sign out'}
    </Button>
  );
}
