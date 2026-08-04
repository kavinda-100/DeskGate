import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router';
import { authClient } from '@/lib/auth-client.ts';
import LoadingScreen from '@/components/loading-screen.tsx';
import { useEffect } from 'react';

export const Route = createFileRoute('/(main)/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      void router.navigate({
        to: '/sign-in',
        search: { returnTo: '/' },
      });
    }
  }, [isPending, router, session]);

  if (isPending || !session) {
    return <LoadingScreen />;
  }

  return (
    <section className={'container mx-auto'}>
      <Outlet />
    </section>
  );
}
