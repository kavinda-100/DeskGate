import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribeAuthenticated = window.onAuthenticated(async () => {
      console.info('Authenticated user');
      const user = await window.getUser();
      console.info('Current user:', user);
    });
    const unsubscribeAuthError = window.onAuthError((ctx) => {
      console.error(`Authentication error: ${ctx.message}`);
    });

    return () => {
      unsubscribeAuthenticated();
      unsubscribeAuthError();
    };
  }, []);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const result = await window.requestAuth();
      // ---- for specific provider, you can pass the provider name as an argument, e.g.: ----------
      // const result = await window.requestAuth({ provider: 'google', });
      console.info('Auth request result:', result);
    } catch (error) {
      console.error('Auth request error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>DeskGate Desktop</CardTitle>
          <CardDescription>
            Your desktop workspace is ready for browser sign-in and subscription-aware features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Authentication, subscription, and dashboard experiences will appear here as they are
            connected to the DeskGate API.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button onClick={handleSignIn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
          <Button onClick={() => window.signOut()} variant="destructive">
            Sign out
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};
